// import React ,  { Component } from "react"
// import '../styles/Friend.css'

// class Friend extends Component
// {

//     constructor( props ) {
//         super( props );
    
//         this.keyCount = 0;
   
//         this.state = {
//             value : false,
//             search : 'show',
//             exit : 'hide'
//         }

//         this.getKey = this.getKey.bind(this);
//     }
    
//     getKey(){
//         return this.keyCount++ * Math.random(10);
//     }

//     onChange(e)
//     {
//         e.target.value? this.show() : this.clear()
//     }

//     clear()
//     {
//         this.setState({
//             value : false,
//             search : 'show',
//             exit : 'hide'
//         })
//         this.searchInput.value = ''
//     }

//     show()
//     {
//         this.setState({
//             value : true,
//             search : 'hide',
//             exit : 'show'
//         })
//     }
//     render()
//     {
//         return (
//             <>

//                     {/* friend container */}
//                     <div className='friend'>
//                     <div className="image">
//                     <div>
//                     <img src="https://media-exp1.licdn.com/dms/image/C5635AQHUdpBWD4hx9A/profile-framedphoto-shrink_200_200/0/1596193249735?e=1610672400&v=beta&t=rlLJcz_CeRLcWZ3ZYU-vMBrAoPgMKNqR0CK9t7iDIxc" alt="" srcSet=""/>
//                     </div>
//                     <div>
//                     <img src="https://media-exp1.licdn.com/dms/image/C5635AQHUdpBWD4hx9A/profile-framedphoto-shrink_200_200/0/1596193249735?e=1610672400&v=beta&t=rlLJcz_CeRLcWZ3ZYU-vMBrAoPgMKNqR0CK9t7iDIxc" alt="" srcSet=""/>
//                     </div>
//                     </div>
                    
//                     {/* Name and latest message container*/}
//                     <div className="name">
//                         <div className="header">những con bè nhạt nhẽo</div>
//                         <div className="sub-header">
//                            <span  className="message" >Hello Tim wwwwwwwwwwwwwwwwwwwwwwwwwwwwweaefawegwwwww</span> 
//                            <span  className="time"> • 1:06 PM</span></div>
//                     </div>
//                     </div>

//             </>
//         )
//     }
 
// }

// export default Friend