"use client"
import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const router = useRouter();
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
    return (
        <div className='flex flex-col justify-center items-center h-screen py-2'>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <h1>Profile</h1>
            <hr/>
            <p>Profile Page</p>
            <button 
                onClick={logout}
                className='mt-4 bg-blue-600 text-white 
                rounded hover:bg-blue-700 py-2 px-4'>Logout</button>
        </div>
    )
}
