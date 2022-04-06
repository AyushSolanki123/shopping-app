import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Button,  Rating } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import capitalize from '../../utils/CapitalizeText';

export class ProductDetail extends Component {
    render() {
        return (
            <Col className='product-details' xs={5}>
                {/* Product title */}
                <div className='product-title mb-3'>{this.props.product.name}</div>
                {/* product price */}
                <div className='mb-2'>
                    <span className='text-bold'>Price: </span>$ {this.props.product.price}
                </div>
                {/* product quantity */}
                <div className='mb-2'>
                    <span className='text-bold'>Quantity: </span> {this.props.product.quantity}
                </div>
                {/* Product description */}
                <div className='mb-2'>
                    <span className='text-bold'>About this item: </span>
                    <div>{this.props.product.description}</div>
                </div>
                {/* Product Category */}
                <div className='mb-2'>
                    <span className='text-bold'>Category: </span>
                    {capitalize(this.props.product.category.name)}
                </div>
                {/* Product ratings */}
                <div className='mb-5'>
                    <Rating value={this.props.product.rating.rate} className="mt-2" readOnly />
                    <span className='mx-3'>{this.props.product.rating.count} Ratings</span>
                </div>
                {/* Callback Buttons for edit and delete product */}
                <Row>
                    <Col>                                            
                        <Button
                            onClick={() => this.props.showEdit()} 
                            variant='contained' 
                            startIcon={<EditIcon />}>
                            Edit Product
                        </Button>
                    </Col>
                    <Col>                                                
                        <Button 
                            onClick={() => this.props.showDelete()}
                            variant='contained' 
                            startIcon={<DeleteIcon />} 
                            color="error">
                            Delete Product
                        </Button>
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default ProductDetail;
