import React, { Component } from 'react';
import { Dropdown, Row, Col, Button } from 'react-bootstrap';
import capitalize from '../../utils/CapitalizeText';

export class FilterProducts extends Component {

    render() {
        return (
            <Row>
                <Col lg={1}>Filter By: </Col>                                        
                <Col lg={9}>                                    
                    <Dropdown>
                        {/* Toggle to select category from below listed items */}
                        <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                            {this.props.currentFilter}
                        </Dropdown.Toggle>

                        {/* Different Category to select from */}                        
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.props.setFilter("All")}>All</Dropdown.Item>   
                            {this.props.categories.data.map(category => {                                                                
                                return <Dropdown.Item key={category._id} onClick={() => this.props.setFilter(category._id)}>{capitalize(category.name)}</Dropdown.Item>
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col lg={2}>
                    {/* Add Product Button which shows the modal on click */}
                    <Button onClick={() => this.props.handleAddProduct()}>
                        Add Product
                    </Button>  
                </Col>
            </Row>
        );
    }
}

export default FilterProducts;
