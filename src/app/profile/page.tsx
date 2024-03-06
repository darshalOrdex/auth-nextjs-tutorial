"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");
    const logout = async() => {
        try {
            await axios.get('/api/users/logout')
            toast.success("Logged Out")
            setTimeout(() => {
                router.push("/login");
            }, 2800);
        } catch (error : any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
    const getUserDetails = async() => {
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        setData(res.data.data._id);
    }
    return (
        <div className='flex flex-col justify-center items-center h-screen py-2'>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <h1>Profile</h1>
            <hr/>
            <p>Profile Page</p>
            <h2 className='p-2 rounded-md bg-green-400 text-white'>{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <button 
                onClick={logout}
                className='mt-4 bg-blue-600 text-white 
                rounded hover:bg-blue-700 py-2 px-4'>Logout</button>
            <button 
                onClick={getUserDetails}
                className='mt-4 bg-green-600 text-white 
                rounded hover:bg-green-700 py-2 px-4'>GetUserDetails</button>
        </div>
    )
}
