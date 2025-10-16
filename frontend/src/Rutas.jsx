import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import NavbarR from "./components/NavbarR";
import { Authprovider, useAuth } from "./context/AuthContext";
import ToastProvider from "./components/ToastProvider";
import CrearEquipo from "./Admin/CrearEquipo";
import LandingPage from "./components/LandingPage";


const Rutas =() => { //PROTEGER LAS RUTAS CON AUTHCONTEXT
  return (
    <>
    <Authprovider>
     <BrowserRouter>
        <ToastProvider />
        <RutasWeb />
     </BrowserRouter> 
     </Authprovider>
    </>
  )
}

const RutasWeb = () => {
  const {isAuthenticated, user} = useAuth()
  return(
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/*Rutas Administrador */}
      <Route path="/dash-admin" element={isAuthenticated && user.rol === "administrador" ? <NavbarR />: <Navigate to= '/' />}>
         <Route path="equipo-computo" element={<CrearEquipo />} />
        {/*<Route path="equipos-reservados" element={} /> */}
      </Route>

      {/*Rutas Usuario */}
      <Route path="/dash-user" element={isAuthenticated && user.rol === 'usuario' ? <NavbarR /> : <Navigate to='/login' />}>
        
      </Route>


    </Routes>
  )
}

export default Rutas
