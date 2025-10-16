import React, { useState } from 'react'
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../Supabase'
import toast from 'react-hot-toast'

export default function Login() { //REAJUSTAR ESTILOS
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navegar = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
            email, 
            password
            })
            if(error){
                toast.error("Datos invalidos del email o password") 
                console.log(error)
                return
            }

            if(data?.user){
                const {data: perfil, error: errorPerfil} = await supabase
                .from('usuarios')
                .select('rol')
                .eq('id', data.user.id)
                .single()

                if(errorPerfil){
                    toast.error('Datos no validos')
                }

                toast.success('Inicio de sesion exitoso')

                if(perfil?.rol === "administrador") {
                    navegar('/dash-admin')
                }else{
                    navegar('/dash-user')
                }
            }
        } catch (error) {
            toast.error("Error con el login")
            console.log(error)
        }
    }

  return (
    <div>
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        <Row>
            <Col xs={12} md={8} lg={12} xl={12} className='mx-auto'>
                <Card>
                    <Card.Header className=''>
                        <Card.Title><h3 className='text-center fw-bold'>Login</h3></Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleLogin}>
                            <Form.Group className='mb-3'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                type='email'
                                placeholder='ingrese el Email con el que se registro loca'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            
                            <Form.Group className='mb-3'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                type='password'
                                placeholder='ingrese la passwrod con la que se registro'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <div className="d-grid justify-content-center mt-2" style={{width:'350px'}}>
                                <Button type="submit" variant='success'>Login</Button>
                            </div>
                            
                        </Form>
                        <div className='text-center mb-2'>
                            ¿No tienes cuenta? <a href="/register" className='text-primary text-decoration-none'>Registrarse gratis!</a>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
      </Container>

    </div>
  )
}
