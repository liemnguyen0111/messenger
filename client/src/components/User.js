import React , { Component } from 'react'
import UserAPI from '../utils/UserAPI'
import Images from './Images'
import Button from './Button'

const { putUser } = UserAPI

class User extends Component{

    constructor( props ) {
        super( props );
        
        this.state = {
            user : 60
        }

        this.onClick = this.onClick.bind(this)
        this.rejectFriend = this.rejectFriend.bind(this)
    }

    updateStatus(val){
        if(val === "Add Friend"){
          return 'add'
        }
        if(val === "Pending"){
           return 'pending-status'
        }
        if(val === "Accept"){
           return 'accept'
        }
        if(val === "Unfriend"){
            return 'unfriend'
         }
    }
    onClick(){
        console.log(this.props.status)
        if(this.props.status === "Add Friend") {
            this.addFriend()
        }
        if(this.props.status === "Accept") {
            this.acceptFriend()
        }
        if(this.props.status === "Unfriend") {
           
            this.unfriend()
        }
    }

    addFriend(){
        let data = {
            id : this.props.id
        }
        putUser('send-request', data)
        .then( () => { 
            this.props.socket.emit('request', {id: this.props.id,type:'request'})
        })
        .catch(err => console.error(err))
    }

    acceptFriend(){
        let data = {
            id : this.props.id,
            image : this.props.image[0],
            firstName : this.props.name[0],
            lastName : this.props.name[1]
        }
        putUser('accept-request', data)
        .then( () => { 
            this.props.socket.emit('request', {id: this.props.id,type:'accept'})
        })
        .catch(err => console.error(err))
    }

    rejectFriend(){
        let data = {
            id : this.props.id
        }
       
        putUser('reject-request', data)
        .then( () => { 
            console.log('reject')
            this.props.socket.emit('request', {id: this.props.id,type:'request'})
        })
        .catch(err => console.error(err))
    }

    unfriend(){
        let data = {
            id : this.props.id
        }
        console.log('here in unfriend')
        putUser('unfriend', data)
        .then( () => { 
            console.log('unfriend')
            this.props.socket.emit('request', {id: this.props.id,type:'request'})
        })
        .catch(err => console.error(err))
    }

    render(){
        return(
               
            <div className="user">
            <Images
            width={this.state.user} 
            height={this.state.user} 
            images={this.props.image}
            ></Images>

            <div className="user-name">{this.props.name[0] + " " +this.props.name[1]}</div>
        
        <div className="status-buttons">
        <Button
        name={this.props.status}
        style ={this.updateStatus(this.props.status)}
        width = {130}
        height = {30}
        onClick={this.onClick}
        />

        {this.props.status === "Accept" ? 
         <Button
         name={"Reject"}
         style ={`reject`}
         width = {130}
         height = {30}
         onClick={this.rejectFriend}
         /> : ''
        }

        </div>
      
            </div>

        )
    }
}

export default User