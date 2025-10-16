import React from 'react'
import { Button, Nav, Navbar,  } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { Link, Outlet, useNavigate} from 'react-router-dom'

export default function NavbarR() {// REAJUSTAR ESTILOS

    
    const {user, logout} = useAuth()

    const navigar = useNavigate()

    const handleLogout = async (e) => {
        e.preventDefault()
        logout()
        navigar('/') 
    }
 
  return (
    <>
      <div>
        <header className='bg-secondary'>
            <Navbar expand="lg" fixed= "top" className="p-4 bg-success">
                <Navbar.Brand className='text-white'><h2>Equipos Computo</h2></Navbar.Brand>
                <Navbar.Toggle arial-controls="basic-navbar-nav"></Navbar.Toggle>

                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mx-auto gap-3'>
                        {
                            user?.rol === 'usuario' && (
                                <>
                                    <Nav.Link as={Link} to='/dash-user/reserva-equipo' className="text-white fw-bold">Alquilar Equipos</Nav.Link>
                                </>
                            )
                        }    
                    </Nav> 
                    
                    <Nav className='mx-auto gap-3'>
                        {
                            user?.rol === 'administrador' && (
                                <>
                                <Nav.Link as={Link} to="/dash-admin/equipo-computo" className="text-white fw-bold">Gestion Equipos Computo</Nav.Link>
                                </>
                            )
                        }
                    </Nav> 

                    
                </Navbar.Collapse>
            <Button onClick={handleLogout}>Cerrar Sesion</Button>
            </Navbar>
        </header>
        <div style={{paddingTop: '100px'}}>
            <Outlet></Outlet>
        </div>  
      </div>
    </>
  )
}
