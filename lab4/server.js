const { Socket } = require("dgram");
const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const formatMessage = require('./utilis/messages');
const {userJoin,userLeave,getCurrentUser,getRoomUsers} = require('./utilis/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder to access front

app.use(express.static(path.join(__dirname,`view`)));

const botName = 'ChatCord Bot'; 
// Run when client connect
io.on('connection',(Socket)=>{
    console.log("new WS connection...");
    Socket.on('joinRoom',({username, room})=>{
        const user = userJoin(Socket.id ,username, room);
        Socket.join(user.room);
        Socket.emit('message',formatMessage(botName,'welcome to ChatCord!'))

        //brodcast when a user connects
        Socket.broadcast.to(user.room)
        .emit('message',formatMessage(botName,`${user.username} has joined the chat`));
    
        // Send users and room info
        io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    });

    //listen for chat message
    Socket.on('chatMessage',msg=>{
        const user = getCurrentUser(Socket.id);

        io.to(user.room).emit('message',formatMessage(user.username,msg));
    })

        // Runs when client disconnects
        Socket.on('disconnect', ()=>{
            const user = userLeave(Socket.id);
            if (user){
                io.to(user.room).emit(
                    "message",
                    formatMessage(botName, `${user.username} has left the chat`)
                  );

                  // Send users and room info
                    io.to(user.room).emit("roomUsers", {
                        room: user.room,
                        users: getRoomUsers(user.room),});
            }
        });
})
const PORT = 3000 || process.env.PORT;

server.listen(PORT, ()=> console.log(`server running on port ${PORT}`));