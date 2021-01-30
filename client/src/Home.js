import React ,  { Component } from "react"
import UserAPI from './utils/UserAPI'
import ChatBox from './components/ChatBox'
import Main from './components/Main'


const { getUser } = UserAPI

class Home extends Component
{

    constructor( props ) {
        super( props );
        
        this.state = {
            isAuthorized : false
        }
        
        this.setState = this.setState.bind(this)
    }

    componentDidMount()
    {
    
       getUser('authenticate')
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
                setState= {this.setState}
                />
            }
            </>
        )
    }
 
}

export default Home