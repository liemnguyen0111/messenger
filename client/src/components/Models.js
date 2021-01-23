import React , { Component } from 'react'
import Button from './Button'

class SignUp extends Component{

    constructor( props ) {
        super( props );

        this.state = {
            u : '',
            p : ''
        }

        this.onSubmit = this.onSubmit.bind(this)
    }
    
    onClick(e)
    {
        if(e === "Sign Up"){
            this.props.setState({current : 'signUp'})
        }

        if(e === "Sign In"){
            this.props.setState({current : 'signIn'})
        }

        if(e === "Forgot username/password?"){
            this.props.setState({current : 'forgot'})
        }

        console.log(this.f.reset())
    }

    onSubmit()
    {
        this.setState({  u : this.f.username.value, p : this.f.password.value})
        this.f.reset()
        this.props.login({
            username : this.state.u,
            password : this.state.p
        }).then((data) =>   {
            console.log(data)
            // localStorage.setItem('user', data)
        })
        .catch(err => {console.error(err)})
    }

    render(){
        return(
            
            <div className="form">
            <form className="t" ref={(r) => { this.f = r;}}>

          
            {
                this.props.current["input"].map( (val, index) =>
                    <div className="main-input" key={index}>
                    <i className={val["icon"]}></i>
                    <input type={val["type"]} name={val["name"]} placeholder={val["placeholder"]}/>
                    </div>
                    )
            }
           </form>
            <Button 
            name={ this.props.current["button"] }
            type='sign-in'
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

export default SignUp