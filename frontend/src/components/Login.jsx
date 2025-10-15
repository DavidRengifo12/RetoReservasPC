import React from 'react'
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Login() { //PASAR FUNCIONALIDADES Y REAJUSTAR ESTILOS
  return (
    <div>
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        <Row>
            <Col xs={12} md={8} lg={12} xl={12} className='mx-auto'>
                <Card>
                    <Card.Header className='bg-primary'>
                        <Card.Title><h1 className='text-center text-white fw-bold'>Login</h1></Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group className='mb-3'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                type='email'
                                placeholder='ingrese el Email con el que se registro loca'
                                />
                            </Form.Group>

                            
                            <Form.Group className='mb-3'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                type='password'
                                placeholder='ingrese la passwrod con la que se registro'
                                />
                            </Form.Group>

                            <div className="d-flex justify-content-center mt-2" style={{width:'350px'}}>
                                <Button type="submit">Login</Button>
                            </div>
                            <div className="text-center align-items-center mt-2"> 
                                {/* <p>¿No estas registrado? <Link to='/register'>Resgistrate Aqui!</Link></p> */}
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
      </Container>

    </div>
  )
}
