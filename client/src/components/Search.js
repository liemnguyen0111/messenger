import React ,  { Component } from "react"

class Search extends Component
{

    constructor( props ) {
        super( props );
    
        this.state = {
            value : false,
            show : '',
            hide : 'hide'
        }

    }
    
    onChange()
    {
        this.searchInput.value? this.show() : this.hide()
    }

    show()
    {
        this.setState({
            value : true,
            show : 'hide',
            hide : ''
        })
    }
 
    hide()
    {
        this.setState({
            value : false,
            show : '',
            hide : 'hide'
        })
        this.searchInput.value = ''
    }

    render()
    {
        return ( 
         <div className='search'>
        <input 
        type="text"
        placeholder={this.props.placeholder}
        ref={(input) => { this.searchInput = input;}}
        onChange={()=> this.onChange()}
        /> 
        <i className={`fas fa-search ${this.state.show}`} 
            onClick={() => this.searchInput.focus()}/>

        <i className={`fas fa-times ${this.state.hide}`} 
            onClick={() => this.hide()}/>
        </div>
        )
    }
 
}

export default Search