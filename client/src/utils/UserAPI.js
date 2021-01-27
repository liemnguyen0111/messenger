import axios from "axios"


const UserAPI = {
    registerUser : (user) => axios.post('/api/register/user', user),
    loginUser : (user) => axios.post('/api/login/user', user),
    updateUser : (user) => axios.put('/api/update/user',user, { 
        headers : { 'Authorization' : `Bearer ${localStorage.getItem("user")}`}
    }),
    isAuthorized : () => axios.get('/api/authorize/user', { 
        headers : { 'Authorization' : `Bearer ${localStorage.getItem("user")}`}
    }),
    userInit : () => axios.get('/api/init/user', {
        headers : { 'Authorization' : `Bearer ${localStorage.getItem("user")}`}
    }),
    getUsers: (params) => axios.get(`/api/user/${params}`, {
        headers : { 'Authorization' : `Bearer ${localStorage.getItem("user")}`}
    }),
    putUser: (params, user) => axios.put(`/api/user/${params}`, user,{
        headers : { 'Authorization' : `Bearer ${localStorage.getItem("user")}`}
    } )
}

export default UserAPI