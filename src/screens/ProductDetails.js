/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from 'axios';
import React, { Component } from 'react';
import { IconButton } from '@mui/material';
import { Card, Col, Row } from 'react-bootstrap';
import { Navigate } from 'react-router';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import NavBar from '../components/NavBar';
import Loading from '../components/Loading';
import ProductDetail from '../components/Product/ProductDetail';
import DeleteProductDialog from '../components/Product/DeleteProductDialog';
import EditProductDialog from '../components/Product/EditProductDialog';
import '../css/ProductDetails.css';
import { deleteProduct, getProduct, updateProduct } from '../utils/ApiActions';

class ProductDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            loading: true,
            navigate: false, // Flag to handle back button
            showDeleteDialog: false, // Flag to show delete product dialog
            showEditDialog: false, // Flag to show edit product dialog
            product: {}
        }
    }

    // Get the product details from api whose id is stored in localstorage
    componentDidMount() {
        var id = localStorage.getItem("productId");
        this.setState({ id: id })
        getProduct(id)
            .then((response) => {
                this.setState({
                    product: response.data,
                    loading: false
                });               
            })
            .catch((err) => {
                console.log(err);
            })
    }

    // Navigate back to home page and delete the current product id from localstorage
    backToHome() {
        localStorage.removeItem("productId");
        this.setState({
            navigate: true
        });
    }

    // Delete the product from the api
    deleteProductHandler() {
        this.setState({ showDeleteDialog: false });
        deleteProduct(this.state.id)
            .then((response => {
                console.log(response)
                this.backToHome();
            }))
            .catch((err) => {
                console.log(err)
            });
    }

    // Edit the product from the api and set the edited value on the frontend
    editProductHandler(product) {
        console.log(product)
        this.setState({ showEditDialog: false });        
        updateProduct(this.state.id, product)
            .then((response) => {         
                console.log(response.data)      
                this.setState({product: response.data})
            })  
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <React.Fragment>
                {/* Navigation bar */}
                <NavBar />
                {/* Loading State while page get product from api */}
                {this.state.loading && <Loading />}
                {!this.state.loading &&             
                    <React.Fragment>
                        {/* Delete product dialog which contains buttons to delete product */}
                        <DeleteProductDialog 
                            showModal={this.state.showDeleteDialog}
                            closeModal={() => this.setState({ showDeleteDialog: false })}
                            deleteProduct={() => this.deleteProductHandler()}
                        />
                        {/* Edit product dialog which conatins form and emits the data */}
                        <EditProductDialog 
                            product={this.state.product}
                            showModal={this.state.showEditDialog}
                            closeModal={() => this.setState({ showEditDialog: false })}
                            editProduct={(product) => this.editProductHandler(product)}
                        />
                        {this.state.navigate && 
                            // component that navigates back to home page
                            <Navigate to="/" replace={true} />    
                        }
                        {!this.state.navigate &&
                            // Main page
                            <div className="body">
                                <Card className="row main-card">
                                    <Row>
                                        {/* back button to navigate back to home page */}
                                        <Col xs={1}>
                                            <IconButton aria-label='back' onClick={() => this.backToHome()}>
                                                <ArrowBackIosNewIcon />
                                            </IconButton>
                                        </Col>
                                        {/* Component to render product image */}
                                        <Col className='image' xs={4}>
                                            <img src={this.state.product.imageUrl} alt="Product Image" className='product-image' />
                                        </Col>
                                        {/* Component that renders all product details and contains edit and delete button */}
                                        <ProductDetail 
                                            product={this.state.product} 
                                            showDelete={() => this.setState({ showDeleteDialog: true })}
                                            showEdit={() => this.setState({ showEditDialog: true })}
                                        />                               
                                    </Row>
                                </Card>
                            </div>
                        }
                    </React.Fragment>    
                }
            </React.Fragment>
        )
    }    
}

export default ProductDetails;