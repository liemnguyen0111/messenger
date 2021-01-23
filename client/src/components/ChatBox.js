import React ,  { Component } from "react"
import Logo from './Logo'
import Images from './Images'
import Search from './Search'
import Friend from './Friend'
import Button from './Button'
import Message from './Message'
import Input from './Input'

class ChatBox extends Component
{

    constructor( props ) {
        super( props );
        
        this.state = {
            test: true,
            profile : 40,
            group : 60,
            image : 'https://media-exp1.licdn.com/dms/image/C5635AQHUdpBWD4hx9A/profile-framedphoto-shrink_200_200/0/1596193249735?e=1611370800&v=beta&t=mpp847MX2q6W77EUPj7zMWXYkzvgHRPxMILqTZS2530',
            currentTag : "1",
            messages: []
        }
        
        this.onClick = this.onClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onClick(e)
    {
        document.querySelector(`[data-tag="${this.state.currentTag}"]`).classList.remove('on-active')
        document.querySelector(`[data-tag="${e.target.dataset.tag}"]`).classList.add('on-active')
        this.setState({currentTag : e.target.dataset.tag})
    }

    onSubmit(e)
    {

        this.setState( { messages : [...this.state.messages, 
            {
            
                isYours : true, 
                message : e,
                image: ['https://media-exp1.licdn.com/dms/image/C5635AQHUdpBWD4hx9A/profile-framedphoto-shrink_200_200/0/1596193249735?e=1611370800&v=beta&t=mpp847MX2q6W77EUPj7zMWXYkzvgHRPxMILqTZS2530'],
                time : '12:12 PM' }
        ] })
    }

    render()
    {
        return (
            <>
            <div className={`chat-box`}>
            <div className={`left `} >
            <Logo/>
            {/* {console.log('render')} */}
            {/* Profile image and compose new message */}
            <div className="row-2">
            <Images 
            width={this.state.profile} 
            height={this.state.profile} 
            images={[this.state.image]}
            />
            <p className="title">Chat-Box</p>
            <i className="default-size fas fa-edit compose-message"/>
            </div>
         
            {/* Search bar */}
            <Search/>

            {/* Friends list */}
            <div className="row-3">

            {[...new Array(30)]
            .map(
              (tag, i) => 
              <Friend 
              key={i}
              images={[this.state.image]}
              width={this.state.group} 
              height={this.state.group}
              tag={++i}
              onClick={this.onClick}
              />
                
            )} 
            </div>

                {/* ------- End of left --------- */}
            </div>




            <div className={`right`}>
            <section className="row-1">
            <Button 
            name='Sign Out'
            type='sign-out'
            width = {90}
            height = {30}
            />
            </section>
        
            {/* <Logo/> */}
            <section className="row-2">
            <Images 
            width={this.state.group} 
            height={this.state.group}
            images={[this.state.image,this.state.image]}/>
            <div className="r-g-name">Nhung con be nhat nheo</div>

            <i className="fas fa-phone-alt call"></i>
            <i className="fas fa-video video"></i>
            <i className="fas fa-search m-search"></i>
            </section>
            {/* <Search></Search>  */}
            <Message messages={this.state.messages}/>
            <Input onSubmit={this.onSubmit}/>
            </div>
            </div>
            </>
        )
    }
 
}

export default ChatBox