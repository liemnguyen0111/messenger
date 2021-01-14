import React ,  { Component } from "react"
import Left from './Left'
import Right from './Right'
import '../styles/Home.css'

class Home extends Component
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
            <div>
                <div className="wrapper">
                    <div className="left">
                        <Left></Left>
                    </div>
                    <div className="right">
                    <Right></Right>
                    </div>
                </div>

                {/* background squares */}
                {[...new Array(30)]
            .map(
              (key) => 
              <div className="square" key={this.getKey()}></div>
            )}

            </div>
        )
    }
 
}

export default Home