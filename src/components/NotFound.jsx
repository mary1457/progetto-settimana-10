import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <Container> 
      <Row className="justify-content-center m-3">
        <Col xs={12} md={8} >
          <h2>404 - Not found</h2>
          <p>
            Ci dispiace, ma la pagina che stavi cercando non può essere trovata.
          </p>
          <Button
            variant="primary"
            onClick={() => {
              navigate('/') 
            }}
          >
            TORNA IN HOMEPAGE
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound