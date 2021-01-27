import React ,  { Component } from "react"
import UserAPI from '../utils/UserAPI'
import UserInfo from './UserInfo'
import FindFriends from './FindFriends'
import Logo from './Logo'
import Images from './Images'
import Search from './Search'
import Friend from './Friend'
import Button from './Button'
import Message from './Message'
import Input from './Input'

const { userInit } = UserAPI

class ChatBox extends Component
{

    constructor( props ) {
        super( props );
        
        this.state = {
            profile : 40,
            group : 60,
            currentTag : "1",
            messages: [],
            status : 'chat',
            info : {
                group : []
            }
        }
        
        this.onClick = this.onClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.signOut = this.signOut.bind(this);
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

    signOut(){
        document.querySelector('.chat-box').classList.remove('authorized')
        setTimeout(() => {
        this.props.setState({isAuthorized: false})
        localStorage.removeItem('user')
        }, 1000);

    }

    componentDidMount(){

            document.querySelector('.chat-box').classList.add('authorized')
    }

    componentWillMount(){
  
        userInit()
        .then(  ({data}) => {
            // console.log('render info')
            this.setState({ info : data })
            // console.log(this.state)
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
            {/* {console.log('render')} */}
            {/* Profile image and compose new message */}
            <div className="row-2">
            {console.log('render image')}
            <Images 
            width={this.state.profile} 
            height={this.state.profile} 
            images={[this.state.info.image]}
            />
            <p className="title">Chat-Box</p>
            <i className="default-size fas fa-edit compose-message"/>
            </div>
         
            {/* Search bar */}
            <Search   placeholder={'Search for message'}/>

            {/* Add friend icon */}
            <div className="options">
            <i className="fas fa-user-plus add-friend"></i>
            <p>Add friend</p>
            </div>
            
            {/* Friends list */}
            <div className="row-3">

            {this.state.info["group"].map( (val, index ) =>{
                      <Friend 
                      key={index}
                      val={val}
                      images={[this.state.image]}
                      width={this.state.group} 
                      height={this.state.group}
                      tag={++index}
                      onClick={this.onClick}/>
            }) 
        }

            {/* {[...new Array(30)]
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
                
            )}  */}
            </div>

                {/* ------- End of left --------- */}
            </div>




            <div className={`right`}>
            {/* <UserInfo
             info = {this.state.info}
             signOut = {this.signOut}
            /> */}

            <FindFriends></FindFriends>
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