import React ,  { Component } from "react"
import Models from './Models'

const list = {
    signIn :{ 
        input : [{
        icon : 'fas fa-user',
        name : 'username',
        placeholder : 'Username',
        type : 'text'
    },
    {
        icon : 'fas fa-key',
        name : 'password',
        placeholder : 'Password',
        type : 'password'
    }],
    button : 'Sign In',
    link1 : 'Sign Up',
    link2: 'Forgot username/password?'
},
    signUp :
    {
        input : [{
        icon : 'far fa-smile-beam',
        name : 'firstName',
        placeholder : 'First Name*',
        type : 'text'
    },
    {
        icon : 'far fa-smile-wink',
        name : 'lastName',
        placeholder : 'Last Name*',
        type : 'text'
    },
    {
        icon : 'fas fa-envelope',
        name : 'email',
        placeholder : 'Email* (cb@domain.com)',
        type : 'email'
    },
    {
        icon : 'fas fa-user',
        name : 'username',
        placeholder : 'Username*',
        type : 'text'
    },
    {
        icon : 'fas fa-key',
        name : 'password',
        placeholder : 'Password*',
        type : 'password'
    },
    {
        icon : 'fas fa-key',
        name : 'password',
        placeholder : 'Confirm Password*',
        type : 'password'
    }],
        button : 'Register',
        link1 : 'Sign In',
        link2: 'Forgot username/password?'

},
    forgot: {
        input :
        [{
        icon : 'fas fa-envelope',
        name : 'email',
        placeholder : 'Email*',
        type : 'email'
        }],
        button : 'Reset',
        link1 : 'Sign In',
        link2: 'Register new account!'
    }
}
class Main extends Component
{

    constructor( props ) {
        super( props );
        
        this.state = {
           current : 'signIn'
        }
        
        this.setState = this.setState.bind(this)
    }


    render()
    {
        return (
            <>
            <div className="models">
            <div className="welcome">
            <i className="fas fa-comments"/>
            Welcome to <span>ChatBox</span></div>
            {/* <SignIn/> */}
            <Models login={this.props.login} current = {list[this.state.current]} setState={this.setState}/>
            </div>
            </>
        )
    }
 
}

export default Main