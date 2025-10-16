import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { getEquiposComputo, postEquiposNuevos } from "../services/equipoService";
import VerEquipo from "./VerEquipo";


export default function CrearEquipo() {
    const [codigo_equipo, setCodeEquipo] = useState("")
    const [nombre_equipo, setNombreEquipo] = useState("")
    const [marca_equipo, setMarcaEquipo] = useState("")

    const [equipos, setEquipos] = useState([])

    
    const obtenerEquipos = async () => {
        try {
            const dataEquipos = await getEquiposComputo()
            setEquipos(dataEquipos)
        } catch (error) {
            console.log('Error al obtener los Equipos',error)
        }
    }
        
    useEffect(() => {
        obtenerEquipos()
    }, [])


    const handelNewEquipo = async (e) => {
        e.preventDefault()
        try {
            const dataEquiposComputo = await postEquiposNuevos({
                codigo_equipo,
                nombre_equipo,
                marca_equipo
            })
            console.log(dataEquiposComputo)

            setEquipos(prev => ([...prev, dataEquiposComputo]))

            setCodeEquipo("")
            setNombreEquipo("")
            setMarcaEquipo("")

            toast.success('Equipo de computo creado con exito')
        } catch (error) {
            toast.error('Hubo un error al crear el equipo')
            console.log(error)
        }
    }


  return (
    <>
      <div className="d-flex mt-5">
        <Container className="mt-5">
            <Row className="justify-content-center align-items-start g-4">
                <Col xs={12} md={12} lg={5} >
                    <div className="p-4 rounded shadow bg-white">
                        <h2 className="mb-4 fw-bold">Nuevo Equipo de computo</h2>                        
                        <Form onSubmit={handelNewEquipo}>
                            <Row className="mb-3 g-3">
                                <Form.Group>
                                    <Form.Label>Code Equipo</Form.Label>
                                    <Form.Control 
                                    type="text"
                                    placeholder="Codigo serial del equipo"
                                    value={codigo_equipo}
                                    onChange={(e) => setCodeEquipo(e.target.value)}
                                    required
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3 g-3">
                                <Form.Group>
                                    <Form.Label>Tipo Equipo Computo</Form.Label>
                                    <Form.Control 
                                    type="text"
                                    placeholder="Tipo de equipo ej: Tv, Celular, Pc"
                                    value={nombre_equipo}
                                    onChange={(e) => setNombreEquipo(e.target.value)}
                                    required
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3 g-3">
                                <Form.Group>
                                    <Form.Label>Marca Equipo Computo</Form.Label>
                                    <Form.Control 
                                    type="text"
                                    placeholder="Marca del equipo, ej: Dell, Hp, Lenovo"
                                    value={marca_equipo}
                                    onChange={(e) => setMarcaEquipo(e.target.value)}
                                    required
                                    />
                                </Form.Group>
                            </Row>
                            <div className="d-flex justify-content-center">
                                <Button type="submit" variant="success">New Equipo</Button>    
                            </div>
                        </Form>
                    </div>
                </Col>
                <Col>
                    <div>
                        <VerEquipo equipo={equipos} onUpdate={obtenerEquipos}/>
                    </div>
                </Col>
            </Row>
        </Container>
      </div>
    </>
  )
}
