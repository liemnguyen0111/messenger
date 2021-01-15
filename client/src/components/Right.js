import React ,  { Component } from "react"
import '../styles/Right.css'

class Right extends Component
{

    constructor( props ) {
        super( props );
    
        this.keyCount = 0;
   
        this.state = {
            value : false,
            like : 'r-hide',
            send : 'r-show',
            out : ''
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
            out : 'out'
        })
        // this.searchInput.value = ''
    }

    show()
    {
        this.setState({
            value : true,
            like : 'r-show',
            send : 'r-hide',
            out : ''
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
                <div className="right-comp">

                {/* Right row 1  */}
                    <div className="r-row-1">  
                        {/* logout button */}
                         <div className={`log-out`}>Log out</div>
                        </div>

                {/* Right row 2 */}
                    <div className="r-row-2">
              
                    <div className="r-image">
                    <div>
                    <img src="https://media-exp1.licdn.com/dms/image/C5635AQHUdpBWD4hx9A/profile-framedphoto-shrink_200_200/0/1596193249735?e=1610672400&v=beta&t=rlLJcz_CeRLcWZ3ZYU-vMBrAoPgMKNqR0CK9t7iDIxc" alt="" srcSet=""/>
                    </div>
                    <div>
                    <img src="https://media-exp1.licdn.com/dms/image/C5635AQHUdpBWD4hx9A/profile-framedphoto-shrink_200_200/0/1596193249735?e=1610672400&v=beta&t=rlLJcz_CeRLcWZ3ZYU-vMBrAoPgMKNqR0CK9t7iDIxc" alt="" srcSet=""/>
                    </div>
                    </div>
                
                    
                        <div className="room-name">room name</div>
                        <i className="fas fa-phone-alt"></i>
                        <i className="fas fa-video"></i>
                        <i className="fas fa-search"></i>
                        <i className="fas fa-search"></i>
                    </div>

                {/* Right row 3 */}
                    <div className="r-row-3">
                        <div className="messages"></div>
                    </div>

                {/* Right row 4 */}
                    <div className="r-row-4">
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
                        {/* End of right-comp */}
                </div>   
            </>
        )
    }
 
}

export default Right