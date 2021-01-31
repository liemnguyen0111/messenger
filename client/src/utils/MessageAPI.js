import axios from "axios"


const MessageAPI = {
    getMessage: (params,queries) => axios.get(`/api/messages/${params}/?${queries}`, {
        headers : { 'Authorization' : `Bearer ${localStorage.getItem("user")}`}
    }),
    getLastMessage: (params,queries) => axios.get(`/api/messages/${params}/?${queries}`, {
        headers : { 'Authorization' : `Bearer ${localStorage.getItem("user")}`}
    }),
    createMessage: (params,message) => 
    axios.post(`/api/messages/${params}`,
    message, 
    {
        headers : { 'Authorization' : `Bearer ${localStorage.getItem("user")}`}
    })
}

export default MessageAPI