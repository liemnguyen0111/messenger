import React ,  { Component } from "react"
import '../styles/Background.css'

class Background extends Component
{

    constructor( props ) {
        super( props );
    
        this.keyCount = 0;
        this.getKey = this.getKey.bind(this);
    }
    
    getKey(){
        return this.keyCount++ * Math.random(10);
    }

    render()
    {
        return (
            <div className='background'>   
            {[...new Array(30)]
            .map(
              (key) => 
              <div className="square" key={this.getKey()}></div>
            )}
            </div>
        )
    }
 
}

export default Background