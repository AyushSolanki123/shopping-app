import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

function NavBar() {
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand>Shopper</Navbar.Brand>
                    {/* <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/product">Products</Nav.Link>
                    </Nav> */}
            </Container>
        </Navbar>
    );
}

export default NavBar;