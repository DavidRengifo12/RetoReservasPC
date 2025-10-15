import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import Rutas from './Rutas';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Rutas />
  </StrictMode>,
)
