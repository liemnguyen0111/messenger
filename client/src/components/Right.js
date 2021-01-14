import React ,  { Component } from "react"
import '../styles/Right.css'

class Right extends Component
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
            <>
                <div className="right-comp">
                    
                </div>   
            </>
        )
    }
 
}

export default Right