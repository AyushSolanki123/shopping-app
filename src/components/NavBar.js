import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

function NavBar() {
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand>
                    <img src='https://img.icons8.com/external-smashingstocks-circular-smashing-stocks/45/000000/external-shopper-shopping-and-e-commerce-smashingstocks-circular-smashing-stocks.png' alt='img' />
                    {'  '}Shopper
                </Navbar.Brand>
                    {/* <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/product">Products</Nav.Link>
                    </Nav> */}
            </Container>
        </Navbar>
    );
}

export default NavBar;