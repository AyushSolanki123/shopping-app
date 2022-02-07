import React, { Component } from 'react';
import { Modal, ModalBody, Button, ModalFooter, ModalTitle, Form, CloseButton } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';

export class AddProductDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {
                title: "",
                category: "",
                description: "",
                image: "", 
                price: 0,
                rating: {}
            }
        }
    }

    componentDidMount() {
        // Autofill the product details into form
        this.setState({product: this.props.product})
    }

    render() {
        return (
            // Modal for Edit Product
            <Modal
                show={this.props.showModal}
                centered
                backdrop="static"
            >
                {/* Modal header containing title and close button */}
                <ModalHeader>
                    <ModalTitle>Edit Product</ModalTitle>
                    <CloseButton onClick={() => this.props.closeModal()} />
                </ModalHeader>
                {/* ModalBody containing the form */}
                <ModalBody>
                    <Form>
                        {/* Input for Product title */}
                        <Form.Group>
                            <Form.Label>Enter Title</Form.Label>
                            <Form.Control
                                as="input"
                                type="string"
                                placeholder="Enter Title"
                                value={this.state.product.title}
                                onChange={(event) => this.setState(prevState => {
                                    let product = {...prevState.product};
                                    product.title = event.target.value;
                                    return { product };
                                })}
                            />
                        </Form.Group>
                        {/* Select Input for Category to select from pre-listed categories */}
                        <Form.Group>
                            <Form.Label>Select Category</Form.Label>
                            <Form.Select
                                value={this.state.product.category}
                                onChange={(event) => this.setState(prevState => {
                                    let product = {...prevState.product};
                                    product.category = event.target.value;
                                    return { product };
                                })}
                            >
                                <option value="Men's Clothing">Men's Clothing</option>
                                <option value="Jewelery">Jewelery</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Women's Clothing">Women's Clothing</option>
                            </Form.Select>
                        </Form.Group>
                        {/* Textarea type input for description */}
                        <Form.Group>
                            <Form.Label>Enter Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter Description"
                                value={this.state.product.description}
                                onChange={(event) => this.setState(prevState => {
                                    let product = {...prevState.product};
                                    product.description = event.target.value;
                                    return { product };
                                })}
                            />
                        </Form.Group>
                        {/* Input for Price */}
                        <Form.Group>
                            <Form.Label>Enter Price</Form.Label>
                            <Form.Control
                                as="input"
                                type="string"
                                placeholder="Enter Price"
                                value={this.state.product.price}
                                onChange={(event) => this.setState(prevState => {
                                    let product = {...prevState.product};
                                    product.price = event.target.value;
                                    return { product };
                                })}
                            />
                        </Form.Group>
                    </Form>
                </ModalBody>
                {/* Button to handle edit product */}
                <ModalFooter>
                    <Button onClick={() => this.props.editProduct(this.state.product)}>Edit Product</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default AddProductDialog;