import React , { Component } from 'react'
import Search from './Search'
import User from './User'
import Notification from './Notification'
import UserAPI from '../utils/UserAPI'

const { getUsers } = UserAPI

class FindFriends extends Component{

    
    constructor( props ) {
        super( props );
        
        this.state = {
            user : 60,
            view : "all",
            userList : [],
            all : 'on-active',
            pending : '',
            request : ''
        }

        this.onSearch = this.onSearch.bind(this)

    }

    componentDidMount(){
        this.updateView("all")
        this.props.socket.on('update', msg =>{
            console.log(msg)
            switch (msg) {
                case 'request':
                    this.updateView(this.state.view)
                    break;
                case 'accept':
                    this.updateView(this.state.view)
                    break;
                case 'unfriend':
                    this.updateView(this.state.view)
                    break;
                case 'reject':
                    console.log('reject')
                    this.updateView(this.state.view)
                    break;
                default:
                    break;
            }
        })
    }
 

    updateView(view){
        this.setState({all : '', pending : '', request: '', [view] : "on-active"})
        getUsers(view)
        .then(({data}) => {
            this.setState({userList : data[0], ...data[1]})
      
        })
        .catch(err => console.error(err))
    }

    onSearch(val){
        getUsers(val? val : 'all')
        .then(({data}) => {
            this.setState({userList : data[0], ...data[1]})
       
        })
        .catch(err => console.error(err))
    }

    render()
    {
        return ( 
        <div className="find-friends smooth">
            <div className="friend-options-list">
                <div className={`all-user ${this.state.all}`}
                onClick={() => this.updateView('all')}
                >
                All
                </div>
                <div className={`pending-user ${this.state.pending}`}
                onClick={() => this.updateView('pending')}
                >Pending
                 <Notification count={this.props.pendingCount}/>
                </div>
                <div className={`request-user ${this.state.request}`}
                onClick={() => this.updateView('request')}
                >Request
                 <Notification count={this.props.requestCount}/>
                </div>
            </div>
            <Search
            placeholder={'Search for user'}
            onSearch={this.onSearch}
            ></Search>
            <div className="user-container">

            {
                this.state.userList.map((user, index) =>{
                  return  <User
                    socket={this.props.socket}
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