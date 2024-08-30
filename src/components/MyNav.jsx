import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const MyNav = function () {
  return (
    <Navbar collapseOnSelect expand="md" bg="primary" data-bs-theme="light">
      <Container fluid>
        <Navbar.Brand href="#home">EpiMeteo</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto ">
          <Link to="/" className="text-decoration-none  nav-link">
          Previsioni
              </Link>
          
          
            <Nav.Link href="#about">Regioni</Nav.Link>
            <Nav.Link href="#browse">Notizie</Nav.Link>
            <Nav.Link href="#browse">Info</Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNav
