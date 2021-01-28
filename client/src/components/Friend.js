import React ,  { Component } from "react"
import Images from './Images'

class Friend extends Component
{


    render()
    {
        return ( 
            <div 
            className={`group ${!this.props.details.isRead? "is-read": ""}`}
            onClick={(e) => this.props.onClick(e, this.props.details.id, this.props.details.groupName)}
            ref={(f) => { this.f = f;}}
            data-tag={this.props.tag }
            >
            <Images 
            images={[this.props.details.profileImage]}
            width= {this.props.width}
            height={this.props.height}
            ></Images>
            <section className="g-info">
            <div className="g-name">{this.props.details.groupName}</div>
            <section className="l-message-wrapper">
            <div className="l-message-info">
            <div className="l-message">{this.props.details.latestMessage || "New Friend"}<span/></div>
            <span className='time'>{" • " + this.props.details.time}</span> 
            </div>
            

            {this.props.details.latestMessage && this.props.details.isRead?
             <Images 
             images={[this.props.details.profileImage]}
             width= {20}
             height={20}
             ></Images> : ""
            }
        
            </section>
           
            </section>
           
            </div>
        )
    }
 
}

export default Friend