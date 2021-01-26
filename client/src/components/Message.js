import React , { Component } from 'react'
import Images from './Images'

class Message extends Component
{
    constructor( props ) {
        super( props );

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

    componentDidUpdate()
    {
         if(this.props.messages[this.props.messages.length - 1].isYours)
            {
               this.lastMessage.scrollIntoView();
            }

            const scrollTop = this.container.scrollTop
            const current = this.container.scrollHeight - this.container.offsetHeight
            // console.log(scrollTop, current)
            if(current - scrollTop < 200)
            {
                this.lastMessage.scrollIntoView();
            }
    }

    render(){
        return(<>
        {console.log('render')}
            <div className='messages' 
            ref={(c) => { this.container = c;}}>
            {
               
                this.props.messages.map((message, index) =>
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