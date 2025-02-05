import React, { useState } from 'react'
import CustomDataTable from './CustomDataTable'
import { useCreateCategory, useDeleteCategory, useUpdateCategory } from '../../../hook/useCategory'

function CategoriesTable({ data, title }) {

    const { mutateAsync, isPending } = useCreateCategory()
    const { mutateAsync: DeleteCategory, isPending: DeleteCategoryPending } = useDeleteCategory()
    const { mutateAsync: UpdateCategory, isPending: UpdateCategoryPending } = useUpdateCategory()

    const [searchQuery, setSearchQuery] = useState('')

    const [isAddCategoryModel, setIsAddCategoryModel] = useState(false)
    const [isUpdateCategoryModel, setIsUpdateCategoryModel] = useState(false)

    const [name, setName] = useState('')
    const [catrgoryId, setCatrgoryId] = useState(null)
    const [updateCatrgoryname, setUpdateCatrgoryName] = useState('')


    const handleCatrgory = (userId) => {
        setCatrgoryId(userId) // ตั้งค่า id ของผู้ใช้ที่เลือก
        setIsUpdateCategoryModel(true)
    }

    const handleCatrgorySubmit = async (e) => {
        e.preventDefault();
        try {
            await mutateAsync(name)
            closeModal()
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateCatrgorySubmin = async (e) => {
        e.preventDefault()
        try {
            await UpdateCategory({ name: updateCatrgoryname, id: catrgoryId })
            closeModal()
        } catch (error) {
            console.log(error);

        }
    }

    const closeModal = () => {
        setIsAddCategoryModel(false)
        setIsUpdateCategoryModel(false)
    }



    const handleDeleteCategory = async (id) => {
        try {
            await DeleteCategory(id)
        } catch (error) {
            console.log(error)
        }
    }

    const filteredData = data?.filter(row => {
        return (
            new Date(row.created_at).toLocaleString('th-Th', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }).toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            name: <span className="text-lg font-medium">วันที่เพิ่มหมวดหมู่</span>,
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
            name: <span className="text-lg font-medium">แก้ไขหมวดหมู่</span>,
            cell: row => (
                <button
                    onClick={() => handleCatrgory(row.id)} // ฟังก์ชันที่ใช้เมื่อกดปุ่ม
                    className="bg-yellow-300 font-medium px-4 py-2 rounded hover:bg-yellow-500 hover:text-white"
                >
                    แก้ไข
                </button>
            ),
            center: true,
        },
        {
            name: <span className="text-lg font-medium">ลบหมวดหมู่</span>,
            cell: row => (
                <button
                    onClick={() => handleDeleteCategory(row.id)} // ฟังก์ชันที่ใช้เมื่อกดปุ่ม
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
                            onClick={() => setIsAddCategoryModel(true)}
                            className='p-1 px-2 w-28 font-medium bg-yellow-300 rounded-md hover:bg-yellow-500 hover:text-white'
                        >
                            เพิ่มหมวดหมู่
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

            {isAddCategoryModel && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4 text-center">เพิ่มหมวดหมู่</h2>
                        <form onSubmit={handleCatrgorySubmit}>
                            <div className="space-y-4">
                                {/* ชื่อผู้ใช้ */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">ชื่อหมวดหมู่</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full p-2 border rounded focus:outline-yellow-300"
                                        required
                                    />
                                </div>

                            </div>

                            <div className="mt-6 space-x-2 text-end">
                                <button
                                    type="submit"
                                    className="bg-yellow-300 px-4 py-2 rounded hover:bg-yellow-500 disabled:bg-gray-300"
                                >
                                    เพิ่มหมวดหมู่
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

            {isUpdateCategoryModel && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4 text-center">แก้ไขหมวดหมู่</h2>
                        <form onSubmit={handleUpdateCatrgorySubmin}>
                            <div className="space-y-4">
                                {/* ชื่อผู้ใช้ */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">ชื่อหมวดหมู่</label>
                                    <input
                                        type="text"
                                        value={updateCatrgoryname}
                                        onChange={(e) => setUpdateCatrgoryName(e.target.value)}
                                        className="w-full p-2 border rounded focus:outline-yellow-300"
                                        required
                                    />
                                </div>

                            </div>

                            <div className="mt-6 space-x-2 text-end">
                                <button
                                    type="submit"
                                    className="bg-yellow-300 px-4 py-2 rounded hover:bg-yellow-500 disabled:bg-gray-300"
                                >
                                    แก้ไขหมวดหมู่
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

export default CategoriesTable
