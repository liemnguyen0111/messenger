import React , { Component } from 'react'
import UserAPI from '../utils/UserAPI'
import Images from './Images'
import Button from './Button'

const { putUser } = UserAPI
class UserInfo extends Component{

    constructor( props ) {
        super( props );
        
        this.state = {
            profile : 60,
            disabled : 'disabled-button'
    }

    this.onChange = this.onChange.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onSaveChanges = this.onSaveChanges.bind(this)
}

    onCancel(){
    this.firstName.innerText =  this.props.info["firstName"] 
    this.lastName.innerText  = this.props.info["lastName"]
    this.username.innerText =   this.props.info["username"] 
    this.email.innerText =  this.props.info["email"] 
    this.address.innerText  =  this.props.info["address"]  
    this.disabled()
    this.errorMessage.style.display = 'none'
    }

    onSaveChanges(){
        const userInfo = {
            firstName : this.firstName.innerText,
            lastName : this.lastName.innerText,
            username : this.username.innerText,
            email : this.email.innerText,
            address : this.address.innerText
        }

        if(!this.checkSpaceBetween(this.username.innerText)){
        putUser('update-info', userInfo)
        .then(data => {
            console.log(data)
            this.errorMessage.style.display = 'none'
        })
        .catch(err => console.error(err))
        } else { 
            this.errorMessage.style.display = 'block'
            this.errorMessage.innerHTML = 'Username cannot contain space in between.'

            console.log("reject")
        }
       
    }

    onChange(){
        this.disabled()
    }

    onCheck(){
        return (
            this.props.info["firstName"]  === this.firstName.innerText &&
            this.props.info["lastName"]  === this.lastName.innerText &&
            this.props.info["username"]  === this.username.innerText &&
            this.props.info["email"]  === this.email.innerText &&
            this.props.info["address"]  === this.address.innerText 
        )
    }

    disabled(){
        if(this.onCheck()){
            this.setState({ disabled : 'disabled-button'})
        }
        else{
            this.setState({ disabled : ''})
        }
    }

    checkSpaceBetween(val){
        val = val.trim()
        return /\s/g.test(val)
    }
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
         
            <p ref={(r) => { this.errorMessage = r;}} className="error-message"/>

            <div className="first-name info editable">
            <p>First name:</p>
            <div 
            onInput={this.onChange}
            ref = { r => this.firstName = r}
            contentEditable="true"
            suppressContentEditableWarning={true}
            >{this.props.info["firstName"]}</div>
            </div>

            <div className="last-name info editable">
            <p>Last name:</p>
            <div 
            onInput={this.onChange}
             ref = { r => this.lastName = r}
            contentEditable="true"
            suppressContentEditableWarning={true}
            >{this.props.info["lastName"]}</div>
            </div>

            <div className="username info editable">
            <p>Username:</p>
            <div 
            onInput={this.onChange}
             ref = { r => this.username = r}
            contentEditable="true"
            suppressContentEditableWarning={true}
            >{this.props.info["username"]}</div>
            </div>

            <div className="email info editable">
            <p>Email:</p>
            <div 
            onInput={this.onChange}
             ref = { r => this.email = r}
            contentEditable="true"
            suppressContentEditableWarning={true}
            >{this.props.info["email"]}</div>
            </div>

            <div className="address info editable">
            <p>Address:</p>
            <div 
            onInput={this.onChange}
             ref = { r => this.address = r}
            contentEditable="true"
            suppressContentEditableWarning={true}
            >{this.props.info["address"]}</div>
            </div>

            <div className="createdOn info">
            <p>Account created on :</p>
            <div>{this.props.info["createdOn"]}</div>
            </div>

            {this.props.info["createdOn"] !== this.props.info["updatedOn"]?
            <div className="updatedOn info">
            <p>Updated on :</p>
            <div>{this.props.info["updatedOn"]}</div>
            </div> : ''
           }
            
           
            <div className="buttons">
                <div></div>
                <div> 
            <Button
            name={'Save changes'}
            style ={`blue save-changes ${this.state.disabled}`}
            width = {120}
            height = {30}
            onClick={this.onSaveChanges}
            ></Button>
            <Button
            name={'Cancel'}
            style = {`blue cancel-changes ${this.state.disabled}`}
            width = {90}
            height = {30}
            onClick={this.onCancel}
            ></Button>
            </div>
           
            </div>
        

            <Button
            name={'Sign Out'}
            style ='red top-right'
            width = {90}
            height = {30}
            onClick={this.props.signOut}
            ></Button>
           </div>
        )
    }
}

export default UserInfo