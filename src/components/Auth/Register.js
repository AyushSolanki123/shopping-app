import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap';

export class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            register: {
                firstName: "test",
                lastName: "user",
                email: "test@test.com",
                password: "12345678",
            }
        }
    }

    render() {
        return (
            <div className='register'>
                <div className='text-center heading mb-3'>Register User</div>
                <Form>
                    <div className='row justify-content-between mb-2'>
                        <Form.Group className='col'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                            type="email"
                            placeholder='Enter Email'
                            value={this.state.register.firstName}
                            onChange={(event) => this.setState(prevState => {
                                let register = {...prevState.register};
                                register.firstName = event.target.value;
                                return { register }
                            })}
                            />
                        </Form.Group>
                        <Form.Group className='col'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                            type="email"
                            placeholder='Enter Email'
                            value={this.state.register.lastName}
                            onChange={(event) => this.setState(prevState => {
                                let register = {...prevState.register};
                                register.lastName = event.target.value;
                                return { register }
                            })}
                            />
                        </Form.Group>
                    </div>

                    <Form.Group className='mb-2'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                        type="email"
                        placeholder='Enter Email'
                        value={this.state.register.email}
                        onChange={(event) => this.setState(prevState => {
                            let register = {...prevState.register};
                            register.email = event.target.value;
                            return { register }
                        })}
                        />
                    </Form.Group>
                    <Form.Group className='mb-2'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password"
                            placeholder='Enter Password'
                            value={this.state.register.password}
                            onChange={(event) => this.setState(prevState => {
                            let register = {...prevState.register};
                            register.password = event.target.value;
                            return { register }
                            })}
                        />
                    </Form.Group>
                    
                    <div className='row justify-content-between'>
                        <Button variant='secondary' className='button' onClick={() => this.props.switch('login')}>
                            Login
                        </Button>
                        <Button variant="primary" className='button' onClick={() => this.props.registerHandler(this.state.register)}>
                            Register
                        </Button>
                    </div>
                </Form>
            </div>    
        )
    }
}

export default Register