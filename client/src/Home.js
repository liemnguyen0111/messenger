import React ,  { Component } from "react"
import UserAPI from './utils/UserAPI'
import ChatBox from './components/ChatBox'
import Main from './components/Main'


const { isAuthorized, loginUser} = UserAPI

class Home extends Component
{

    constructor( props ) {
        super( props );
        
        this.state = {
            isAuthorized : false
        }
        
        this.loginUser = loginUser
        this.setState = this.setState.bind(this)
    }

    componentDidMount()
    {
    
       isAuthorized()
       .then(() =>
        {
            this.setState({ isAuthorized : true })
        })
        .catch(err => {
            this.setState({ isAuthorized : false })
        });
    }
  
    render()
    {
        return (
            <>
            {
                this.state.isAuthorized ? 
                <ChatBox
                setState= {this.setState}
                isAuthorized = {this.state.isAuthorized}
                /> : 
                <Main
                login={this.loginUser}
                setState= {this.setState}
                />
            }
            </>
        )
    }
 
}

export default Home