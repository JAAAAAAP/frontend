import React from 'react'

export default function Navbarloading() {
    return (
        <nav className="flex justify-between items-center p-3 bg-[#F6F9F8] text-center animate-pulse">
            <div className="w-16 h-9 rounded-md bg-gray-300"></div>
            <ul className="flex items-center justify-center font-bold gap-5">
                <div className="w-14 h-6 rounded-md bg-gray-300"></div>
                <div className="w-16 h-6 rounded-md bg-gray-300"></div>
                <div className="w-20 h-10 rounded-md bg-gray-300"></div>
            </ul>
        </nav>
    )
}
