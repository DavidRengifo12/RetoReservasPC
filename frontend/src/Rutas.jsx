import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Register from "./components/Register";
import Login from "./components/Login";
import NavbarR from "./components/NavbarR";


export default function Rutas() { //PROTEGER LAS RUTAS CON AUTHCONTEXT
  return (
    <>
     <BrowserRouter>
        <Routes>
            
            <Route path="/" element={<NavbarR />} >
                <Route path="/home" element={<Home />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
            </Route>
        </Routes>
     </BrowserRouter> 
    </>
  )
}
