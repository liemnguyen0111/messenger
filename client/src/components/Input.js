import React, { Component } from 'react'

class Input extends Component
{
    constructor( props ) {
        super( props );

        this.state = {
            key : 0,
            message : '',
            like : 'hide',
            send : ''
        }

        // Bind handleKeyUp function to state
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    // Storing value from input to message
    onChange(e)
    {
        // console.log(this.state.key)
        if(this.state.key !== 13)
        this.setState({
            message : e.target.value
        })
    }

    // Hide send button and show like button and reset message 
    hide()
    {
        this.setState({
            message : '',
            like : '',
            send : 'hide',
            key : 13
        })
 
    }

    // Show send button and hide like button
    show()
    {
        this.setState({
            like : 'hide',
            send : ''
        })
    }

    // Check if value exist, then show send button and hide the other 
    // Then increase or decrease the height base on line of text
    // Maximum height 200px
    handleKeyDown(e) {

        this.state.message ?  this.show() : this.hide()
       
        let isMessage = !this.state.message
        isMessage = !isMessage

        if(e.keyCode === 13 && e.shiftKey === false)
        {
            this.setState({
                key : 13
            })
        }
        else
        {
            this.setState({
                key : 0
            })
        }
        
        // console.log()
        // return to original size when hit enter 
        if((e.keyCode === 13 && e.shiftKey === false) && isMessage)
        {
            e.target.style.height =  '24px';
            this.onSubmit()
        }
        else
        {
              // Set max height for input (maxHeight : 200px)
            e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
        }

      }

    handleKeyUp(e)
    {
        let isMessage = !this.state.message
        isMessage = !isMessage
        if((e.keyCode === 13 && e.shiftKey === false) || !isMessage)
        {
            e.target.style.height =  '24px';
        }
        else
        {
              // Set max height for input (maxHeight : 200px)
            e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
        }
    }
    
    onSubmit()
    {
        this.props.onSubmit(this.state.message)
        this.hide()
    }

    componentDidUpdate()
    {
        
    }
    
    render()
    {
        return(
            <section className="input">
                <i className="fas fa-plus-circle"/>
                <div className="text">
                {/* <div></div> */}
                <form >
                <textarea 
                    wrap = 'hard'
                    type="text"
                     ref={(input) => { this.messageInput = input;}}
                     rows= '1'
                     value = {this.state.message}
                     placeholder='Type a message...' 
                     onChange={(e) => this.onChange(e)}
                     onKeyUp = {this.handleKeyUp}
                     onKeyDown = {this.handleKeyDown}
                    />
                <i className= "far fa-image"/>
                <i className= "far fa-laugh-beam"/>
                </form>
               
                </div>
               
               <i className= {`fas fa-thumbs-up like ${this.state.like}`}/>
               <i 
               className= {`fas fa-paper-plane send ${this.state.send} `}
               onClick={this.onSubmit}
               />
             
            </section>
        )
    }
}

export default Input