import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { actualizarEstadoEquipo, getEquiposReservas, reservaEquipo } from "../services/alquilerEquipo";
import { useAuth } from "../context/AuthContext";


export default function ReservaEquipo() {
    const {user} = useAuth()
    const [equipo, setEquipo] = useState([])


    useEffect(() => {
        const equiposCargar = async () => {
            try {
                const reservar = await getEquiposReservas()
                setEquipo(reservar)
            } catch (error) {
                toast.error('Ocurrio un error al obtener equipos')
                console.log(error)
            }
        }
        equiposCargar()
    }, [])

    const handleReservar = async (equipitos) => {
        
        if(!user){
            toast.error('Debes iniciar sesion para poder registrarte')
            return
        }

        try {
            await reservaEquipo({
                user_id: user.id,
                equipo_id: equipitos.id,
                fecha_reserva: new Date().toISOString()
        })

            await actualizarEstadoEquipo(equipitos.id, false)
            toast.success(`Reservaste el equipo: ${equipitos.nombre_equipo} de ${user.nombre}`)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="my-4">
     <h1>Reservacion de equipos</h1> 
     <Table striped bordered hover> 
        <thead>
            <tr>
                <th>Codigo del Equipo</th>
                <th>Nombre del equipo</th>
                <th>Marca del equipo</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody>
            {
                equipo && equipo.length > 0 ? (
                    equipo.map((equipitos) => (
                        <tr key={equipitos.id}>                            
                            <td>{equipitos.codigo_equipo}</td>
                            <td>{equipitos.nombre_equipo}</td>
                            <td>{equipitos.marca_equipo}</td>
                            <td>{equipitos.estado ? "Disponible" : "No Disponible"}</td>
                            <td>
                                <Button onClick={() => handleReservar(equipitos)}>Reservar</Button>
                            </td>
                        </tr>
                    ))
                ): (
                    <tr>
                        <td className="text-red text-bg-danger">no hay equipos disponibles</td>
                    </tr>
                )

            }
        </tbody>

     </Table>
    </div>
  )
}
