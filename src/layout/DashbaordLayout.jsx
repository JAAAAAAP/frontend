import React, { Suspense, useState } from 'react'
import { Outlet } from 'react-router'

import Footer from '../component/Footer.jsx'
import Sidebar from '../component/_DashBoard/Sidebar.jsx'

function DashbaordLayout() {


    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <div className='flex h-auto bg-[#F5F5F5] '>

                <div>
                    <Sidebar toggleSidebar={setIsSidebarOpen} />
                </div>

                <div className={`flex-1 flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-60' : 'ml-20'}`}>
                    <Outlet />
                </div>



            </div>
        </>
    )
}

export default DashbaordLayout
