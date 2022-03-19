import React, { Component } from 'react';
import { Button, CloseButton, Modal } from 'react-bootstrap';

export class DeleteProductDialog extends Component {
    render() {
        return (
            // Modal for delete product
            <Modal 
                show={this.props.showModal}
                centered
                backdrop="static"
            >
                {/* Modal header containing header and title */}
                <Modal.Header>
                    <Modal.Title>Delete Product</Modal.Title>
                    <CloseButton onClick={() => this.props.closeModal()} />
                </Modal.Header>

                {/* Modal body which contains text */}
                <Modal.Body>
                    Are you sure you want to delete this product?
                </Modal.Body>

                {/* Modal Footer which contains the action buttons */}
                <Modal.Footer>
                    <Button variant="primary" onClick={() => this.props.closeModal()}>No</Button>
                    <Button variant="danger" onClick={() => this.props.deleteProduct()}>Yes</Button>
                </Modal.Footer>
            </Modal>    
        );
    }
}

export default DeleteProductDialog;
