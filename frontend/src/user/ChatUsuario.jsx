import { useEffect, useRef, useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import toast from "react-hot-toast";
import { enviarMensaje, getMensajesUsuario, subscribeMensajes } from "../services/chatService";
import { useAuth } from "../context/AuthContext";

export default function ChatUsuario() {
  const { user } = useAuth();
  const [mensajes, setMensajes] = useState([]);
  const [texto, setTexto] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    const cargar = async () => {
      try {
        const data = await getMensajesUsuario(user.id);
        setMensajes(data);
      } catch (e) {
        toast.error("Error cargando mensajes");
        console.log(e);
      }
    };
    cargar();

    const unsub = subscribeMensajes((nuevo) => {
      if (nuevo.user_id === user.id) {
        setMensajes((prev) => [...prev, nuevo]);
      }
    }, { user_id: user.id });

    return () => {
      if (unsub) unsub();
    };
  }, [user]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  const handleEnviar = async (e) => {
    e.preventDefault();
    if (!texto.trim()) return;
    try {
      await enviarMensaje({ user_id: user.id, contenido: texto.trim() });
      setTexto("");
    } catch (e) {
      toast.error("No se pudo enviar el mensaje");
      console.log(e);
    }
  };

  return (
    <div className="my-4 d-flex justify-content-center">
      <div style={{ maxWidth: "900px", width: "100%" }}>
        <Card className="shadow-sm">
          <Card.Header className="bg-white">
            <h5 className="m-0">Chat con administrador</h5>
          </Card.Header>
          <Card.Body className="p-0">
            <div className="p-3" style={{ maxHeight: 420, overflowY: "auto" }}>
              {mensajes.map((m) => {
                const esPropio = m.sender_id ? m.sender_id === user.id : true;
                return (
                  <div key={m.id} className={`d-flex mb-2 ${esPropio ? 'justify-content-end' : 'justify-content-start'}`}>
                    <div className={`${esPropio ? 'bg-success text-white' : 'bg-light'} px-3 py-2 rounded-3`} style={{ maxWidth: '75%' }}>
                      <div className={`small ${esPropio ? 'text-white-50' : 'text-muted'}`}>{esPropio ? 'Tú' : 'Admin'}</div>
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
                  placeholder="Escribe tu mensaje..."
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                />
              </InputGroup>
              <Button type="submit" variant="success">Enviar</Button>
            </Form>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}
