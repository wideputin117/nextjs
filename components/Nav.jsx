// create navbar //
// whenever we will use client needed hooks we have to use whenevr we use client side functionality we use 'use client' on top//
'use client'

// import link from next/link
import Link from "next/link";
// import imag 
import Image from "next/image";
// import hooks
import { useState, useEffect } from "react";
// lets import utils
import { signIn, signOut,useSession,getProviders } from "next-auth/react";

const Nav = () => {
    const {data: session} = useSession();
   // dropdown menu for mobile //
   const [toggleDropdown, setToggleDropdown] = useState(false);

    // for to use sign in we use providers from next-auth //
    const [providers, setProviders] = useState(null);
    // this will allow us to sign in using google and next-auth //
    useEffect(()=>{
      const setUpProviders = async ()=>{
        const response = await getProviders();
        setProviders(response);
      }
      // call setUpProvider 
      setUpProviders();
    })
  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
            <Image src='/assets/images/logo.svg' alt="Promptopia Logo" width={30} height={30} className="object-contain"></Image>
            <p className="logo_text">Promptopia</p>
        </Link>
        {/* Desktop or bigger screen navigation */}
         <div className="sm:flex hidden">
          {/*ternary operator used here*/}
            {session?.user ? (<div className="flex gap-3 md:gap-5"> <Link href='/create-prompt' className="black_btn">Create Post</Link>
            <button type="button" onClick={signOut} className="outline_btn">SIGN OUT</button>
            <Link href='/profile'>
            <Image src= {session?.user.image} width={37} height={37} className="rounded-full" alt="Profile"></Image></Link></div>) : 
          
          (<> 
            {/* this block will show for you when you want to signIn */}
            {providers && Object.values(providers).map((provider)=>(
              <button type="button" key={provider.name} className="black_btn" onClick={()=>signIn(provider.id)}>
                SignIn
              </button>
            ))} </>) }
         </div>


        {/** Mobile Navigation **/}
        <div className="sm:hidden flex relative">
          {session?.user ?(<div className="flex">
          <Image src={session?.user.image} width={37} height={37} className="rounded-full" alt="Profile" 
          onClick={()=>{setToggleDropdown((prev) => !prev)}}></Image>
          {toggleDropdown && 
          (<div className="dropdown">
           <Link href='/profile' className="dropdown_link" onClick={()=> setToggleDropdown(false)}>
             My Profile
           </Link>
           <Link href='/create-prompt' className="dropdown_link" onClick={()=> setToggleDropdown(false)}>
             Create Prompt
           </Link>
           <button type="button" className="mt-5 w-full black_btn" onClick={()=>{setToggleDropdown(false);
             signOut();}}>SignOut</button>
          </div>)} </div>) : (<> 
            {/* this block will show for you when you want to signIn */}
            {providers && Object.values(providers).map((provider)=>(
              <button type="button" key={provider.name} className="black_btn" onClick={()=>signIn(provider.id)}>
                SignIn
              </button>
            ))} </>)}

        </div>
    </nav>
  )
}

export default Nav