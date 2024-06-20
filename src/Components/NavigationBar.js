import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ListGroup } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function NavigationBar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <Button variant="light" onClick={handleShow}>
              Menu
            </Button>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/banner_page")}>
              Banner Page
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/video_gallery")}>
              Video Gallery
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/aboutus_page")}>
              About Us Page
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/contactus_page")}>
              Contact Us Page
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            <ListGroup.Item action href="/banner_page">
              Landing Page Banner
            </ListGroup.Item>
            <ListGroup.Item action href="/video_gallery">
              Video Gallery
            </ListGroup.Item>
            <ListGroup.Item action href="/aboutus_page">
              About Us
            </ListGroup.Item>
            <ListGroup.Item action href="/contactus_page">
              Contact Us
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavigationBar;
