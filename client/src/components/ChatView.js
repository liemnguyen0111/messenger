import React ,  { Component } from "react"
import MessageAPI from '../utils/MessageAPI'
import SocketIO from '../utils/SocketIO'
import Message from './Message'
import Input from './Input'
import Search from './Search'
import Images from './Images'

const {  createMessage } = MessageAPI
const { updateMessage } = SocketIO

class ChatView extends Component
{

    constructor( props ) {
        super( props );
        
        this.state = {
            profile : 40,
            group : 60,
            chatViewId : '',
            search : false,
            messages : []
        }
        
        this.onSubmit = this.onSubmit.bind(this);
    }


    onSubmit(message)
    {
        this.setState({ test : this.state.test + 1})
        createMessage(this.props.id, {message: message})
        .then(() => {
            updateMessage(this.props.id,202)
    
        })
        .catch( err => console.error(err))
    }


    render()
    {
        return (
            <>
            <section className="row-2 smooth">
            <Images 
            width={this.state.group} 
            height={this.state.group}
            images={['']}/>
            <div className="r-g-name">{this.props.chatName}</div>
            <i className="fas fa-phone-alt call unavailable"></i>
            <i className="fas fa-video video unavailable"></i>
            <i className="fas fa-search m-search unavailable"
            onClick={() => this.setState({search: !this.state.search})}
            ></i>
            </section>
            {this.state.search ? 
             <Search placeholder={'Search for message'}onSearch={()=>{}}/>
            :""}

            <Message id={this.props.id}/>
            <Input onSubmit={this.onSubmit}/>
            </>
        )
    }
 
}

export default ChatView