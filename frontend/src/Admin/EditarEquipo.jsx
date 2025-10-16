import React, { useEffect, useState } from 'react'
import { Prev } from 'react-bootstrap/esm/PageItem';
import { updateEquipos } from '../services/equipoService';
import toast from 'react-hot-toast';
import { Modal, Form, Button } from 'react-bootstrap';

export default function EditarEquipo({ show, onHide, equipo, isAdmin = false, onSave }) {
    const [formData, setFormData] = useState({
    id: "",
    codigo_equipo: "",
    nombre_equipo: "",
    marca_equipo: "",
    estado: true,
    precio_equipo: ""
  });


  useEffect(() => {
    if(equipo) setFormData(equipo)
  }, [equipo])

  const handleSaveCambios = async (e) => {
    const {name, value} = e.target
    setFormData((prev) => ({...prev, [name]: value}))
  }

  const handleUpdateEquipos = async () => {
    if(!equipo) return
    try {
        const payload = {
          ...formData,
          precio_equipo: formData.precio_equipo === "" ? null : parseInt(formData.precio_equipo, 10)
        }
        const actualizarEquipos = await updateEquipos(equipo.id, payload)
        onSave(actualizarEquipos)
        onHide()
        toast.success('Equipo actualizado correctamente')
        console.log('Equipo Actualizado', actualizarEquipos)
    } catch (error) {
        toast.error('Ocurrio un error con la actualizacion')
        console.log('Hubo un error al actualizar', error)
    }
  }

  return (
    <>
      <Modal show={show} onHide={onHide} className="mt-5">
      <Modal.Header closeButton>
        <Modal.Title>Editar Equipo Computacional</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Codigo serial del equipo</Form.Label>
            <Form.Control
              type="text"
              name="codigo_equipo"
              value= {formData.codigo_equipo}
              onChange={handleSaveCambios}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo de equipo</Form.Label>
            <Form.Control
              type="text"
              placeholder="ej: celular, tv, pc"
              name="nombre_equipo"
              value= {formData.nombre_equipo}
              onChange={handleSaveCambios}
            />
          </Form.Group>

          {isAdmin && (
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                name="estado"
                value={formData.estado}
                onChange={handleSaveCambios}
              >
                <option value={true}>Disponible</option>
                <option value={false}>No disponible</option>
              </Form.Select>
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Marca del Equipo</Form.Label>
            <Form.Control
              type="text"
              placeholder="ej: hp, dell, lenovo, samsung"
              name="marca_equipo"
              value={formData.marca_equipo}
              onChange={handleSaveCambios}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio (entero)</Form.Label>
            <Form.Control
              type="number"
              inputMode="numeric"
              name="precio_equipo"
              value={formData.precio_equipo}
              onChange={handleSaveCambios}
              min={0}
              step={1}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleUpdateEquipos}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}
