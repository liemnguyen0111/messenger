import React ,  { Component } from "react"


class Dot extends Component
{

    render()
    {
        return ( 
            <div className={`dot ${this.props.background}`}/>
         )
    }
 
}

export default Dot