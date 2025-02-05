import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../../context/AuthContext'
import { getCategories } from "../../../hook/useCategory"

function GameInformation({ platform, category, Link_Color, Text_Color }) {

    const { user } = useAuthContext()
    const { Categoriesdata } = getCategories()

    return (
        <div className='w-full' style={{ color: Text_Color || '#000000' }}>
            <h1 className='font-semibold text-xl'>ข้อมูลเกม</h1>
            <table>
                <tbody>
                    <tr>
                        <td className='text-end pr-2 font-medium'>ผู้สร้าง</td>
                        <td className='underline'>{user?.name}</td>
                    </tr>
                    <tr>
                        <td className='text-end pr-2 font-medium'>สร้างเมื่อ</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td className='text-end pr-2 font-medium'>อัพเดตเมื่อ</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td className='text-end pr-2 font-medium'>คะแนนรีวิว</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td className='text-end pr-2 font-medium'>แพลตฟอร์ม</td>
                        <td className='underline' style={{ color: Link_Color || '#73d9fc' }}>
                            {platform.length > 0 ? platform.map((value, index) => (
                                <span  key={index} >
                                    {value}
                                    {index < platform.length - 1 && ', '}
                                </span>
                            )) : "Web"}
                        </td>
                    </tr>
                    <tr>
                        <td className='text-end pr-2 font-medium'>หมวดหมู่</td>
                        <td className='underline' style={{ color: Link_Color || '#73d9fc' }}>
                            {category.length > 0 ? category.map((id, index, array) => {
                                const categories = Categoriesdata.find(
                                    (category) => String(category.id) === String(id)
                                );
                                return categories && (
                                    <span key={index}>
                                        {categories.name} {/* เข้าถึงเฉพาะ name */}
                                        {index < array.length - 1 && ', '} {/* เพิ่มเครื่องหมายคั่น , */}
                                    </span>
                                );
                            }) : "-"}
                        </td>

                    </tr>
                </tbody>
            </table>
        </div >
    )
}

export default GameInformation
