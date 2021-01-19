import React ,  { Component } from "react"
import '../styles/Input.css'

class Input extends Component
{

    constructor( props ) {
        super( props );
    
        this.keyCount = 0;
   
        this.state = {
            value : false,
            like : 'r-hide',
            send : 'r-show',
        }

        this.getKey = this.getKey.bind(this);
    }
    
    getKey(){
        return this.keyCount++ * Math.random(10);
    }

    onChange(e)
    {
        e.target.value? this.show() : this.hide()
    }

    hide()
    {
        this.setState({
            value : false,
            like : 'r-hide',
            send : 'r-show',
        })
 
    }

    show()
    {
        this.setState({
            value : true,
            like : 'r-show',
            send : 'r-hide',
        })
    }

    handleKeyDown(e) {
        let temp = parseInt(e.target.style.height.split('px')[0]) === 42
        // e.target.style.height = `${temp ? 35 : e.target.scrollHeight}px`;
        e.target.style.height =  'inherit';
        // console.log(e.target.style.height)
        // e.target.style.height = `${temp ? 35 : e.target.scrollHeight}px`;
        // console.log(e.target.scrollHeight) 
        // e.target.style.height = `${e.target.scrollHeight}px`; 
        // In case you have a limitation
        e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
      }
    

    render()
    {
        return (
            <>
                    <div className="input">
                    <i className="fas fa-plus-circle"></i>

                    <div className="input-message">

                    <div>
                    <textarea type="text"
                     wrap="hard"
                    //  ref={(input) => { this.searchInput = input;}}
                    rows= '1'
                     placeholder='Type a message...' 
                     onChange={(e) => this.onChange(e)}
                     onKeyDown= {this.handleKeyDown}
                     onKeyUp= {this.handleKeyDown}
                    />
                    </div>


                    <i className= "far fa-image"></i>
                    <i className= "far fa-laugh-beam"></i>
                    </div>
               
                    <div className="like-send">
                    <i className= {`fas fa-thumbs-up like ${this.state.send}`}></i>
                    <i className= {`fas fa-paper-plane send ${this.state.like}`}></i>
                    </div>
                    
                    </div>

            </>
        )
    }
 
}

export default Input