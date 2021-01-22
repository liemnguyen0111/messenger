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
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }
    
    // Storing value from input to message
    onChange(e)
    {
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
            send : 'hide'
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
    handleKeyUp(e) {

        this.state.message ?  this.show() : this.hide()

        if(e.keyCode === 13 && !this.state.message )
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
        
        // return to original size when hit enter 
        if((e.keyCode === 13 && e.shiftKey === false) || !this.state.message )
        {
            e.target.style.height =  '24px';
            this.hide()
        }
        else
        {
              // Set max height for input (maxHeight : 200px)
            e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
        }

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
                <textarea type="text"
                     ref={(input) => { this.messageInput = input;}}
                     rows= '1'
                     value = {this.state.message}
                     placeholder='Type a message...' 
                     onChange={(e) => this.onChange(e)}
                     onKeyUp = {this.handleKeyUp}
                     onKeyDown = {this.handleKeyUp}
                    />
                <i className= "far fa-image"/>
                <i className= "far fa-laugh-beam"/>
                </form>
               
                </div>
               
               <i className= {`fas fa-thumbs-up like ${this.state.like}`}/>
               <i className= {`fas fa-paper-plane send ${this.state.send} `}/>
             
            </section>
        )
    }
}

export default Input