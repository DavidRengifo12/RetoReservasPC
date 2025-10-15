import { Button } from "react-bootstrap"

export default function Register2() {
  return (
    <>
     <section className='section fondo-img'>
      <div className='formulario'>
        <h1 className='h1'>Registro</h1>
        <form >
          <div className='username'>
            <input type="text" required/>
            <label>Nombre</label>
          </div>
          <div className='username'>
            <input type="text" required/>
            <label>Apellido</label>
          </div>
          <div className='username'>
            <input type="email"  required/>
            <label>Correo</label>
          </div>
          <div className='username'>
            <input type="password" />
            <label>Contraseña</label>
          </div>
          {/*<input type="submit" value="Registrarse"/>*/}
          <Button type='submit' variant='success' className='w-100 mt-3'>Registrarme</Button>
        </form>
        <div className='registrarse'>
          ¿Ya tienes cuenta? <a href="/login">Iniciar sesión</a>
        </div>
      </div>
    </section> 
    </>
  )
}
