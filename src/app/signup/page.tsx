'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email : "",
        password : "",
        username : ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const onSignUp = async() => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup Success", response.data);
            toast.success(response.data.message);
            setTimeout(() => {
                router.push("/login");
            },2800)
        } catch (error : any) {
            console.log("Signup Failed", error.message);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0  && user.username.length > 0) {
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
            <h1>{loading ? "Processing" : "Signup"}</h1>
            <hr/>
            <label htmlFor='username'>Username</label>
            <input
                id='username'
                type="text"
                className='p-2 border-gray-300 rounded-lg
                mb-4 focus:outline-1 focus:border-gray-500 text-black'
                value={user.username}
                placeholder='username'
                onChange={e=>setUser({...user, "username": e.target.value})} 
            />
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
                rounded-lg mb-4 focus:outline-1 focus:border-gray-500 disabled:cursor-not-allowed'
                disabled = {buttonDisabled}
                onClick={onSignUp}>{buttonDisabled ? "No SignUp" : "Sign Up"}</button>
            <Link href={"/login"}>Visit Login</Link>
        </div>
    )
}