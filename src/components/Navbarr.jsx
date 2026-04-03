import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

const Navbarr = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
          <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
          <Nav.Link onClick={() => navigate("/register")}>Register</Nav.Link>
          <Nav.Link onClick={() => navigate("/book/list")}>List Items</Nav.Link>
          <Nav.Link onClick={() => navigate("/orders")}>Orders</Nav.Link>
        </Nav>
      </Container>
      <Button variant="danger" onClick={firebase.isLoggedIn ? firebase.logoutUser : () => navigate("/login")}>{firebase.isLoggedIn ? 'Logout' : 'Login'}</Button>
    </Navbar>
  )
}

export default Navbarr
