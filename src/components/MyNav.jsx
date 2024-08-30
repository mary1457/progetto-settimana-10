import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './style.css';
const MyNav = function () {
  return (
    <Navbar collapseOnSelect expand="md" bg="primary" data-bs-theme="light" className='nvblu'>
      <Container fluid>
        <Navbar.Brand href="#home" className='text-white'>EpiMeteo</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto ">
          <Link to="/" className="text-decoration-none text-white nav-link">
          Previsioni
              </Link>
          
          
            <Nav.Link href="#about" className='text-white'>Regioni</Nav.Link>
            <Nav.Link href="#browse" className='text-white'>Notizie</Nav.Link>
            <Nav.Link href="#browse"className='text-white'>Info</Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNav
