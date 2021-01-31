import React , { Component } from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import MessageAPI from '../utils/MessageAPI'
import Images from './Images'

const { getMessage } = MessageAPI
let timer 

class Message extends Component
{
    constructor( props ) {
        super( props );

        this.state = {
            messages : [],
            scrolled : false,
            isMounted : true,
            page : 0
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

       
           if(scrollTop < 500){
            this.container.scrollTop = 30
           }
           else
           {
            if(this.state.messages[this.state.messages.length - 1].isYours)
            {
                if(scrollTop > 200)
                {
                    this.lastMessage.scrollIntoView();
                }
              
            }

            
            if(scrollTop > 200)
            {
                this.lastMessage.scrollIntoView();
            }
            
            if(!this.state.scrolled){
               this.lastMessage.scrollIntoView();
               this.setState({scolled : true})
            }
            // this.lastMessage.scrollIntoView();
            // console.log('scroll')
           }

         

    }

    componentDidMount(){
        getMessage(this.props.id, 'page=0')
        .then(( {data : {messages :messages}, data: {maxCount : maxCount}}) => {

            this.setState({ messages : messages, maxPage : maxCount})
           
            this.container.scrollTop = this.container.scrollHeight - this.container.offsetHeight
            this.container.style.behavior = "smooth"
            // this.props.socket.emit('request', {id: this.props.id,type:'load'})
        })
        .catch(err => console.error(err))
        // this.props.socket.on('load', () => {
        //     if(this.state.isMounted)
        //     this.updateMessages(this.props.id)
        // })
    }

    updateMessages(id){
   
        getMessage(id, `page=${this.state.page}`)
        .then(({data : {messages :messages}, data: {maxCount : maxCount}}) => {
       
            this.setState({ messages : messages, maxPage : maxCount})
          
            // this.props.socket.emit('request', {id: this.props.id ,type:'load'})
        })
        .catch(err => console.error(err))
    }

    onScroll(e){
   
       if(e.target.scrollTop < .001){
           if(this.state.page < this.state.maxPage)
           {
            this.setState({page : ++this.state.page})
            this.updateMessages(this.props.id)
           }
      
       }
        e.target.classList.remove('hide-scroll-bar')
       clearTimeout(timer)
       timer = setTimeout(() => {
        e.target.classList.add('hide-scroll-bar')
       }, 1000);
    }

    componentWillUnmount(){
       this.state.isMounted = false
       this.state.page = 0
    }

    render(){
        return(<>
            <div className='messages hide-scroll-bar' 
              onScroll={this.onScroll}
              ref={(c) => { this.container = c;}}>
          
            {
                this.state.messages.map((message, index) =>   
                        <div 
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