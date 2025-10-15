import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { postEquiposNuevos } from "../services/equipoService";


export default function CrearEquipo() {
    const [codeEquipo, setCodeEquipo] = useState("")
    const [nombreEquipo, setNombreEquipo] = useState("")
    const [marcaEquipo, setMarcaEquipo] = useState("")


    const handelNewEquipo = async (e) => {
        e.preventDefault()
        try {
            const dataEquiposComputo = await postEquiposNuevos({
                codeEquipo,
                nombreEquipo,
                marcaEquipo
            })
            console.log(dataEquiposComputo)

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
                                    value={codeEquipo}
                                    onChange={(e) => setCodeEquipo(e.target.value)}
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3 g-3">
                                <Form.Group>
                                    <Form.Label>Nombre Equipo Computo</Form.Label>
                                    <Form.Control 
                                    type="text"
                                    placeholder="Nombre equipo computo"
                                    value={nombreEquipo}
                                    onChange={(e) => setNombreEquipo(e.target.value)}
                                    />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3 g-3">
                                <Form.Group>
                                    <Form.Label>Marca Equipo Computo</Form.Label>
                                    <Form.Control 
                                    type="text"
                                    placeholder="Codigo serial del equipo"
                                    value={marcaEquipo}
                                    onChange={(e) => setMarcaEquipo(e.target.value)}
                                    />
                                </Form.Group>
                            </Row>
                            <div className="d-flex justify-content-center">
                                <Button type="submit">New Equipo</Button>    
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
      </div>
    </>
  )
}
