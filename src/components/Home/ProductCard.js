import React, { Component } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Rating from '@mui/material/Rating';
import { Navigate } from 'react-router';

class ProductCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navigate: false
        }
        this.handleNavigate = this.handleNavigate.bind(this);
    }

    // Stores id in localstorage and set navigate to true to navigate to ProductDetails Screen
    handleNavigate() {
        localStorage.setItem("productId", this.props.product._id)
        this.setState({
            navigate: true
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.navigate && 
                    // Navigate to product page 
                    <Navigate to="/product" replace={true} />
                }
                {!this.state.navigate && 
                    // Card to show product details
                    (
                        <Card className='product-card' onClick={this.handleNavigate}>
                            <Card.Img variant='top' src={this.props.product.imageUrl} className='product-card-image' />
                            <Card.Body>
                                <Card.Title style={{ textOverflow: 'ellipsis' }}>{this.props.product.name}</Card.Title>
                                <Container>
                                    <Row className='justify-content-between'>
                                        <Col>Price: ${this.props.product.price}</Col>
                                        <Col>Rating: <Rating value={this.props.product.rating.rate} readOnly /></Col>
                                    </Row>
                                </Container>
                           </Card.Body>
                        </Card>
                    )
                }
            </React.Fragment>
        )
    }    
}

export default ProductCard;