const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");
const http=require("http");
const {Server}=require("socket.io");
const cors=require("cors")
const dbConnection = require("./database");
const ACTIONS = require("./socket/Actions");
require("dotenv").config();

const server=http.createServer(app);
const io=new Server(server);
dbConnection();

app.use(cors({
    credentials:true,
    origin:["http://localhost:5173","*"]
    // origin:"*"
}));
app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>res.send("Namaste Code"))
app.use(require("./routers/userRouter"));



const userSocketMap={}
function getAllConnectedClients(roomId){

    // Array.from help us to return Array 
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId)=>{
        return {
            socketId,
            userName:userSocketMap[socketId]
        };
    })
}
io.on('connection',(socket)=>{
    console.log('socket connected', socket.id);

    socket.on(ACTIONS.JOIN,({roomId,userName})=>{
        userSocketMap[socket.id]=userName;
        socket.join(roomId);
        const clients=getAllConnectedClients(roomId);
        console.log(clients)
        clients.forEach(({socketId})=>{
            io.to(socketId).emit(ACTIONS.JOINED,{
                clients,
                userName,
                socketId:socket.id
            })
        })
    })




    //Disconnecting
    socket.on('disconnecting',()=>{
        const rooms=[...socket.rooms];
        rooms.forEach((roomId)=>{
            socket.in(roomId).emit(ACTIONS.DISCONNECTED,{
                socketId:socket.id,
                userName:userSocketMap[socket.id]
            });
        });

        
        delete userSocketMap[socket.id];
        socket.leave();
    });

})


const PORT=process.env.PORT || 4000;
server.listen(PORT,()=>console.log(`Server is running on ${PORT}`))
