// this is page layout for prompt
'use client'
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { create } from "domain";
import { POST } from "@app/api/auth/[...nextauth]/route";
import { Session } from "inspector";
import { Router } from "express";
const CreatePrompt = () => {
  // import router //
  const router = useRouter();
  // getting session
  const {data : session} = useSession();
    // set state
    const [submitting , setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });
    // function to create a prompt
    const createPrompt = async (e)=>{
          e.preventDefault();
          setSubmitting(true);
          try{
                                        {/** folders in which the route is written **/}
           const response = await fetch('/api/prompt/new' , {
            
             method: 'POST',
             body:JSON.stringify ({
              prompt: post.prompt,
              userId: session?.user.id,
              tag: post.tag,
             })
           })
           if(response.ok){
            router.push('/');
           }
          }catch(error){
             console.log("The error is", error);
          }finally{
            setSubmitting(false);
          }
    }


  return (
    <Form
    type = "Create"
    post={post}
    setPost = {setPost}
    submitting ={submitting}
    handleSubmit={createPrompt}  
    />
  )
}

export default CreatePrompt;