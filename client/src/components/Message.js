import React , { Component } from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import socketIO from '../utils/SocketIO'
import MessageAPI from '../utils/MessageAPI'
import Images from './Images'

const { getMessage } = MessageAPI
const { updateMessage, updateLatestMessage } = socketIO

class Message extends Component
{
    constructor( props ) {
        super( props );

        this.state = {
            messages : [],
            isMounted : true,
            page : 0,
            current : 0
        }

        this.lastMessage = React.createRef();
        this.container = React.createRef();
        this.onScroll = this.onScroll.bind(this)
    }

    // Shallow compare, only update when receive new props
    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps,nextState)
    }

    componentDidUpdate()
    {
    
        const scrollTop = this.container.scrollTop
        const current = this.container.scrollHeight - this.container.offsetHeight

        // Keep scroll top at current position when feeding more messages
        if(this.state.page > 0 && this.container.scrollTop < 1){
            this.container.classList.remove('smooth-scroll')
            this.container.classList.add('unset-scroll')
            this.container.scrollTop =  this.container.scrollHeight - this.state.current
            this.container.classList.remove('unset-scroll')
            this.container.classList.add('smooth-scroll')
        }

        // Keep a record of previous scroll top position
        this.setState({current : this.container.scrollHeight })
    
        // Get midle position of current client height
        let mid = current / 2

        // If scroll top is more than 50% of the client height, scroll to bottom
        if(scrollTop > mid )
        {
            this.lastMessage.scrollIntoView();
        }  
       
    }

    componentDidMount(){
        getMessage(this.props.id, 'page=0')
        .then(( {data : {messages :messages}, data: {maxCount : maxCount}}) => {

            updateMessage(this.props.id,200)
            this.setState({ messages : messages, maxPage : maxCount})
            this.lastMessage.scrollIntoView()
            this.container.classList.add('smooth-scroll')
        })
        .catch(err => console.error(err))

        updateLatestMessage(({status, id}) => {
            
            if(this.state.isMounted && status === 202 && this.props.id === id)
            this.getLastMessage(id)
        })
    }

    updateMessages(id){
        console.log(id, this.props.id)
        getMessage(id, `page=${this.state.page}&latest=false`)
        .then(({data : {messages :messages}, data: {maxCount : maxCount}}) => {
        this.setState({ messages : messages, maxPage : maxCount})
        })
        .catch(err => console.error(err))
    }

    getLastMessage(id){
        console.log(id, this.props.id)
        getMessage(id, `page=${this.state.page}&latest=true`)
        .then(({data : {messages :messages}, data: {maxCount : maxCount}}) => {
        if(this.state.isMounted){
            updateMessage(id,200)
        }
       
        this.setState({ messages : [...this.state.messages, ...messages ], maxPage : maxCount})
        if(messages[0].isYours) this.lastMessage.scrollIntoView();
        })
        .catch(err => console.error(err))
    }

    onScroll(e){
  
       if(this.container.scrollTop < 1){
           if(this.state.page < this.state.maxPage)
           {
                 this.setState({page : this.state.page  + 1 })
                 this.updateMessages(this.props.id)
           }
      
       }

    }

    componentWillUnmount(){
        // this.setState({ isMounted : false, page : 0})
       this.state.isMounted = false
       this.state.page = 0
    //    console.log('unmount')
    }

    render(){
        return(<>
            <div className='messages' 
              onScroll={this.onScroll}
              ref={(c) => { this.container = c}}>
          
            {
                this.state.messages.map((message, index) =>   
                        <div 
                        style = {{ opacity : 1}}
                        className={message.isYours? 'y-message' : 'f-message'}
                        key={index}
                        >
                 
                        {!message.isYours? 
                              <Images 
                              width={40} 
                              height={40} 
                              images={message.image}
                              />: ''    
                        }
                        <div className="message" title={message.time}>

                            {message.message.split(/\n/g).map((val, index) =>
                                
                                    <span key={index}>
                                    {val}
                                    { index < message.message.split(/\n/g).length - 1?  <br></br> : ''}
                                    </span>
                                )}

                            </div>
                        </div> 

                    ) 
               
            }
            <div  ref={(last) => { this.lastMessage = last;}}></div>
            </div>
        </>)
    }
}

export default Message