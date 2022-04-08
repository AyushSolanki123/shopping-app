import React, { Component } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

export class SearchProducts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ""
        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    // set search value in state and emit search value to Home screen
    handleSearchChange(event) {
        this.setState({
            search: event.target.value
        });
        this.props.handleSearchChange(this.state.search);
    }

    render() {
        return (
            // Search input field to enter search query
            <InputGroup className="mb-3">
                <FormControl
                    value={this.state.search}
                    onChange={this.handleSearchChange}
                    placeholder="Enter Product Name"
                    aria-describedby="basic-addon2"
                />
                {/* Button to enable search */}
                <Button variant="outline-secondary" id="button-addon2" onClick={() => this.props.searchProducts()}>
                    Search
                </Button>
                                        

            </InputGroup>
        );
    }
}

export default SearchProducts;
