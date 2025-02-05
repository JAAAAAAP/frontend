import React, { useState, useRef, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

function Sidebar({ toggleSidebar }) {
    const [isOpen, setIsOpen] = useState(false)
    const sidebarRef = useRef(null)
    const { logout } = useAuthContext()


    // ฟังก์ชันในการ toggle สถานะของ Sidebar
    const handleToggle = () => {
        setIsOpen(!isOpen);
        toggleSidebar(!isOpen)
    };

    // ฟังก์ชันในการปิด Sidebar เมื่อคลิกภายนอก
    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsOpen(false);
            toggleSidebar(false)
        }
    };

    const handdleLogout = async () => {
        await logout()
    }

    // เพิ่ม event listener เมื่อ component ถูก mount
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        // ลบ event listener เมื่อ component ถูก unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`flex flex-col justify-between fixed px-5 pt-5 top-0 left-0 bg-gray-800 text-white transition-all transform h-full duration-300 ${isOpen ? 'translate-x-0 w-60' : 'w-20'}`}
            >

                <div className="flex flex-col gap-8">
                    <div className={`flex items-center fill-white ${isOpen ? 'justify-between' : 'justify-center'}`}>
                        {isOpen && (
                            <span className='text-2xl font-medium'>GameHub</span>
                        )}
                        <div className="hidden justify-center items-center cursor-pointer md:flex">
                            <box-icon name="menu" size="md" onClick={handleToggle} />
                        </div>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <NavLink to="/Dashboard"
                            className={({ isActive }) => `flex items-end duration-150 fill-white gap-2 rounded-md hover:bg-yellow-300 
                            ${isOpen ? 'justify-start' : 'justify-center'} ${isActive ? 'bg-yellow-300 ' : ''}`}
                        >
                            <box-icon name="home" size="md" />
                            {isOpen && (
                                <span className='text-xl line-clamp-1'>หน้าแรก</span>
                            )}
                        </NavLink>

                        <NavLink to="/usermanagement"
                            className={({ isActive }) => `flex items-end duration-150 fill-white gap-2 rounded-md hover:bg-yellow-300 
                            ${isOpen ? 'justify-start' : 'justify-center'} ${isActive ? 'bg-yellow-300 ' : ''}`}
                        >
                            <box-icon name='user' size="md" />
                            {isOpen && (
                                <span className='text-xl line-clamp-1'>จัดการผู้ใช้</span>
                            )}
                        </NavLink>

                        <div className={`flex items-end duration-150 fill-white gap-2 rounded-md hover:bg-yellow-300 ${isOpen ? 'justify-start' : 'justify-center'}`}>
                            <box-icon name='joystick' size="md" />
                            {isOpen && (
                                <span className='text-xl line-clamp-1'>จัดการเกม</span>
                            )}
                        </div>

                        <NavLink to="/CategoriesManagement"
                            className={({ isActive }) => `flex items-end duration-150 fill-white gap-2 rounded-md hover:bg-yellow-300 
                            ${isOpen ? 'justify-start' : 'justify-center'} ${isActive ? 'bg-yellow-300 ' : ''}`}
                        >
                            <box-icon name='category-alt' size="md"></box-icon>
                            {isOpen && (
                                <span className='text-xl line-clamp-1'>จัดการหมวดหมู่</span>
                            )}
                        </NavLink>

                    </div>

                </div>

                <div className={`flex justify-between items-center pb-1`}>
                    {isOpen && (
                        <span className='text-xl font-medium uppercase'>admin</span>
                    )}

                    <div className={` fill-white flex items-center justify-center gap-2 ${isOpen ? '' : 'flex-col'}`}>

                        <Link to="/" className='rounded-md duration-150 fill-white hover:bg-yellow-300 px-1'>
                            <box-icon name='home-alt' size="md" />
                        </Link>

                        <div className='rounded-md duration-150 hover:bg-red-600 px-1 pt-1' onClick={handdleLogout}>
                            <box-icon name='log-in' type='solid' size="md" ></box-icon>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
