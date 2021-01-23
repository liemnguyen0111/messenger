import React, { Component } from 'react'

class Button extends Component
{
    render()
    {
        return (
            <div 
            className = {`button ${this.props.type}`}
            style={{
                height : this.props.height,
                width : this.props.width
            }}
            onClick={this.props.onClick}
            >
                {this.props.name}
            </div>
        )
    }
}

export default Button