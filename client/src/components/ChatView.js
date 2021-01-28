import React ,  { Component } from "react"
import MessageAPI from '../utils/MessageAPI'
import Button from './Button'
import Message from './Message'
import Input from './Input'
import Search from './Search'
import Images from './Images'

const { getMessage, createMessage } = MessageAPI

class ChatView extends Component
{

    constructor( props ) {
        super( props );
        
        this.state = {
            profile : 40,
            group : 60,
            chatViewId : '',
            search : false,
            test: 0
        }
        
        this.onSubmit = this.onSubmit.bind(this);
    }


    onSubmit(message)
    {

        // this.setState( { messages : [...this.state.messages, 
        //     {
            
        //         isYours : true, 
        //         message : e,
        //         image: ['https://media-exp1.licdn.com/dms/image/C5635AQHUdpBWD4hx9A/profile-framedphoto-shrink_200_200/0/1596193249735?e=1611370800&v=beta&t=mpp847MX2q6W77EUPj7zMWXYkzvgHRPxMILqTZS2530'],
        //         time : '12:12 PM' }
        // ] })
        // console.log(this.props.id)
        this.setState({ test : this.state.test + 1})
        createMessage(this.props.id, {message: message})
        .then(data => console.log(data))
        .catch( err => console.error(err))
    }



    componentWillMount(){
      this.updateMessages(this.props.id)
    }

    updateMessages(id){
        // console.log(id)
        getMessage(id)
        .then((data) => {
            console.log(data)
        })
        .catch(err => console.error(err))
    }

    render()
    {
        return (
            <>
            <section className="row-2">
            <Images 
            width={this.state.group} 
            height={this.state.group}
            images={['']}/>
            <div className="r-g-name">{this.props.chatName}</div>
            <i className="fas fa-phone-alt call"></i>
            <i className="fas fa-video video"></i>
            <i className="fas fa-search m-search"
            onClick={() => this.setState({search: !this.state.search})}
            ></i>
            </section>
            {this.state.search ? 
             <Search/>
            :""}
            
            <Message messages={this.state.test}/>
            <Input onSubmit={this.onSubmit}/>
            </>
        )
    }
 
}

export default ChatView