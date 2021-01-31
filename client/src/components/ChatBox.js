import React ,  { Component } from "react"
import SocketIO from '../utils/SocketIO'
import UserAPI from '../utils/UserAPI'
import UserInfo from './UserInfo'
import Notification from './Notification'
import FindFriends from './FindFriends'
import ChatView from './ChatView'
import Logo from './Logo'
import Images from './Images'
import Search from './Search'
import Friend from './Friend'

const { getUser } = UserAPI
const { connect, reconnect , disconnect, onReconnect, onUserConnect, updateLatestMessage, onRequest } = SocketIO

class ChatBox extends Component
{

    constructor( props ) {
        super( props );
        
        this.state = {
            profile : 40,
            group : 60,
            currentActive : '',
            messages: [],
            status : 'userInfo',
            chatViewId: '',
            chatName : '',
            onActive : false,
            info : {
                group : []
            },
            entry : 0
        }
        
        this.chatView = this.chatView.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
        this.signOut = this.signOut.bind(this);
        this.load = this.load.bind(this)
        
    }

    componentDidUpdate(){
        if(this.state.status !== 'chatView' && this.state.currentActive){
            document.querySelector(`[data-tag="${this.state.currentActive}"]`).classList.remove('on-active')
            this.setState({currentActive : ''})
        }
    }
    chatView(user, id, name)
    {

        // if(this.state.currentActive !== id){
        //     console.log(this.state.currentActive , id)
        //     console.log('update')
         
        // }

        if(this.state.currentActive)
        {
            document.querySelector(`[data-tag="${this.state.currentActive}"]`).classList.remove('on-active')
            user.target.classList.add('on-active')
            this.setState({currentActive : id})
            // updateMessage(id,200)
        }
        else{
            user.target.classList.add('on-active')
            this.setState({currentActive : id})
          
        }
        // updateMessage(id,200)
        this.setState({ status : 'chatView', chatViewId : id, chatName : name, onActive : true}) 
      
    }

    signOut(){
        document.querySelector('.chat-box').classList.remove('authorized')
        console.log('disconnecty')
        disconnect()
        setTimeout(() => {
        this.props.setState({isAuthorized: false})
        localStorage.removeItem('user')
        }, 1000);

    }

    componentDidMount(){
       this.init()
        document.querySelector('.chat-box').classList.add('authorized')
        // Listen to onload and refetching data
        // socket.on('load', () => {
        //     this.load()
        // })

        // Listen on rejoin and emit to join again
        // socket.on('re-join', () => 
        // {
        //     socket.emit('join', ({id : this.state.info.id}))
        // })

        // Listen to new update and reload friendlist with latest message
        // socket.on('update', msg => { if( msg === 'user') this.load()})
    }

    init(){
        getUser('init')
        .then(({data}) => {
            this.setState({ info : data })

            let entry = 0
            let res = data.id
            reconnect()
            connect([res , entry ])
            onReconnect((val)=> {
                
                if(entry < 10 && val !== 'succeed')
                {
                        console.log('conencting')
                        connect([res , entry ])
                        entry += 1
                }

                if(val === 'succeed')
                {
                    console.log('succeed')
                    entry = 0
                }

            })
        })
        .catch(err => console.error(err))

        // On user connect/disconnect, update view with current active status
        onUserConnect(()=> this.load())
        onRequest((type) => { this.load()})
        updateLatestMessage((status) => {
            console.log('status ' , status)
            if(status === 200) this.load()
        })

    }

    load(){
 
            getUser('init')
            .then(({data}) => {
                this.setState({ info : data })
            })
            .catch(err => console.error(err))
    }


    
    render()
    {
        return (
            <>
            <div className={`chat-box`}>
            <div className={`left `} >
            <Logo/>
            {/* Profile image and compose new message */}
            <div className="row-2">
            <Images 
            width={this.state.profile} 
            height={this.state.profile} 
            images={[this.state.info.image]}
            onClick={() => 
            this.setState({
            status : 'userInfo', 
            onActive : false
            })}
            />
            <p className="title">Chat-Box</p>
            <i className="default-size fas fa-edit compose-message"/>
            </div>
         
            {/* Search bar */}
            <Search   placeholder={'Search for message'} onSearch={()=>{}}/>

            {/* Add friend icon */}
            <div className="options" >
            <i className="fas fa-user-plus add-friend"
            onClick={() => this.setState({status : 'addFriend'})}
            ><Notification count={this.state.info.requestCount}/></i>
            <p> Add friend </p>
            </div>
            
            {/* Friends list */}
            <div className="row-3">

            {
            this.state.info["group"].map( (val, index ) =>
            {
               
                      return <Friend 
                      key={index}
                      details={val}
                      width={this.state.group} 
                      height={this.state.group}
                      tag={val.id}
                      onClick={this.chatView}
                      currentActive={this.state.currentActive}
                      /> 
            })  
            } 

            </div>

                {/* ------- End of left --------- */}
            </div>




            <div className={`right`}>
            { this.state.status === 'userInfo'? 
            <UserInfo
            //  socket={socket}
             info = {this.state.info}
             signOut = {this.signOut}
            /> 
            : ""}

            { this.state.status === 'addFriend'? 
            <FindFriends 
            // socket={socket}
            pendingCount={this.state.info.pendingCount}
            requestCount={this.state.info.requestCount}
            />
            : ""}
    
            { this.state.status === 'chatView'? 
            <ChatView 
            // socket={socket}
            id={this.state.chatViewId}
            uuID={this.state.info.id}
            chatName ={this.state.chatName}
            view={this.state.status}
            onActive={this.state.onActive}
            />
            : ""}

            </div>
            </div>
            </>
        )
    }
 
}

export default ChatBox