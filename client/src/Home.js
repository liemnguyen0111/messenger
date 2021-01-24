import React ,  { Component } from "react"
import io from 'socket.io-client'
import UserAPI from './utils/UserAPI'
import ChatBox from './components/ChatBox'
import Main from './components/Main'


let socket;
const ENDPOINT = 'localhost:5000'
socket = io(ENDPOINT)

const { isAuthorized, loginUser, 
    // registerUser, getUserInfo 
} = UserAPI

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
        socket.emit('join', {}, err => console.error(err))

       isAuthorized()
       .then(() =>
        {
            this.setState({ isAuthorized : true })
        })
        .catch(err => {
            this.setState({ isAuthorized : false })
        });
    }

    componentDidUpdate()
    {
        console.log('home')
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