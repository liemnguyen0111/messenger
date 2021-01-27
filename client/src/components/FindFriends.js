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

        this.onSearch = this.onSearch.bind(this)

    }

    componentDidMount(){
        this.updateView("all")
    }
 

    updateView(view){
        getUsers(view)
        .then(({data}) => {
            this.setState({userList : data[0], ...data[1]})
            console.log(this.state)
        })
        .catch(err => console.error(err))
        console.log('update')
    }

    onSearch(val){
        getUsers(val? val : 'all')
        .then(({data}) => {
            this.setState({userList : data[0], ...data[1]})
            console.log(this.state)
        })
        .catch(err => console.error(err))
    }

    render()
    {
        return ( 
        <div className="find-friends">
            <div className="friend-options-list">
                <div className="all-user"
                onClick={() => this.updateView('all')}
                >All</div>
                <div className="pending-user"
                onClick={() => this.updateView('pending')}
                >Pending</div>
                <div className="request-user"
                onClick={() => this.updateView('request')}
                >Request</div>
            </div>
            <Search
            placeholder={'Search for user'}
            onSearch={this.onSearch}
            ></Search>
            <div className="user-container">

            {
                this.state.userList.map((user, index) =>{
                  return  <User
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