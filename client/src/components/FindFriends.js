import React , { Component } from 'react'
import Search from './Search'
import User from './User'
import UserAPI from '../utils/UserAPI'

const { getUsers } = UserAPI

class FindFriends extends Component{

    
    constructor( props ) {
        super( props );
        
        this.state = {
            user : 60,
            view : "all",
            userList : []
        }

    }

    componentDidMount(){
        this.updateView("all")
    }
 

    updateView(view){
        getUsers(view)
        .then(({data}) => this.setState({userList : data}))
        .catch(err => console.error(err))
        console.log('update')
    }

    render()
    {
        return ( 
        <div className="find-friends">
            <div className="friend-options-list">
                <div className="all"
                onClick={() => this.updateView('all')}
                >All</div>
                <div className="pending"
                onClick={() => this.updateView('pending')}
                >Pending</div>
                <div className="request"
                onClick={() => this.updateView('request')}
                >Request</div>
            </div>
            <Search
            placeholder={'Search for user'}
            ></Search>
            <div className="user-container">

            {
                this.state.userList.map(user =>{
                  return  <User
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