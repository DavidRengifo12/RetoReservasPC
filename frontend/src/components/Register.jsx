import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import supabase from '../Supabase'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Register() { //REAJUSTAR ESTILOS
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [rol] = useState("usuario")

  const navegar = useNavigate()


  const handleregister = async (e) => {
    e.preventDefault()
    try {
        const {data, error} = await supabase.auth.signUp({
        email,
        password,
        options:{
          data:{
            nombre, 
            phone,
            rol
          }
        }
      })
      if(error){
        toast.error("Error al resgitrarlo datos no validos")
      }

      if(data.user){
        toast.success('Registro exitoso')
        navegar('/dash-user')
      }

      setNombre("")
      setEmail("")
      setPassword("")
      setPhone("")
    } catch (error) {
      toast.error("Error con el registro")
      console.log(error)
    }
  }



  return (
    <div>
      <Container className='vh-100 d-flex justify-content-center align-items-center'>
        <Row>
          <Col xs={12} md={8} lg={12} xl={12} className='mx-auto' >
            <Card>
              <Card.Header className=''>
                <Card.Title><h3 className=' text-center fw-bold'>Registrarse</h3></Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleregister}>
                  <Form.Group className='mb-3'>
                    <Form.Label>Nombre y apellidos</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder='ingrese su name completico'
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    />  
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    type='email'
                    placeholder='ingrese su email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />  
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type='password'
                    placeholder='* * * * * * * *'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />  
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control 
                    type='text'
                    placeholder='ingrese su numero de telefono'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    />  
                  </Form.Group>
                  
                  {/* <Form.Group className='mb-3'>
                  <Form.Label>Rol</Form.Label>
                  <Form.Select value={rol} onChange={(e) => setRol(e.target.value)}>
                    <option value="usuario">Usuario</option>
                    <option value="administrador">Administrador</option>
                  </Form.Select>
                </Form.Group> */}
                 <div className='d-flex justify-content-center' style={{width: "350px"}}>
                  <Button type='submit' variant='success'>Registrarme</Button>
                </div>
                </Form>
                <div className='text-center mb-2'>
                    ¿Ya tienes cuenta? {" "} <a href="/login" className='text-primary text-decoration-none'>Login</a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
