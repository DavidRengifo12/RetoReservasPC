import { useEffect, useState } from "react";
import { Button, Modal, Form, Table, Row, Col } from "react-bootstrap";
import toast from "react-hot-toast";
import { getEquiposComputo, postEquiposNuevos, updateEquipos, deleteEquipos } from "../services/equipoService";
import EditarEquipo from "./EditarEquipo";
import { CiEdit } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";

export default function GestionEquipos() {
  const [equipos, setEquipos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showCrear, setShowCrear] = useState(false);
  const [nuevo, setNuevo] = useState({ codigo_equipo: "", nombre_equipo: "", marca_equipo: "", precio_equipo: "" });

  const [editShow, setEditShow] = useState(false);
  const [equipoSel, setEquipoSel] = useState(null);

  const cargarEquipos = async () => {
    setLoading(true);
    try {
      const data = await getEquiposComputo();
      setEquipos(data || []);
    } catch (e) {
      toast.error("No se pudieron cargar los equipos");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarEquipos();
  }, []);

  const handleCrear = async (e) => {
    e.preventDefault();
    try {
      const creado = await postEquiposNuevos({
        ...nuevo,
        precio_equipo: nuevo.precio_equipo === "" ? null : parseInt(nuevo.precio_equipo, 10)
      });
      setEquipos((prev) => [...prev, creado]);
      setNuevo({ codigo_equipo: "", nombre_equipo: "", marca_equipo: "", precio_equipo: "" });
      setShowCrear(false);
      toast.success("Equipo creado");
    } catch (e) {
      toast.error("Error al crear equipo");
      console.log(e);
    }
  };

  const handleToggleEstado = async (eq) => {
    try {
      const updates = { estado: !eq.estado };
      await updateEquipos(eq.id, updates);
      setEquipos((prev) => prev.map((x) => (x.id === eq.id ? { ...x, ...updates } : x)));
      toast.success(`Equipo ${updates.estado ? "activado" : "desactivado"}`);
    } catch (e) {
      toast.error("No se pudo cambiar el estado");
      console.log(e);
    }
  };

  const handleEliminar = async (id) => {
    if (!confirm("¿Eliminar este equipo?")) return;
    try {
      await deleteEquipos(id);
      setEquipos((prev) => prev.filter((x) => x.id !== id));
      toast.success("Equipo eliminado");
    } catch (e) {
      toast.error("No se pudo eliminar");
      console.log(e);
    }
  };

  const abrirEditar = (eq) => {
    setEquipoSel(eq);
    setEditShow(true);
  };

  const onGuardarEdicion = async () => {
    await cargarEquipos();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Gestión de equipos</h2>
        <Button variant="success" onClick={() => setShowCrear(true)}>Crear equipo</Button>
      </div>

      <div className="bg-white p-3 rounded shadow-sm">
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Precio</th>
              <th>Estado</th>
              <th style={{ width: 150 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(!equipos || equipos.length === 0) && (
              <tr>
                <td colSpan={5}>{loading ? "Cargando..." : "No hay equipos"}</td>
              </tr>
            )}
            {equipos && equipos.map((eq) => (
              <tr key={eq.id}>
                <td>{eq.codigo_equipo}</td>
                <td>{eq.nombre_equipo}</td>
                <td>{eq.marca_equipo}</td>
                <td>{typeof eq.precio_equipo === 'number' ? eq.precio_equipo : (eq.precio_equipo ?? '-')}</td>
                <td>{eq.estado ? "Disponible" : "No disponible"}</td>
                <td className="d-flex gap-2">
                  <Button size="sm" variant="outline-primary" onClick={() => abrirEditar(eq)} title="Editar">
                    <CiEdit />
                  </Button>
                  <Button size="sm" variant={eq.estado ? "outline-warning" : "outline-success"} onClick={() => handleToggleEstado(eq)} title={eq.estado ? "No disponible" : "Disponible"}>
                    {eq.estado ? <BsToggleOff /> : <BsToggleOn />}
                  </Button>
                  <Button size="sm" variant="outline-danger" onClick={() => handleEliminar(eq.id)} title="Eliminar">
                    <TiDelete />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal Crear */}
      <Modal show={showCrear} onHide={() => setShowCrear(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear equipo</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCrear}>
          <Modal.Body>
            <Row className="g-3">
              <Col xs={12}>
                <Form.Label>Código</Form.Label>
                <Form.Control
                  value={nuevo.codigo_equipo}
                  onChange={(e) => setNuevo((p) => ({ ...p, codigo_equipo: e.target.value }))}
                  required
                />
              </Col>
              <Col xs={12}>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  value={nuevo.nombre_equipo}
                  onChange={(e) => setNuevo((p) => ({ ...p, nombre_equipo: e.target.value }))}
                  required
                />
              </Col>
              <Col xs={12}>
                <Form.Label>Marca</Form.Label>
                <Form.Control
                  value={nuevo.marca_equipo}
                  onChange={(e) => setNuevo((p) => ({ ...p, marca_equipo: e.target.value }))}
                  required
                />
              </Col>
              <Col xs={12}>
                <Form.Label>Precio (entero)</Form.Label>
                <Form.Control
                  type="number"
                  inputMode="numeric"
                  value={nuevo.precio_equipo}
                  onChange={(e) => setNuevo((p) => ({ ...p, precio_equipo: e.target.value }))}
                  min={0}
                  step={1}
                  required
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCrear(false)}>Cancelar</Button>
            <Button type="submit" variant="success">Crear</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal Editar (reutiliza componente) */}
      <EditarEquipo
        show={editShow}
        onHide={() => setEditShow(false)}
        equipo={equipoSel}
        isAdmin={true}
        onSave={onGuardarEdicion}
      />
    </div>
  );
}
