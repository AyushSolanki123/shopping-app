import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: {
                email: "ayush.solanki1981@gmail.com",
                password: "12345678",
            }
        }        
    }

    render() {
        return (
            <div className='login'>
                <div className='text-center heading mb-3'>Login User</div>
                <Form>
                    <Form.Group className='mb-2'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                        type="email"
                        placeholder='Enter Email'
                        value={this.state.login.email}
                        onChange={(event) => this.setState(prevState => {
                            let login = {...prevState.login};
                            login.email = event.target.value;
                            return { login }
                        })}
                        />
                    </Form.Group>
                    <Form.Group className='mb-4'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password"
                            placeholder='Enter Password'
                            value={this.state.login.password}
                            onChange={(event) => this.setState(prevState => {
                            let login = {...prevState.login};
                            login.password = event.target.value;
                            return { login }
                            })}
                        />
                    </Form.Group>
                    <div className='row justify-content-between'>
                        <Button variant='secondary' className='button' onClick={() => this.props.switch('register')}>
                            Register
                        </Button>
                        <Button variant="primary" className='button' onClick={() => this.props.loginHandler(this.state.login)}>
                            Login
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default Login