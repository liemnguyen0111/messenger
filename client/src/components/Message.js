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
            isMounted : true
        }

        this.lastMessage = React.createRef();
        this.container = React.createRef();
    }

    // componentDidUpdate(prevProps, prevState)
    // {
       
    //     if(prevState.messages !== this.props.messages)
    //     {
    //         console.log('update')
    //         this.setState({messages : this.props.messages})
    //         console.log(this.state.messages)
    //         // if(this.props.messages[this.props.messages.length - 1].isYours)
    //         // {
    //         //    this.lastMessage.scrollIntoView();
    //         // }

    //         // const scrollTop = this.container.scrollTop
    //         // const current = this.container.scrollHeight - this.container.offsetHeight
    //         // // console.log(scrollTop, current)
    //         // if(current - scrollTop < 200)
    //         // {
    //         //     this.lastMessage.scrollIntoView();
    //         // }

    //     }
    // }

    // componentWillMount()
    // {
    //     console.log('will mount')
    //     this.setState({messages : this.props.messages})
    // }

    // componentWillReceiveProps()
    // {
    //     console.log('receive props')
    //     this.setState({messages : this.props.messages})

    // }

    // Shallow compare, only update when receive new props
    shouldComponentUpdate(nextProps, nextState){
        return shallowCompare(this, nextProps,nextState)
    }

    componentDidUpdate()
    {
     
           if(this.state.messages[this.state.messages.length - 1].isYours)
            {
               this.lastMessage.scrollIntoView();
            }

            const scrollTop = this.container.scrollTop
            const current = this.container.scrollHeight - this.container.offsetHeight
            
            if((current / scrollTop) < 1.5)
            {
                this.lastMessage.scrollIntoView();
            }
            
            if(!this.state.scrolled){
               this.lastMessage.scrollIntoView();
               this.setState({scolled : true})
            }

    }

    componentDidMount(){
        getMessage(this.props.id)
        .then(({data}) => {
            this.setState({ messages : data})
            this.props.socket.emit('request', {id: this.props.id,type:'load'})
        })
        .catch(err => console.error(err))
        this.props.socket.on('message', () => {
            if(this.state.isMounted)
            this.updateMessages(this.props.id)
        })
    }

    updateMessages(id){
   
        getMessage(id)
        .then(({data}) => {
            this.setState({ messages : data})
            this.props.socket.emit('request', {id: this.props.id,type:'load'})
        })
        .catch(err => console.error(err))
    }

    onScroll(e){
       
        e.target.classList.remove('hide-scroll-bar')
       clearTimeout(timer)
       timer = setTimeout(() => {
        e.target.classList.add('hide-scroll-bar')
       }, 1000);
    }

    componentWillUnmount(){
       this.state.isMounted = false
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