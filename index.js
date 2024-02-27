import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import transactionRoute from './routes/transactions.js'





const app= express();
dotenv.config();

const connect= async ()=>{
try{
    await mongoose.connect(process.env.MONGO);
    console.log('conncted to mongoDB');
}
catch(error){
    throw error;
}
};
mongoose.connection.on("disconnected", ()=>{
    console.log('MongoDB disconnected!');
});



//middleware
app.use(cors({
    credentials: true,
   origin: [
   
     "exp://192.168.43.159:8081","http://192.168.43.159:8081"
   
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
   
   
   
   }));
   
   
  
app.use(express.json())
app.use(cookieParser())
app.options('*', cors());

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/transactions",transactionRoute)

app.use((err,req,res,next)=>{
const errStatus= err.status || 500 
const errMessage= err.message || 'Something went wrong'

return res.status(errStatus).json({
    success:false,
    status:errStatus,
    message:errMessage,
    stack:err.stack,

});
})











app.listen(5000, ()=>{
    connect();
    console.log('connected to server')
})