import React from 'react'

export default function UserProfile({params} : any) {
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <p>ProfilePage <span className='p-2 rounded bg-red-500 text-black'>{params.id}</span></p>
        </div>
    )
}