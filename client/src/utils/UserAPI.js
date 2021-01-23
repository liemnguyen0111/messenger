import axios from "axios"


const UserAPI = {
    registerUser : (user) => axios.post('/api/register/user', user),
    loginUser : (user) => axios.post('/api/login/user', user),
    isAuthorized : () => axios.get('/api/authorize/user', { 
        headers : { 'Authorization' : `Bearer ${localStorage.getItem("user")}`}
    }),
    getUserInfo : (userID) => axios.get('/api/info/user', userID, {
        headers : { 'Authorization' : `Bearer ${localStorage.getItem("user")}`}
    })
}

export default UserAPI