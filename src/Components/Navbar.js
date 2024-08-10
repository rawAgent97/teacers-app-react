import React from 'react';
import { Navbar,Nav,Container } from 'react-bootstrap';

const NavBar=()=>{
    return (
        <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand className='tail-head-nav' href="/home">Tailwebs.</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
}

export default NavBar
