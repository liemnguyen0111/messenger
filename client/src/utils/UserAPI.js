import axios from "axios"


const UserAPI = {
    registerUser : (user) => axios.post('/api/register/user', user),
    postUser : (user) => axios.post('/api/login/user', user),
    putUser : (params, data, queries ) => axios.put(`/api/user/${params}/?${queries}`,data, { 
        headers : { 'Authorization' : `Bearer ${localStorage.getItem("user")}`}
    }),
    getUser : (params, queries) => axios.get(`/api/user/${params}/?${queries}`, { 
        headers : { 'Authorization' : `Bearer ${localStorage.getItem("user")}`}
    }),
    userInit : () => axios.get('/api/init/user', {
        headers : { 'Authorization' : `Bearer ${localStorage.getItem("user")}`}
    }),
    // getUsers: (params) => axios.get(`/api/user/${params}`, {
    //     headers : { 'Authorization' : `Bearer ${localStorage.getItem("user")}`}
    // }),
    // putUser: (params, user) => axios.put(`/api/user/${params}`, user,{
    //     headers : { 'Authorization' : `Bearer ${localStorage.getItem("user")}`}
    // } )
}

export default UserAPI