import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ProductCard from './ProductCard';

class ProductList extends Component {

    render() {
        return (
            <Container>
                <Row>
                {
                    /* 
                        List card such that on it shows 4 cards on large breakpoint
                        3 cards on medium and 2 cards on small breakpoint
                    */
                    this.props.products.map(product => 
                        (
                            <Col key={product._id} sm={6} md={4} lg={3}>                                
                                <ProductCard product={product} />
                            </Col>
                        )
                    )
                }
                </Row>
            </Container>
        )
    }    
}

export default ProductList;