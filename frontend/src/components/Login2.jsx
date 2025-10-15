import { Button } from 'react-bootstrap'
import './styles/Style.css'

export default function Login2() {
  return (
    <>
      <section className='section fondo-img'>
      <div className='formulario'>
            <h1 className='h1'>Login</h1>
            <form method='post'>
                <div className='username '>
                    <input type="text" required/>
                    <label>Username</label>
                </div>
                <div className='username '>
                    <input type="password" required/>
                    <label >Password</label>
                </div>
                
                {/*<input type="submit" value="Iniciar" handleSubmit/>*/}
              <Button type="submit" variant="success" className="w-100 mt-3">
                Iniciar
              </Button>
     
                <div className='registrarse'>
                    <div className='recordar'>¿Olvido su contraseña?</div> ¿No estas registrardo? <a href="/register">Registrarme ahora</a>
                </div>
            </form>
      </div>
    </section>
    </>
  )
}
