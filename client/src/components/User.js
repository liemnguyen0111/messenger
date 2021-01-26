import React , { Component } from 'react'
import Images from './Images'
import Button from './Button'

class User extends Component{

    constructor( props ) {
        super( props );
        
        this.state = {
            user : 60,
            style : ''
        }

    }

    componentDidMount(){
        if(this.props.status === "Add Friend"){
            this.setState({style : 'add'})
        }
        if(this.props.status === "Pending"){
            this.setState({style : 'pending'})
        }
        if(this.props.status === "Accept"){
            this.setState({style : 'accept'})
        }
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
        style ={`${this.state.style}`}
        width = {130}
        height = {30}
        // onClick={this.onSaveChanges}
        />

        {this.props.status === "Accept" ? 
         <Button
         name={"Reject"}
         style ={`reject`}
         width = {130}
         height = {30}
         // onClick={this.onSaveChanges}
         /> : ''
        }
        </div>
      
            </div>

        )
    }
}

export default User