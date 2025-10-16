import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Register from "./components/Register";
import Login from "./components/Login";
import NavbarR from "./components/NavbarR";
import { Authprovider, useAuth } from "./context/AuthContext";
import ToastProvider from "./components/ToastProvider";
import CrearEquipo from "./Admin/CrearEquipo";
import ReservaEquipo from "./user/ReservaEquipo";


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
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/" element={<Home />} />

      {/*Rutas Administrador */}
      <Route path="/dash-admin" element={isAuthenticated && user.rol === "administrador" ? <NavbarR />: <Navigate to= '/' />}>
         <Route path="equipo-computo" element={<CrearEquipo />} />
        {/*<Route path="equipos-reservados" element={} /> */}
      </Route>

      {/*Rutas Usuario */}
      <Route path="/dash-user" element={isAuthenticated && user.rol === 'usuario' ? <NavbarR /> : <Navigate to='/login' />}>
        <Route path="reserva-equipo" element={<ReservaEquipo />} />
      </Route>


    </Routes>
  )
}

export default Rutas
