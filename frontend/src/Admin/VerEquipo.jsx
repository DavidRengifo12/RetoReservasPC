import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { deleteEquipos } from '../services/equipoService'
import toast from 'react-hot-toast'
import { CiEdit } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import EditarEquipo from './EditarEquipo';

export default function VerEquipo({equipo, onUpdate}) {
    const [modalEquipo, setModalEquipo] = useState(false)
    const [selectEquipo, setSelectEquipo] = useState(null)

    const handleEditarEquipo = (equipo) => {
        setSelectEquipo(equipo)
        setModalEquipo(true)
    }

    const handleDeleteEquipo = async(id) =>{
        try{
            await deleteEquipos(id)
            toast.success('Equipo de Computo eliminado correctamente')
            if(onUpdate) onUpdate()
        }catch(error){
            console.log('error al elminar equipo', error)
        }
    }


  return (
    <>
      <div className='my-4'>
        <Table>
            <thead>
                <tr>
                    <th>Codigo</th>
                    <th>Nombre</th>
                    <th>Marca</th>
                    <th>Estado</th>
                    <th>Acciones</th>
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
                                <td className='d-flex gap-2'>
                                    <Button onClick={()=>handleEditarEquipo(equipitos)} variant='success'><CiEdit /></Button>
                                    <Button onClick={()=>handleDeleteEquipo(equipitos.id)} variant='danger'><TiDelete /></Button>
                                </td>
                            </tr>
                        ))
                    ): (
                        <tr>
                            <td>No se han creado equipos</td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
        <EditarEquipo 
        show={modalEquipo}
        onHide={() => setModalEquipo(false)}
        equipo={selectEquipo}
        isAdmin={true}
        onSave={onUpdate}
        />
      </div>
    </>
  )
}
