import React , { Component } from 'react'
import Search from './Search'
import User from './User'
import Notification from './Notification'
import UserAPI from '../utils/UserAPI'
import socketIO from '../utils/SocketIO'

const { getUser } = UserAPI
const { onRequest } = socketIO

class FindFriends extends Component{

    
    constructor( props ) {
        super( props );
        
        this.state = {
            user : 60,
            view : "all",
            userList : [],
            all : 0,
            pending : 0,
            request : 0,
            page : 0,
            maxPage : 0,
            disabledScroll : false
        }

        this.onSearch = this.onSearch.bind(this)
        this.onScroll = this.onScroll.bind(this)
        this.updateView = this.updateView.bind(this)
        this.setState = this.setState.bind(this)
        this.reset = this.reset.bind(this)


    }

    componentDidMount(){
        this.updateView(`all`,0)
        onRequest((type) => this.updateOnRequest())
    }
 

    updateView = (view,page) => {
  
        this.setState({view : view})
            getUser('users',`view=${view}&page=${page}&limit=10`)
            .then(({data}) => {
        
                this.setState({disabledScroll : false,
                    userList : [...this.state.userList, ...data[0]], ...data[1],
                    maxPage : Math.ceil(data[1][view] / 10)
                })
     
            })
            .catch(err => console.error(err))
       
    }

    updateOnRequest(){
     
        console.log('receive request')
            getUser('users',
            `view=${this.state.view}&page=0&limit=${10 + (10 * this.state.page)}`)
            .then(({data}) => {
        console.log(data)
                this.setState({
                    userList : [...data[0]], ...data[1],
                })
     
            })
            .catch(err => console.error(err))
    }
    
    onSearch(val){
        getUser('users',`view=${val? 'default' : this.state.view}&value=${val?  val : this.state.view}&page=0&limit=10`)
        .then(({data}) => {
            this.setState({userList : data[0], ...data[1]})
        })
        .catch(err => console.error(err))
    }

    onScroll(e){
   
        const scrollTop = e.target.scrollTop
        const current = e.target.scrollHeight - e.target.offsetHeight
  
        let scrollDown = current - scrollTop
        if(this.state.page < this.state.maxPage){
         
            if(scrollDown < 1 && !this.state.disabledScroll){
                this.setState({ page : this.state.page + 1})
                this.updateView(this.state.view, this.state.page)
            }}
        
    }

    reset(){
        this.setState({userList : [], page : 0, disabledScroll : true})
    }

    render()
    {
        return ( 
        <div className="find-friends smooth">
            <div className="friend-options-list">
                <div className={`all-user   
                ${this.state.view === "all" ? "on-active": ""}`}
                onClick={() => {
                    this.reset
                   ( this.state.view === 'all' ? '' : this.updateView("all",0))
                }}
                >
                All
                </div>
                <div className={`pending-user   
                ${this.state.view === "pending" ? "on-active": ""}`}
                onClick={() => 
                {
                this.reset
                (this.state.view === 'pending' ? '' : this.updateView("pending",0))
                }
                }
                >Pending
                 <Notification count={this.props.pendingCount}/>
                </div>
                <div 
                className={`request-user 
                ${this.state.view === "request" ? "on-active": ""}`}
                onClick={() =>
                {
                this.reset
                (this.state.view === 'request' ? '' : this.updateView("request",0))
                }
                }
                >Request
                 <Notification count={this.props.requestCount}/>
                </div>
            </div>
            <Search
            placeholder={'Search for user'}
            onSearch={this.onSearch}
            ></Search>
            <div 
            className="user-container"
            ref={r => this.container = r}
            onScroll={this.onScroll}
            >

            {
                this.state.userList.map((user, index) =>{
                  return  <User
                    // socket={this.props.socket}
                    key={index}
                    name={[user.data.firstName, user.data.lastName]}
                    image={[user.data.image]}
                    status={user.status}
                    id={user.data._id}
                    style={user.status}
                    />
                })
            }
           
            </div>
        </div> )
    }
}

export default FindFriends