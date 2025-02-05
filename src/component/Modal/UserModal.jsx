import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify';

import { useAuthContext } from '../../context/AuthContext'

function UserModal({ role }) {

    const { logout } = useAuthContext()
    const [userModal, setUserModal] = useState(false)

    const handleSignOut = async () => {

        try {
            await logout()
            toast.success('ออกจากระบบเห็นสำเร็จ', {
                position: 'top-center',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            handleClose()
        } catch (err) {
            return
        }
    }

    const handleUserModal = () => {
        setUserModal(!userModal) // Toggle การเปิด/ปิด Modal ของผู้ใช้
    }

    const handleCloseUserModal = (e) => {
        if (e.target.className.includes("modal-overlay")) {
            setUserModal(false)
        }
    }

    return (

        <>
            <div onClick={handleUserModal} className="flex items-center justify-center fill-yellow-300 cursor-pointer">
                <box-icon name='user-circle' size="md" ></box-icon>
            </div>

            {userModal && (
                <div
                    className='absolute inset-0 z-20 modal-overlay'
                    onClick={handleCloseUserModal}
                >
                    <div className='absolute right-14 translate-y-12 lg:right-2 lg:translate-y-12 bg-white px-4 py-2 rounded-md shadow-lg'>
                        <ul className='flex flex-col items-center gap-1 text-lg font-medium'>
                            <li>
                                {role === "admin" ? (
                                    <NavLink
                                        to="/DashBoard"
                                        className={({ isActive }) =>
                                            `${isActive ? 'font-bold text-yellow-400 decoration-2 underline-offset-4' : ''}`
                                        }
                                    >
                                        DashBoard
                                    </NavLink>
                                ) : (
                                    <NavLink
                                        to="/myprofile"
                                        className={({ isActive }) =>
                                            `${isActive ? 'font-bold text-yellow-400 decoration-2 underline-offset-4' : ''}`
                                        }
                                    >
                                        โปรไฟล์
                                    </NavLink>
                                )}
                            </li>
                            <li
                                className='bg-red-500 text-white rounded-md cursor-pointer p-1 px-2 ring-red-500 duration-150 hover:ring-2 hover:bg-transparent hover:text-black'
                                onClick={handleSignOut}
                            >
                                ออกจากระบบ
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserModal
