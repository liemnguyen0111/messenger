import io from 'socket.io-client'
let socket;
const ENDPOINT = 'https://chat-box-418166.herokuapp.com/'

socket = io(ENDPOINT)

const SocketIO = {
    disconnect : () =>  socket.disconnect() ,
    reconnect : () => socket.connect() ,
    connect : (userID) =>  socket.emit('join', { id : userID }),
    sendRequest : (userID, type) => socket.emit('request',{ id : userID , type : type }),
    updateMessage : (groupID,status) =>  socket.emit('message', { id: groupID , status: status }),
    updateLatestMessage : (cb) =>  socket.on('message',cb),
    onMessage : (cb) => socket.on('message',cb),
    onRequest : (cb) => socket.on('request',cb),
    onReconnect : (cb) => socket.on('reconnect',cb),
    onUserConnect : (cb) => socket.on('userConnect',cb)
}

export default SocketIO