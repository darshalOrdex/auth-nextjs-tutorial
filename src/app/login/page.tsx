"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email : "",
        password : "",
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            toast.success(response.data.message);
            setTimeout(()=>{
                router.push("/profile");
            },2800)
        } catch (error : any) {
            console.log("Login Failed", error.message);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    },[user])
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr/>
            <label htmlFor='email'>Email</label>
            <input
                id='email'
                type="email"
                autoComplete='email'
                className='p-2 border-gray-300 rounded-lg
                mb-4 focus:outline-1 focus:border-gray-500 text-black'
                value={user.email}
                placeholder='Email'
                onChange={e=>setUser({...user, "email" : e.target.value})}
            />
            <label htmlFor='password'>Password</label>
            <input
                id='password'
                type="password"
                className='p-2 border-gray-300 rounded-lg
                mb-4 focus:outline-1 focus:border-gray-500 text-black'
                value={user.password}
                placeholder='Password'
                onChange={e=>setUser({...user, "password" : e.target.value})}
            />
            <button 
                className='p-2 border border-gray-300 
                rounded-lg mb-4 focus:outline-1 focus:border-gray-500' 
                disabled = {buttonDisabled}
                onClick={onLogin}>{buttonDisabled ? "No SignUp" : "Login"}</button>
            <Link href={"/signup"}>Visit SignUp</Link>
        </div>
    )
}