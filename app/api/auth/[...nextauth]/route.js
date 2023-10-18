// this route handles our authentication and to signin


import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import User  from "@models/Users"; // imports User model from models/Users
 // import database
 import { ConnectDb } from "@utils/database";
// handle for sign in 
const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks:{
        // session to know which user is online and using it
        async session({session}) {
            const sessionUser = await User.findOne({
                email: session.user.email,
            })
            session.user.id = sessionUser._id.toString();
            return session;      
        
            },
        
            async signIn({profile}){
        try{
            await ConnectDb();
            // check if user exist in databse
            const userExist = await User.findOne({email:profile.email});
        
            // if dosent exist create a new user
        if(!userExist){
            await User.create({
                email:profile.email,
                username:profile.name.replace(" ","").toLowerCase(),
                image:profile.picture})
        }
        
        return true; // for sign in and create
        }catch(error){
               console.error(error);
               // in any error
               return false; // function will return false 
        }
            }
    }
    
     

})

export {handler as GET,handler as POST};