import React, { Component } from 'react';
import { Modal, ModalBody, Button, ModalFooter, ModalTitle, Form, CloseButton } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import capitalize from '../../utils/CapitalizeText';

export class AddProductDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {
                name: "",
                category: "",
                description: "",
                imageUrl: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", // hardcoding image
                price: 0,
                quantity: 0,
                rating: { // Hardcoding rate value since users cannot rate product now
                    rate: 4.1,
                    count: 120
                }
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
                                value={this.state.product.name}
                                onChange={(event) => this.setState(prevState => {
                                    let product = {...prevState.product};
                                    product.name = event.target.value;
                                    return { product };
                                })}
                            />
                        </Form.Group>
                        {/* Select Input for Category to select from pre-listed categories */}
                        <Form.Group>
                            <Form.Label>Select Category</Form.Label>
                            <Form.Select
                                value={this.state.product.categor}
                                onChange={(event) => this.setState(prevState => {
                                    let product = {...prevState.product};
                                    product.category = event.target.value;
                                    return { product };
                                })}
                            >
                                {this.props.categories.data.map((category) => {
                                    return <option key={category._id} value={category._id}>{capitalize(category.name)}</option>
                                })}
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
                        <Form.Group>
                            <Form.Label>Enter Quantity</Form.Label>
                            <Form.Control
                                as="input"
                                type="string"
                                placeholder="Enter Price"
                                value={this.state.product.quantity}
                                onChange={(event) => this.setState(prevState => {
                                    let product = {...prevState.product};
                                    product.quantity = event.target.value;
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