import React, { useState } from 'react'
import CustomDataTable from './CustomDataTable'
import { useUpdateRole, useCreateUser, useDeleteUser } from '../../../hook/useUser'

function UserTable({ data, title }) {

    const { mutateAsync, isPending } = useUpdateRole()
    const { mutateAsync: createUser, isPending: userPending } = useCreateUser()
    const { mutateAsync: deleteUser, isPending: deletePending } = useDeleteUser()

    const [searchQuery, setSearchQuery] = useState('')
    
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(null)
    const [role, setRole] = useState("user")

    const [name, setname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleManageUser = (userId) => {
        setSelectedUserId(userId) // ตั้งค่า id ของผู้ใช้ที่เลือก
        setIsModalOpen(true) // เปิด modal
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await mutateAsync({ userId: selectedUserId, role: role })
            closeModal()
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddUser = async (e) => {
        e.preventDefault()
        try {
            const userData = { name, email, password, role }
            await createUser(userData)
            setname('')
            setEmail('')
            setPassword('')
            closeModal()
        } catch (error) {
            console.error("เกิดข้อผิดพลาด:", error)
        }
    }

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id)
        } catch (error) {
            console.error("เกิดข้อผิดพลาด:", error)
        }
    }

    const closeModal = () => {
        setIsModalOpen(false); // ปิด modal
        setIsAddUserModalOpen(false); // ปิด modal
        setSelectedUserId(null); // รีเซ็ต selectedUserId
    }


    // Filter the data based on the search query
    const filteredData = data?.filter(row => {
        return (
            new Date(row.created_at).toLocaleString('th-Th', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }).toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const columns = [
        {
            name: <span className="text-lg font-medium">ID</span>,
            selector: row => row.id,
            sortable: true,
            width: '60px'
        },
        {
            name: <span className="text-lg font-medium">ชื่อ</span>,
            selector: row => row.name,
            sortable: true,
            // center: true,

        },
        {
            name: <span className="text-lg font-medium">อีเมล</span>,
            selector: row => row.email,
            sortable: true,
            // center: true,

        },
        {
            name: <span className="text-lg font-medium">วันที่สมัครใช้งาน</span>,
            selector: row => new Date(row.created_at).toLocaleString('th-Th', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }),
            sortable: true,
            center: true,

        },
        {
            name: <span className="text-lg font-medium">บทบาท</span>,
            selector: row => row.role,
            sortable: true,
            center: true,
        },
        {
            name: <span className="text-lg font-medium">จัดการบทบาทผู้ใช้</span>,
            cell: row => (
                <button
                    onClick={() => handleManageUser(row.id)} // ฟังก์ชันที่ใช้เมื่อกดปุ่ม
                    className="bg-yellow-300 font-medium px-4 py-2 rounded hover:bg-yellow-500 hover:text-white"
                >
                    จัดการ
                </button>
            ),
            center: true,
        },
        {
            name: <span className="text-lg font-medium">ลบผู้ใช้</span>,
            cell: row => (
                <button
                    onClick={() => handleDeleteUser(row.id)} // ฟังก์ชันที่ใช้เมื่อกดปุ่ม
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    ลบ
                </button>
            ),
            center: true,
        },
    ];

    return (
        <>
            <div className="flex flex-col gap-1 mb-2 md:flex-row md:justify-between md:items-center">
                <h1 className='text-2xl font-medium md:text-3xl'>{title}</h1>
                <div className='flex flex-col-reverse gap-3 md:flex-row md:items-center'>
                    <div className='text-end'>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="ค้นหา..."
                            className="border w-40 h-7 p-1 pl-2 border-black rounded outline-yellow-300"
                        />
                    </div>
                    <div className='text-end'>
                        <button
                            onClick={() => setIsAddUserModalOpen(true)}
                            className='p-1 px-2 w-24 font-medium bg-yellow-300 rounded-md hover:bg-yellow-500 hover:text-white'
                        >
                            เพิ่มผู้ใช้
                        </button>
                    </div>
                </div>

            </div>

            <div>
                <CustomDataTable
                    data={filteredData}
                    columns={columns}
                />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-2">จัดการบทบาทผู้ใช้</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                <select onChange={(e) => setRole(e.target.value)}>
                                    <option value="admin" selected disabled>จัดการบทบาทผู้ใช้</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                    <option value="student">Student</option>
                                </select>
                            </label>
                            <div className="mt-4 space-x-2 text-end">
                                <button
                                    type="submit"
                                    className="bg-yellow-300 text-white px-4 py-2 rounded hover:bg-yellow-500 ml-2"
                                    disabled={isPending}
                                >
                                    จัดการ
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                                >
                                    ปิด
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isAddUserModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4 text-center">เพิ่มผู้ใช้</h2>
                        <form onSubmit={handleAddUser}>
                            <div className="space-y-4">
                                {/* ชื่อผู้ใช้ */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">ชื่อผู้ใช้</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setname(e.target.value)}
                                        className="w-full p-2 border rounded focus:outline-yellow-300"
                                        required
                                    />
                                </div>

                                {/* อีเมล */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">อีเมล</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-2 border rounded focus:outline-yellow-300"
                                        required
                                    />
                                </div>

                                {/* รหัสผ่าน */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">รหัสผ่าน</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full p-2 border rounded focus:outline-yellow-300"
                                        required
                                    />
                                </div>

                                {/* บทบาท */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">บทบาท</label>
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="w-full p-2 border rounded focus:outline-yellow-300"
                                        required
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                        <option value="student">Student</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6 space-x-2 text-end">
                                <button
                                    type="submit"
                                    className="bg-yellow-300 px-4 py-2 rounded hover:bg-yellow-500 disabled:bg-gray-300"
                                    disabled={userPending}
                                >
                                    {userPending ? 'กำลังดำเนินการ...' : 'เพิ่มผู้ใช้'}
                                </button>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                                >
                                    ปิด
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserTable
