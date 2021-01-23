import React ,  { Component } from "react"
import io from 'socket.io-client'
import UserAPI from './utils/UserAPI'
import ChatBox from './components/ChatBox'
import Main from './components/Main'


let socket;
const ENDPOINT = 'localhost:5000'
socket = io(ENDPOINT)

const { isAuthorized, loginUser, registerUser, getUserInfo } = UserAPI

class Home extends Component
{

    constructor( props ) {
        super( props );
        
        this.state = {
            isAuthorized : false
        }
        
        this.loginUser = loginUser
    }

    componentDidMount()
    {
        socket.emit('join', {}, err => console.error(err))

        // this.loginUser({
        //     username : 'ab',
        //     password : '123'
        // }).then(({data}) =>
        //     {
        //         localStorage.setItem('user', data)
        //     }) 
        //     .catch(err => console.error(err));

       isAuthorized()
       .then(() =>
        {
            this.setState({ isAuthorized : false })
        })
        .catch(err => console.error(err));
    }

  
    render()
    {
        return (
            <>
            {
                this.state.isAuthorized ? <ChatBox/> : 
                <Main
                login={this.loginUser}
                />
            }
            </>
        )
    }
 
}

export default Home