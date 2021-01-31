import React , { Component } from 'react'
import Search from './Search'
import shallowCompare from 'react-addons-shallow-compare'
import User from './User'
import Notification from './Notification'
import UserAPI from '../utils/UserAPI'

const { getUser } = UserAPI

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

        // this.props.socket.on('update', msg =>{
 
        //     switch (msg) {
        //         case 'user':
        //             this.updateOnEmit()
        //         default:
        //             break;
        //     }
        // })
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

    updateOnEmit(){
     
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
    // componentWillUpdate(){
    //     getUsers(`${this.state.view}/${this.state.page}`)
    //     .then(({data}) => {
    
    //         this.setState({
    //             userList : [...this.state.userList, ...data[0]], ...data[1],
    //             maxPage : Math.ceil(data[1][this.state.view] / 10)
    //         })
 
    //     })
    //     .catch(err => console.error(err))
    // }
    
    onSearch(val){
        // val? `${val}/0` : `${this.state.view}/0`
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
            // console.log(scrollDown)
            if(scrollDown < 1 && !this.state.disabledScroll){
                console.log('update')
                this.setState({ page : ++this.state.page})
                this.updateView(this.state.view, this.state.page)
            }}
        
    }

    // filter(newList, oldList){
        
    //     for(let props in oldList){
    //         // if(oldList[props].data.id )
    //         let a = newList.findIndex(t => 
    //             // console.log(t.data.id)
    //             // t.data.id === oldList[props].data.id
    //             )
    //         console.log(oldList[props].data.id)
    //     }
    //     // newList = newList.filter((val, index, self) => 
    //     // index === self.findIndex((t) => 
    //     // val.data.id === t.data.id
    //     // ))
    //     // let list1 = newList.slice(0,10),
    //     // list2 = newList.slice(10,newList.length - 1)
    //     // return [...list2,...list1]
    //     return newList
    // }
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