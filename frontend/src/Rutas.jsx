import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import NavbarR from "./components/NavbarR";
import { Authprovider, useAuth } from "./context/AuthContext";
import ToastProvider from "./components/ToastProvider";
import CrearEquipo from "./Admin/CrearEquipo";
import LandingPage from "./components/LandingPage";
import ReservaEquipo from "./user/ReservaEquipo";
import MisReservas from "./user/MisReservas";
import ChatUsuario from "./user/ChatUsuario";
import ChatAdmin from "./Admin/ChatAdmin";
import AdminLayout from "./Admin/AdminLayout";
import GestionEquipos from "./Admin/GestionEquipos";


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
      <Route path="/dash-admin" element={isAuthenticated && user.rol === "administrador" ? <AdminLayout />: <Navigate to= '/' />}>
         <Route index element={<Navigate to="equipo-computo" replace />} />
         <Route path="equipo-computo" element={<GestionEquipos />} />
         <Route path="chat" element={<ChatAdmin />} />
        {/*<Route path="equipos-reservados" element={} /> */}
      </Route>

      {/*Rutas Usuario */}
      <Route path="/dash-user" element={isAuthenticated && user.rol === 'usuario' ? <NavbarR /> : <Navigate to='/login' />}>
        <Route index element={<Navigate to="reserva-equipo" replace />} />
        <Route path="reserva-equipo" element={<ReservaEquipo />} />
        <Route path="mis-reservas" element={<MisReservas />} />
        <Route path="chat" element={<ChatUsuario />} />
      </Route>


    </Routes>
  )
}

export default Rutas
