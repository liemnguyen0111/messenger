import axios from "axios"


const UserAPI = {
    registerUser : (user) => axios.post('/api/register/user', user),
    postUser : (user) => axios.post('/api/register/user', user),
    putUser : (params, queries,data ) => axios.put(`/api/user/${params}/?${queries}`,data, { 
        headers : { 'Authorization' : `Bearer ${localStorage.getItem("user")}`}
    }),
    getUser : (params, queries) => axios.get(`/api/user/${params}/?${queries}`, { 
        headers : { 'Authorization' : `Bearer ${localStorage.getItem("user")}`}
    }),
    loginUser : (user) => axios.put('/api/user/authenticate/login', user),
}

export default UserAPI