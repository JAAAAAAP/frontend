import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { useAuthContext } from '../context/AuthContext'

import SearchBar from './SearchBar.jsx'
import Modal from './Modal/Modal.jsx'
import UserModal from './Modal/UserModal.jsx'

import Logo from '../assets/Img/Logo.png'

export default function Navbar() {

    const { user } = useAuthContext()

    const [menuBox, setMenuBox] = useState(false)

    const handleMenu = () => {
        setMenuBox(!menuBox) // toggle การเปิด/ปิด Modal
    }

    const handleCloseModal = (e) => {
        if (e.target.className.includes("modal-overlay")) {
            setMenuBox(false); // ปิด Modal เมื่อคลิกภายนอก
        }
    }

    return (
        <>
            <nav className="flex justify-between items-center p-3 bg-[#F6F9F8] text-center border-b-2">
                <Link to="/">
                    <img src={Logo} className='w-16 h-auto object-cover' alt="BannerImg" loading='lazy' />
                </Link>
                <SearchBar />
                <ul className="flex items-center justify-center font-bold gap-5">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `hidden lg:block ${isActive ? 'font-bold underline decoration-yellow-500 decoration-2 underline-offset-4' : ''}`
                        }
                    >
                        หน้าแรก
                    </NavLink>

                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `hidden lg:block ${isActive ? 'text-yellow-500 font-bold' : ''}`
                        }
                    >
                        เกี่ยวกับเรา
                    </NavLink>

                    <NavLink
                        to="/games"
                        className={({ isActive }) =>
                            `hidden lg:block ${isActive ? 'font-bold underline decoration-yellow-500 decoration-2 underline-offset-4' : ''}`
                        }
                    >
                        เกมทั้งหมด
                    </NavLink>

                    <NavLink
                        to="/uploadgame"
                        className={({ isActive }) =>
                            `hidden lg:block ${isActive ? 'font-bold underline decoration-yellow-500 decoration-2 underline-offset-4' : ''}`
                        }
                    >
                        อัพโหลดเกม
                    </NavLink>


                    {user ? (
                        <UserModal role={user.role} />
                    ) : (
                        <li className='bg-yellow-300 rounded-md p-2 text-xs uppercase ring-yellow-400 duration-150 hover:ring-2 hover:bg-transparent md:text-base'><Link to="/signin">เข้าสู่ระบบ</Link></li>
                    )}

                    <li className='lg:hidden' onClick={handleMenu}><Link className='flex content-center text-center items-center'><box-icon name='menu'></box-icon></Link></li>

                    {menuBox && (
                        <Modal handleClose={handleCloseModal} />
                    )}

                </ul>
            </nav>
        </>
    )
}

