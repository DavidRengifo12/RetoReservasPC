import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { actualizarEstadoEquipo, getEquiposReservas, reservaEquipo, existeReservaEquipoEnDia, existeReservaUsuarioEnDia } from "../services/alquilerEquipo";
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
            const ahora = new Date()
            const inicioDia = new Date(Date.UTC(ahora.getUTCFullYear(), ahora.getUTCMonth(), ahora.getUTCDate(), 0, 0, 0))
            const finDia = new Date(Date.UTC(ahora.getUTCFullYear(), ahora.getUTCMonth(), ahora.getUTCDate() + 1, 0, 0, 0))
            const inicioDiaISO = inicioDia.toISOString()
            const finDiaISO = finDia.toISOString()

            const existeParaEquipo = await existeReservaEquipoEnDia(equipitos.id, inicioDiaISO, finDiaISO)
            if (existeParaEquipo) {
                toast.error('Este equipo ya tiene una reserva para hoy')
                return
            }

            const existeParaUsuario = await existeReservaUsuarioEnDia(user.id, inicioDiaISO, finDiaISO)
            if (existeParaUsuario) {
                toast.error('Ya tienes una reserva activa para hoy')
                return
            }

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
    <div className="my-4 d-flex justify-content-center">
     <div style={{maxWidth:'900px', width:'100%'}}> 
     <h1>Reservacion de equipos</h1> 
     <Table size="sm" responsive striped bordered hover> 
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
    </div>
  )
}
