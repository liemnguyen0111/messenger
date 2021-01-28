import axios from "axios"


const MessageAPI = {
    getMessage: (params) => axios.get(`/api/messages/${params}`, {
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