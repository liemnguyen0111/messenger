import React , { Component } from 'react'
import Button from './Button'
import UserAPI from '../utils/UserAPI'

const { registerUser } = UserAPI

class Models extends Component{

    constructor( props ) {
        super( props );

        this.state = {
            current : 'signIn',
            password : true
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.handleSignIn = this.handleSignIn.bind(this)
    }
    
    onClick(e)
    {
        if(e === "Register new account !"){
            this.props.setState({current : 'signUp'})
            this.setState({current : 'signUp'})
        }

        if(e === "Sign In"){
            this.props.setState({current : 'signIn'})
            this.setState({current : 'signIn'})
        }

        if(e === "Forgot username/password?"){
            this.props.setState({current : 'forgot'})
            this.setState({current : 'forgot'})
        }
        this.handleResetField()
    }

    onSubmit()
    {
        console.log(this.state.current)
       if(this.state.current === 'signIn'){ this.handleSignIn() }
       if(this.state.current === 'signUp'){ this.handleSignUp() }
       if(this.state.current === 'forgot'){ this.handleReset() }
    }

   
    shouldComponentUpdate(nextProps, nextState)
    {
        return this.state !== nextState
    }

    // Add animation to each new input after an update
   componentDidUpdate()
    {
        const input = document.querySelectorAll('.main-input')
        let total = 0
        input.forEach((val, index) =>
        {
            val.style.opacity = 0
            val.style.animation = `fade-in .1s ease forwards ${index / 10 }s`
            total += val.clientHeight
        })
        this.form.style.height = `${total}px`
    }

    // Handle sign in user
   async handleSignIn(){
   console.log('sign in')

        if(this.handleFieldsCheck()){
     let [ username , password ] = [this.form.username.value, this.form.password.value]
        this.form.reset()

        // use to get user location login record
        const publicIp = require("react-public-ip");
        const ipv6 = await publicIp.v6() || "";

        this.props.login({
            username : username,
            password : password,
            ipv6 :  ipv6
        }).then(({data}) =>   {
            if(data)
            {
                this.errorMessage.style.display = 'none'
                document.querySelector('.models').classList.remove('authorized')
                setTimeout(() => {
                localStorage.setItem('user', data)
                this.props.isAuthorized({ isAuthorized : true }) 
                }, 1000);            
            }else {
                this.errorMessage.innerHTML = 'Invalid username/password, please try again !'
                this.errorMessage.style.display = 'block'
            }
         
        })
        .catch(err => {console.error(err)})
        }else {
            this.errorMessage.innerHTML = 'Please fill in all the following red field(s)'
            this.errorMessage.style.display = 'block'
        }
    }

    handleSignUp()
    {
       
    if(this.handleEmailCheck(this.form.email.value))
    {
        if(this.handleFieldsCheck()){


       let [ 
        firstName , 
        lastName,
        email,
        username,
        password
    ] = [
        this.form.firstName.value, 
        this.form.lastName.value,
        this.form.email.value, 
        this.form.username.value, 
        this.form.password.value
    ]

         if(this.form.password.value !== this.form.confirm.value)
    {
        this.errorMessage.innerHTML = 'Password not matched, please try again !'
        this.errorMessage.style.display = 'block'
    } else {
        this.handleResetField()
        this.successMessage.innerHTML = 'Please check your email for verification.'
        this.successMessage.style.display = 'block'
        let button = document.querySelector(`.${this.props.current["button"]}`)
        button.innerHTML = 'Congratulation !'
        button.classList.add('disabled')
        console.log(button)
        this.form.style.display = 'none'
        registerUser({
            data : {
                firstName : firstName,
                lastName : lastName,
                email : email,
                username : username
            },
            password: password
        })
        .then((data) => console.log(data))
        .catch(err => console.error(err))
    }

    } else {
        this.errorMessage.innerHTML = 'Please fill in all the following red field(s)'
        this.errorMessage.style.display = 'block'
    }
    } else {
        this.errorMessage.innerHTML = 'Invalid email format'
        this.errorMessage.style.display = 'block'
    }

    
    }

    // Reset account password
    handleReset()
    {
        this.handleFieldsCheck()
    }

    // Check if the required fields are empty
    handleFieldsCheck(){
        let required = document.querySelectorAll('.required')
        let filled = true
        required.forEach( item => {
         if(!item.value) {
             item.classList.add('required-input')
             filled = false
            }
        })
        return filled
    }

    // Check if email is in the correct format
    handleEmailCheck(email){
     return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    }

    // Reset all fields
    handleResetField(){
        this.errorMessage.style.display = 'none'
        this.successMessage.style.display = 'none'
        this.form.style.display = 'block'
        this.form.reset()
        let required = document.querySelectorAll('.required')
        required.forEach( item => {
         if(!item.value) {
             item.classList.remove('required-input')
            }
        })
    }

    // Initalize with added class after component mount
    componentDidMount(){ 
            document.querySelector('.models').classList.add('authorized')
    }

    render(){
        return(
            
            <div 
            ref={(r) => { this.formContainer = r;}}
            className="form-container">
                <p ref={(r) => { this.errorMessage = r;}}className="error-message"/>
                <p ref={(r) => { this.successMessage = r;}}className="succes-message"/>
                
            <form className="form" ref={(r) => { this.form = r;}}>

            {
                this.props.current["input"].map( (val, index) =>
                    <div className="main-input" key={index}>
                    <i className={`${val["icon"]}`}></i>
                    <input 
                    className={`${val["required"]}`}
                    type={val["type"]} 
                    name={val["name"]} 
                    placeholder={val["placeholder"]}/>
                    </div>
                    )
            }
           </form>
            <Button 
            className = 'models-button'
            name={ this.props.current["button"] }
            style='blue'
            width = {250}
            height = {30}
            onClick={this.onSubmit}
            />
            <div className="or">or</div>
            <div className="link" 
            onClick={()=>this.onClick(this.props.current["link1"])}>{this.props.current["link1"]}</div>
            <div  className="link"  
            onClick={()=>this.onClick(this.props.current["link2"])}>{ this.props.current["link2"]}</div>
            </div>
        )
    }
}

export default Models