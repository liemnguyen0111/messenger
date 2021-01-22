import React , { Component } from 'react'
import Images from './Images'

class Message extends Component
{

    render(){
        return(<>
            <div className='messages'>
            {/* <div className="m-wrapper"> */}


            {/* <div className="f-message">
            <Images 
            width={40} 
            height={40} 
            images={['https://media-exp1.licdn.com/dms/image/C5635AQHUdpBWD4hx9A/profile-framedphoto-shrink_200_200/0/1596193249735?e=1611370800&v=beta&t=mpp847MX2q6W77EUPj7zMWXYkzvgHRPxMILqTZS2530']}
            />
            <div className="message">Hello Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, nisi praesentium? Sit atque quis quam eligendi optio fuga voluptatum rerum nobis doloribus dolorem culpa delectus, nesciunt amet eum nam sequi. ipsum dolor</div>
            </div> */}



            <div className="f-message">
            <Images 
            width={40} 
            height={40} 
            images={['https://media-exp1.licdn.com/dms/image/C5635AQHUdpBWD4hx9A/profile-framedphoto-shrink_200_200/0/1596193249735?e=1611370800&v=beta&t=mpp847MX2q6W77EUPj7zMWXYkzvgHRPxMILqTZS2530']}
            />
            <div className="message" title='12:00 AM'>Hello Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, nisi praesentium? Sit atque quis quam eligendi optio fuga voluptatum rerum nobis doloribus dolorem culpa delectus, nesciunt amet eum nam sequi. ipsum dolor</div>
            </div>
 
            <div className="y-message">
            <div className="message" title='12:00 AM'>Hello Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime reiciendis, facere molestiae reprehenderit provident architecto dicta omnis repellendus officiis, quidem id porro recusandae consectetur aspernatur odio sunt voluptates similique officia! Tim</div>
            </div>


            {/* <i className="fas fa-plus-circle"></i> */}
            </div>
        </>)
    }
}

export default Message