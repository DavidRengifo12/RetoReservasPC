import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { getReservasUsuarioDetallado } from "../services/alquilerEquipo";
import { useAuth } from "../context/AuthContext";

export default function MisReservas() {
  const { user } = useAuth();
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      try {
        if (!user) return;
        const data = await getReservasUsuarioDetallado(user.id);
        setReservas(data);
      } catch (error) {
        toast.error("Error al cargar tus reservas");
        console.log(error);
      }
    };
    cargar();
  }, [user]);

  return (
    <div className="my-4 d-flex justify-content-center">
      <div style={{maxWidth:'900px', width:'100%'}}>
      <h1>Mis reservas</h1>
      <Table size="sm" responsive striped bordered hover>
        <thead>
          <tr>
            <th>Codigo equipo</th>
            <th>Nombre equipo</th>
            <th>Marca</th>
            <th>Estado equipo</th>
            <th>Fecha reserva</th>
          </tr>
        </thead>
        <tbody>
          {reservas && reservas.length > 0 ? (
            reservas.map((r) => (
              <tr key={r.id}>
                <td>{r.equipo?.codigo_equipo || '-'}</td>
                <td>{r.equipo?.nombre_equipo || '-'}</td>
                <td>{r.equipo?.marca_equipo || '-'}</td>
                <td>{r.equipo ? (r.equipo.estado ? 'Disponible' : 'No disponible') : '-'}</td>
                <td>{new Date(r.fecha_reserva).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No tienes reservas</td>
            </tr>
          )}
        </tbody>
      </Table>
      </div>
    </div>
  );
}
