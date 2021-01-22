import React , { Component } from 'react'
import Images from './Images'

class Message extends Component
{
    constructor( props ) {
        super( props );
        
        this.state = {
            messages : []
        }

        this.lastMessage = React.createRef();
        this.container = React.createRef();
    }

    componentDidUpdate(prevProps, prevState)
    {
        if(prevState.messages !== this.props.messages)
        {

            this.setState({messages : this.props.messages})
            // console.log(this.state.messages)
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
    }

    componentDidMount()
    {
        // console.log('did mount')
        this.setState({messages : this.props.messages})
    }

    // shouldComponentUpdate()
    // {last
    //   this.state.messages = this.props.messages
    // }

    render(){
        return(<>
            <div className='messages' 
            ref={(c) => { this.container = c;}}>
            {/* <div className="m-wrapper"> */}
           {/* { console.log('render', this.state.messages)} */}
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
            {/* <div className="f-message">
            <Images 
            width={40} 
            height={40} 
            images={['https://media-exp1.licdn.com/dms/image/C5635AQHUdpBWD4hx9A/profile-framedphoto-shrink_200_200/0/1596193249735?e=1611370800&v=beta&t=mpp847MX2q6W77EUPj7zMWXYkzvgHRPxMILqTZS2530']}
            />
            <div className="message" title='12:00 AM'>Hello Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, nisi praesentium? Sit atque quis quam eligendi optio fuga voluptatum rerum nobis doloribus dolorem culpa delectus, nesciunt amet eum nam sequi. ipsum dolor</div>
            </div> */}
{/*  
            <div className="y-message">
            <div className="message" title='12:00 AM'>Hello Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime reiciendis, facere molestiae reprehenderit provident architecto dicta omnis repellendus officiis, quidem id porro recusandae consectetur aspernatur odio sunt voluptates similique officia! Tim</div>
            </div> */}


            {/* <i className="fas fa-plus-circle"></i> */}
            </div>
        </>)
    }
}

export default Message