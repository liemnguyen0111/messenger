import React , { Component } from 'react'
import Images from './Images'
import Button from './Button'

class UserInfo extends Component{

    constructor( props ) {
        super( props );
        
        this.state = {
            profile : 60
    }}

    render(){
        return(
           <div className="user-info">
            <div className="u-row1">
            <Images 
            width={this.state.profile} 
            height={this.state.profile} 
            images={[this.props.info.image]}
            />
            <p>User Info:</p>
            </div>
         

            <div className="first-name info editable">
            <p>First name:</p>
            <div 
            contentEditable="true"
            suppressContentEditableWarning={true}
            >{this.props.info["firstName"]}</div>
            </div>

            <div className="last-name info editable">
            <p>Last name:</p>
            <div 
            contentEditable="true"
            suppressContentEditableWarning={true}
            >{this.props.info["lastName"]}</div>
            </div>

            <div className="username info editable">
            <p>Username:</p>
            <div 
            contentEditable="true"
            suppressContentEditableWarning={true}
            >{this.props.info["username"]}</div>
            </div>

            <div className="email info editable">
            <p>Email:</p>
            <div 
            contentEditable="true"
            suppressContentEditableWarning={true}
            >{this.props.info["email"]}</div>
            </div>

            <div className="address info editable">
            <p>Address:</p>
            <div 
            contentEditable="true"
            suppressContentEditableWarning={true}
            >{this.props.info["address"]}</div>
            </div>

            <div className="createdOn info">
            <p>Account created on :</p>
            <div>{this.props.info["date"]}</div>
            </div>
           
            <div className="buttons">
            <Button
            name={'Save changes'}
            type='sign-in'
            width = {120}
            height = {30}
            ></Button>
                 <Button
            name={'Cancel'}
            type='sign-in'
            width = {90}
            height = {30}
            ></Button>
            </div>
        

            <Button
            name={'Sign Out'}
            type='sign-out bottom-right'
            width = {90}
            height = {30}
            onClick={this.props.signOut}
            ></Button>
           </div>
        )
    }
}

export default UserInfo