import React from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'

export default function Register() { //PASAR FUNCIONALIDADES Y REAJUSTAR ESTILOS
  return (
    <div>
      <Container className='vh-100 d-flex justify-content-center align-items-center'>
        <Row>
          <Col xs={12} md={8} lg={12} xl={12} className='mx-auto' >
            <Card>
              <Card.Header className='bg-primary'>
                <Card.Title><h3 className='text-white text-center fw-bold'>Registrarse</h3></Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className='mb-3'>
                    <Form.Label>Nombre y apellidos</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder='ingrese su name completico'
                    />  
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    type='email'
                    placeholder='ingrese su email'
                    />  
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type='password'
                    placeholder='ingrese su password'
                    />  
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder='ingrese su numero de telefono'
                    />  
                  </Form.Group>
                </Form>
                <div className='d-flex justify-content-center' style={{width: "350px"}}>
                  <Button type='submit'>Registrarme</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
