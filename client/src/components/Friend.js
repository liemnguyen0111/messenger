import React ,  { Component } from "react"
import Images from './Images'

class Friend extends Component
{

    onClick(e) 
    {
       console.log( e.target)
    }


    render()
    {
        return ( 
            <div 
            className='friend'
            onClick={(e) => this.props.onClick(e)}
            ref={(f) => { this.f = f;}}
            data-tag={this.props.tag }
            >
            <Images 
            images={this.props.images}
            width= {this.props.width}
            height={this.props.height}
            ></Images>
            <section className="g-info">
            <div className="g-name">Nhung con be nhat nheo oawienfaweoifn </div>
            <section className="l-message-info">
            <div className="l-message">this is a   </div>
            <span className='time'> • 12:16 AM</span> 
            <Images 
            images={this.props.images}
            width= {20}
            height={20}
            ></Images>

            </section>
           
            </section>
           
            </div>
        )
    }
 
}

export default Friend