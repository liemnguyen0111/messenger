import React ,  { Component } from "react"


class Notification extends Component
{

    render()
    {
        return ( 
            <>
            {
                this.props.count? 
                <div className={`notification`}>
                {this.props.count}
             </div> : ""
            }
            </>
         
         )
    }
 
}

export default Notification