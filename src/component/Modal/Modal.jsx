import React from 'react'
import { NavLink } from 'react-router-dom'

function Modal({ handleClose }) {
    return (

        <div
            className='absolute inset-0 z-10 modal-overlay lg:hidden'
            onClick={handleClose}
        >
            <div className='absolute right-2 translate-y-12 bg-white px-4 py-2 rounded-md shadow-lg'>
                <ul className='flex flex-col items-end gap-1 text-lg font-medium'>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `block lg:hidden ${isActive ? 'font-bold text-yellow-400 decoration-2 underline-offset-4' : ''}`
                            }
                        >
                            หน้าแรก
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `block lg:hidden ${isActive ? 'font-bold text-yellow-400 decoration-2 underline-offset-4' : ''}`
                            }
                        >
                            เกี่ยวกับเรา
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/games"
                            className={({ isActive }) =>
                                `block lg:hidden ${isActive ? 'font-bold text-yellow-400 decoration-2 underline-offset-4' : ''}`
                            }
                        >
                            เกมทั้งหมด
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/uploadgame"
                            className={({ isActive }) =>
                                `block lg:hidden ${isActive ? 'font-bold text-yellow-400 decoration-2 underline-offset-4' : ''}`
                            }
                        >
                            อัพโหลดเกม
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>

    )
}

export default Modal
