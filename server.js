// const socket=require('socket.io')
// const app=require('express')()
// const http=require('http')
// const server=http.createServer(app)
// const io=socket(server)
// let users={}
// io.on('connection',socket=>{
//     if(!users[socket.id]){
//         users[socket.id]=socket.id
//     }
//     socket.emit('yourID',socket.id)
//     io.sockets.emit('allUsers',users)
//     socket.on('disconnect',()=>{
//         console.log('user left')
        
//         delete users[socket.id]
//     })
//     socket.on('callUser',data=>{
//         console.log('a request came info is',data)
//         io.to(data.userToCall).emit('hey',{from:data.from,signal:data.signal})
//     })
//     socket.on('acceptCall',(data)=>{
//         io.to(data.to).emit('callAccepted',data.signal)
//     })
// })
// server.listen(5000,()=>console.log('server started'))
const express=require('express')
const socket=require('socket.io')
const app=express()
const http=require('http')
const server=http.createServer(app)
const io=socket(server)

let allUsers={}
io.on('connection',socket=>{

    if(!allUsers[socket.id]){
        allUsers[socket.id]=socket.id
    }
    socket.on('disconnect',()=>{
        console.log('user left!!')
        delete allUsers[socket.id]
    })
    
    socket.emit('yourID',socket.id)
    io.sockets.emit('allUsers',allUsers)

    socket.on('callUser',data=>{
        io.to(data.userToCall).emit('hey',{caller:data.from,signal:data.signal})
    })


    
})



server.listen(8000,()=>console.log('server started'))

