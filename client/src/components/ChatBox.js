import React ,  { Component } from "react"
import io from 'socket.io-client'
import UserAPI from '../utils/UserAPI'
import UserInfo from './UserInfo'
import Notification from './Notification'
import FindFriends from './FindFriends'
import ChatView from './ChatView'
import Logo from './Logo'
import Images from './Images'
import Search from './Search'
import Friend from './Friend'

let socket;
const ENDPOINT = 'localhost:5000'
socket = io(ENDPOINT)

const { getUser } = UserAPI

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
            }
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
        console.log(user.target)
        if(this.state.currentActive)
        {
            document.querySelector(`[data-tag="${this.state.currentActive}"]`).classList.remove('on-active')
            user.target.classList.add('on-active')
            this.setState({currentActive : id})
        }
        else{
            user.target.classList.add('on-active')
            this.setState({currentActive : id})
        }
        this.setState({ status : 'chatView', chatViewId : id, chatName : name, onActive : true}) 
    }

    signOut(){
        document.querySelector('.chat-box').classList.remove('authorized')
        socket.disconnect()
        setTimeout(() => {
        this.props.setState({isAuthorized: false})
        localStorage.removeItem('user')
        }, 1000);

    }

    componentDidMount(){
       this.init()
        document.querySelector('.chat-box').classList.add('authorized')
        
        socket.on('load', () => {
            this.load()
        })

        socket.on('update', msg => {
            switch (msg) {
                case 'userConnect':
                    this.load()
                    break;
                case 'userDisconnect':
                    this.load()
                    break;
                case 'request':
                    this.load()
                    break;
                case 'accept':
                    this.load()
                    break;
                case 'unfriend':
                    this.load()
                    break; 
                case 'reject':
                    this.load()
                    break;     
                case 'userInfo':
                    this.load()
                    break;
                default:
                        // this.load()
                    break;
            }
        })
    }

    init(){
        getUser('init')
        .then(({data}) => {
            this.setState({ info : data })
    
            socket.connect()
            socket.emit('join', {id : data.id}, err => console.error(err))
            socket.on('re-join', () => 
            socket.emit('re-join', (this.state.info.id), () => {console.log('done')} ))
        })
        .catch(err => console.error(err))
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
            onActive : false})}
            socket={socket}
            // notification={true}
            // notiCount={
            //     this.state.info.pendingCount +
            //     this.state.info.requestCount
            // }
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
             socket={socket}
             info = {this.state.info}
             signOut = {this.signOut}
            /> 
            : ""}

            { this.state.status === 'addFriend'? 
            <FindFriends 
            socket={socket}
            pendingCount={this.state.info.pendingCount}
            requestCount={this.state.info.requestCount}
            />
            : ""}

            { this.state.status === 'chatView'? 
            <ChatView 
            socket={socket}
            id={this.state.chatViewId}
            uuID={this.state.info.id}
            chatName ={this.state.chatName}
            load={this.load}
            view={this.state.status}
            onActive={this.state.onActive}
            />
            : ""}
            {/* <FindFriends></FindFriends> */}
            {/* <section className="row-1">
            <Button 
            name='Sign Out'
            type='sign-out'
            width = {90}
            height = {30}
            onClick={this.signOut}
            />
            </section> */}
        
            {/* <Logo/> */}
            {/* <section className="row-2">
            <Images 
            width={this.state.group} 
            height={this.state.group}
            images={[this.state.image,this.state.image]}/>
            <div className="r-g-name">Nhung con be nhat nheo</div>

            <i className="fas fa-phone-alt call"></i>
            <i className="fas fa-video video"></i>
            <i className="fas fa-search m-search"></i>
            </section> */}
            {/* <Search></Search>  */}
            {/* <Message messages={this.state.info.group}/> */}
            {/* <Input onSubmit={this.onSubmit}/> */}

            </div>
            </div>
            </>
        )
    }
 
}

export default ChatBox