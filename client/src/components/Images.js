import React ,  { Component } from "react"
// import defaultUser from '../images/defaultUser.jpg'

class Images extends Component
{
    constructor( props ) {
        super( props );
        this.min = [1.8,1.4];
    }
    
    // return the image ratio base on number of pictures
    ratio(val) 
    {
        return this.min[val]
    }

    // return default image when original image fail to load
    onError(event)
    {
        event.target.src = '../images/defaultUser.jpg'
    }

    render()
    {
        return ( 
            <div 
            className='images'
            onClick={this.props.onClick}
            style={{ 
                height : `${this.props.height}px` ,
                width : `${this.props.width}px`,
                minHeight : `${this.props.height}px` ,
                minWidth : `${this.props.width}px`
            }}>
            {
                this.props.images.map((v, i) => {
                 return  <img 
                 key ={i}
                 style={{
                 minWidth : `${this.height / this.ratio(i)}px`
                 }} src={v} alt="" onError={this.onError}/>

                },'')
            }      
             </div>
         )
    }
 
}

export default Images