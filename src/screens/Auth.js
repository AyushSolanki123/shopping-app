import React, { Component } from 'react';
import '../css/Auth.css'
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import axios from 'axios';
import { Navigate } from 'react-router';
import { loginUser, registerUser } from '../utils/ApiActions';
import { Image } from 'react-bootstrap';

export class Auth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            loginDone: false,
            login: {
                firstName: "",
                lastName: "",
            },
            register: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            }
        }        
    }


    loginHandler(login) {
        loginUser(login)
            .then((response) => {
                if (response.loginDone)
                    this.setState({loginDone: true})
                else
                    throw new Error("Login failed")
            })         
            .catch((error) => {
                console.log(error)
            })
    }

    registerHandler(register) {
        registerUser(register)
            .then((response) => {
                console.log(response)
                this.setState({isLogin: true})
            })         
            .catch((error) => {
                console.log(error)
            })
    }

    switch(page) {
        if (page === 'login')
            this.setState({isLogin: true})
        else 
            this.setState({isLogin: false})
    }

  render() {
    return (
      <div className='background'>
          {this.state.loginDone &&
            <Navigate to='/' replace={true} />
          }
          {!this.state.loginDone &&        
            <div className='auth-card'>
                <div className='card-section col separator'>
                    <Image 
                        style={{justifyContent: 'center', display: 'flex', flex: 1}}
                        src='https://img.icons8.com/external-smashingstocks-circular-smashing-stocks/130/000000/external-shopper-shopping-and-e-commerce-smashingstocks-circular-smashing-stocks.png' 
                    />
                </div>
                <div className='card-section col'>
                    {this.state.isLogin &&
                        <Login 
                            switch={(page) => this.switch(page)}
                            loginHandler={(login) => this.loginHandler(login)}
                        />}
                    {!this.state.isLogin &&           
                        <Register 
                            switch={(page) => this.switch(page)}
                            registerHandler={(register) => this.registerHandler(register)}
                        />}
                </div>
            </div>
          }
      </div>
    )
  }
}

export default Auth