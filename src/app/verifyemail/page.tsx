"use client"
import axios from "axios";
import Link from "next/link";
import React,{ useState, useEffect, useDebugValue, useReducer } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const verifyUserEmail = async() => {
        try {
            await axios.post("/api/users/verifyemail",{token})
            setVerified(true)
        } catch (error : any) {
            setError(true);
            console.log(error.response.data)
        }
    }
    useEffect(() => {
        const urlToken = window.location.search.split('=')[1];
        setToken(urlToken || "")
    },[])
    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token])
    
    return (
        <div className='flex flex-col justify-center items-center h-screen py-2'>
            <h1 className="text-4xl text-white">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>
            {verified && <div><h2 className="text-2xl">Email Verified You Can Log In</h2><Link href={"/login"} className="text-blue-500">Login</Link></div>}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                </div>
            )}
        </div>
    )
}
