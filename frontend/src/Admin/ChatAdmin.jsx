import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Form, InputGroup, ListGroup, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { getConversaciones, getMensajesPorUsuario, subscribeMensajes, enviarMensajeAUsuario, getUsuarioNombre } from "../services/chatService";
import { useAuth } from "../context/AuthContext";

export default function ChatAdmin() {
  const { user: admin } = useAuth();
  const [convs, setConvs] = useState([]); // {user_id, id, contenido}
  const [selectedUser, setSelectedUser] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [texto, setTexto] = useState("");
  const [selectedNombre, setSelectedNombre] = useState("");
  const endRef = useRef(null);

  const cargarConversaciones = async () => {
    try {
      const data = await getConversaciones();
      setConvs(data);
      if (!selectedUser && data && data.length > 0) {
        setSelectedUser(data[0].user_id);
      }
    } catch (e) {
      toast.error("Error cargando conversaciones");
      console.log(e);
    }
  };

  const cargarMensajes = async (userId) => {
    if (!userId) return;
    try {
      const data = await getMensajesPorUsuario(userId);
      setMensajes(data);
      try {
        const nombre = await getUsuarioNombre(userId);
        setSelectedNombre(nombre);
      } catch {}
    } catch (e) {
      toast.error("Error cargando mensajes");
      console.log(e);
    }
  };

  useEffect(() => {
    cargarConversaciones();
    const unsub = subscribeMensajes((nuevo) => {
      // Añadir a lista de conversaciones si es nuevo user_id
      setConvs((prev) => {
        const exists = prev.find((c) => c.user_id === nuevo.user_id);
        if (exists) return prev;
        return [{ user_id: nuevo.user_id, id: nuevo.id, contenido: nuevo.contenido }, ...prev];
      });
      if (selectedUser && nuevo.user_id === selectedUser) {
        setMensajes((prev) => [...prev, nuevo]);
      }
    });
    return () => { if (unsub) unsub(); };
  }, []);

  useEffect(() => {
    if (selectedUser) cargarMensajes(selectedUser);
  }, [selectedUser]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  const handleEnviar = async (e) => {
    e.preventDefault();
    if (!texto.trim() || !selectedUser) return;
    try {
      const enviado = await enviarMensajeAUsuario(selectedUser, texto.trim());
      setMensajes((prev) => [...prev, enviado]);
      setTexto("");
    } catch (e) {
      toast.error("No se pudo enviar el mensaje");
      console.log(e);
    }
  };

  return (
    <div className="my-4">
      <Row className="g-3">
        <Col xs={12} md={4} lg={3}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white"><strong>Conversaciones</strong></Card.Header>
            <ListGroup variant="flush">
              {convs.length === 0 && (
                <ListGroup.Item>No hay conversaciones</ListGroup.Item>
              )}
              {convs.map((c) => (
                <ListGroup.Item
                  key={c.user_id}
                  action
                  active={selectedUser === c.user_id}
                  onClick={() => setSelectedUser(c.user_id)}
                >
                  <div className="small text-muted">Usuario</div>
                  <div className="text-truncate">{c.user_id}</div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        <Col xs={12} md={8} lg={9}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <strong>Chat</strong>{selectedUser ? (
                <span className="ms-2 small text-muted">Usuario: {selectedNombre || selectedUser}</span>
              ) : null}
            </Card.Header>
            <Card.Body className="p-0">
              <div className="p-3" style={{ maxHeight: 500, overflowY: "auto" }}>
                {(!mensajes || mensajes.length === 0) && (
                  <div className="text-center text-muted">Sin mensajes</div>
                )}
                {mensajes.map((m) => {
                  const esAdmin = m.sender_id ? m.sender_id === admin?.id : false;
                  return (
                    <div key={m.id} className={`d-flex mb-2 ${esAdmin ? 'justify-content-end' : 'justify-content-start'}`}>
                      <div className={`${esAdmin ? 'bg-success text-white' : 'bg-light'} px-3 py-2 rounded-3`} style={{ maxWidth: '75%' }}>
                        <div className={`small ${esAdmin ? 'text-white-50' : 'text-muted'}`}>{esAdmin ? 'Admin' : (selectedNombre || 'Usuario')}</div>
                        <div>{m.contenido}</div>
                      </div>
                    </div>
                  );
                })}
                <div ref={endRef} />
              </div>
            </Card.Body>
            <Card.Footer className="bg-white">
              <Form onSubmit={handleEnviar} className="d-flex gap-2">
                <InputGroup>
                  <Form.Control
                    placeholder={selectedUser ? "Escribe tu respuesta..." : "Selecciona una conversación"}
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    disabled={!selectedUser}
                  />
                </InputGroup>
                <Button type="submit" variant="success" disabled={!selectedUser}>Enviar</Button>
              </Form>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
