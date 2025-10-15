import React from 'react'
import { Button, Nav, Navbar,  } from 'react-bootstrap'
//import { useAuth } from '../context/AuthContext'
import { Link, Outlet,  } from 'react-router-dom'

export default function NavbarR() {// REAJUSTAR ESTILOS

    
    //const {user, logout} = useAuth()

    //const navigar = useNavigate()

    // const handleLogout = async (e) => {
    //     e.preventDefault()
    //    // logout()
    //   //  navigar('/') //Va la navgeacion a donde me dirije a la hora de cerrar sesion
    // }
 
  return (
    <>
      <div>
        <header className='bg-secondary'>
            <Navbar expand="lg" fixed= "top" className="p-4 bg-primary">
                <Navbar.Brand className='text-white'><h2>Equipos Computo</h2></Navbar.Brand>
                <Navbar.Toggle arial-controls="basic-navbar-nav"></Navbar.Toggle>

                <Navbar.Collapse id='basic-navbar-nav'>
                    {/* <Nav className='mx-auto gap-3'>
                        
                        
                    </Nav> */}
                    <Nav className='ms-auto gap-3'>
                        <Nav.Link as={Link} to="/login" className='text-white'>Login</Nav.Link>
                        <Nav.Link as={Link} to="/register" className='text-white'>SignUp</Nav.Link>
                    </Nav>
                    {/* <Nav className='mx-auto gap-3'>
                        {
                            user?.rol === 'administrador' && ( //lo mismo para usuario
                                <>
                                <NavLink className="text-white fw-bold">Gestion Equipos Computo</NavLink>
                                </>
                            )
                        }
                    </Nav> */}
                </Navbar.Collapse>
            <Button >Boton de cierre de sesion</Button>
            </Navbar>
        </header>
        <div style={{paddingTop: '100px'}}>
            <Outlet></Outlet>
        </div>  
      </div>
    </>
  )
}
