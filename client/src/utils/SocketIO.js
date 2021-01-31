import io from 'socket.io-client'
let socket;
const ENDPOINT = 'localhost:5000'
socket = io(ENDPOINT)

const SocketIO = {
    disconnect : () =>  socket.disconnect() ,
    reconnect : () => socket.connect() ,
    connect : (userID) =>  socket.emit('join', { id : userID }),
    updateMessage : (groupID) =>  socket.emit('updateView', { id: groupID, type : 'message' }),
    updateLatestMessage : (groupID) =>  socket.emit('updateView', {id : groupID, type : 'latestMessage'}),
    onMessage : () => socket.on('message'),
    onReconnect : (cb) => socket.on('reconnect',cb),
    onUserConnect : (cb) => socket.on('userConnect',cb)
}

export default SocketIO