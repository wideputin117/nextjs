import { MongoGridFSChunkError } from "mongodb";
import mongoose from "mongoose";
let isConnected = false ; // to track the connection

// function to connect to db
export const ConnectDb = async ()=>{
    // set mongoose to strict
    mongoose.set('strictQuery',true);
     // check if we r connected
     if(isConnected){
        console.log("Connected to the database");
        return; 
     }
     // else 
     try{
        await mongoose.connect(process.env.MONGO_DB_URI,{
            // option object
            dbName: "promptopia_db",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })  
        isConnected = true;
        console.log("DB connected");
     }catch(err){
        console.error("The error is",err);
     }

} 