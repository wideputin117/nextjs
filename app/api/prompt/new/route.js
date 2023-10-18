// to save connect to db
import { ConnectDb } from "@utils/database";
import Prompt from "@models/prompt";
export const POST = async (req,res)=>{
    // getting data from prompt
    const {userId, prompt, tag} = await req.json();

    try{
        await ConnectDb();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag 
        })
         await newPrompt.save();
         return new Response(JSON.stringify(newPrompt),{status: 201});
    }
    catch(error){
        console.log(error);
        return new Response("Failed to create a new prompt");
         
    }
}