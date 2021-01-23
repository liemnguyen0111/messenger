import React , { Component } from 'react'
import Button from './Button'

class SignIn extends Component{
    render(){
        return(
            <div className="in">
                {/* <label htmlFor="username">username</label> */}
                <div className="main-input">
                <i className="fas fa-user"></i>
                <input type="text" name="username" placeholder="Username"/>
                </div>
                {/* <label htmlFor="password">password</label> */}
                <div className="main-input">
                <i className="fas fa-key"></i>
                <input type="password" name="password" placeholder="Password"/>
                </div>
               
            <Button 
            name='Sign In'
            type='sign-in'
            width = {200}
            height = {30}
            />
            <div className="line"></div>
            <div>Register new account</div>
            <div>Forgot username/password?</div>
            </div>
        )
    }
}

export default SignIn