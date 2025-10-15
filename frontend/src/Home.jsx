import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navegar = useNavigate()
  return (
    <div>
      <div>
      <main className="min-vh-100 bg-white d-flex justify-content-center px-3 py-5"> 
        <Container>
          <Row>
            <Col>
              <img src="/equipoComputo.jpg" alt="img sena" 
              className="w-100 mb-4"
              style={{borderRadius: '15px', maxHeight: "330px", objectFit: "cover"}}
              />
            </Col>
          </Row>

          <Row className="justify-content-center text-center " style={{marginTop: '30px'}} >
            <Col xs={12} md={10} lg={9}>
              <h1 className="fw-bold display-5 fs-1 mb-3">Alquiler de Equipos en computacion SenaSoft</h1>
              <p className="text-muted fs-6 mb-4 max-w-600 mx-auto" style={{ maxWidth: "700px" }}>
                Una plataforma construida para que los aprendices del SENA puedan
                Alquilar Equipos de computacion.
              </p>
            </Col>

            <div className="mb-4">
              <Button onClick={() => navegar('/login')}>Ingresar</Button>
            </div>

            <div className="d-flex flex-column flex-md-row align-items-center justify-content-center gap-3 mt-8">
              <img src="../public/sena.png" alt="logito sena" height={40} />
              <div
                className="d-none d-md-block"
                style={{ width: 1, height: 30, backgroundColor: "gray" }}
              />
              <img
                src="/logo_fabrica.png"
                alt="Logo fábrica de software"
                height={50}
              />
               <div
                className="d-none d-md-block"
                style={{ width: 1, height: 30, backgroundColor: "gray" }}
              />
            </div>
          </Row>
        </Container>
      </main>
    </div>
    </div>
  )
}
