import React from 'react'
import { Link } from 'react-router-dom'

function GameInformation({ data, Link_Color, Text_Color }) {


    return (
        <div className='w-full' style={{ color: Text_Color || '#000000' }}>
            <h1 className='font-semibold text-xl'>ข้อมูลเกม</h1>
            <table>
                <tbody>
                    <tr>
                        <td className='text-end pr-2 font-medium'>ผู้สร้าง</td>
                        <Link className='underline'>{data.username}</Link>
                    </tr>
                    <tr>
                        <td className='text-end pr-2 font-medium'>สร้างเมื่อ</td>
                        <td>
                            {new Date(data.created_at).toLocaleDateString("th-TH", {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </td>
                    </tr>
                    <tr>
                        <td className='text-end pr-2 font-medium'>อัพเดตเมื่อ</td>
                        <td>
                            {new Date(data.updated_at).toLocaleDateString("th-TH", {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </td>
                    </tr>
                    <tr>
                        <td className='text-end pr-2 font-medium'>คะแนนรีวิว</td>
                        <td>{data.rating}</td>
                    </tr>
                    <tr>
                        <td className='text-end pr-2 font-medium'>แพลตฟอร์ม</td>
                        {data?.platform?.length > 0 ? data.platform.map((value, index, array) => {
                            const isLastItem = index === array.length - 1
                            return (
                                <Link to={`/games/Name/A-Z/platforms/${value}/page/1`} key={index} className='underline' style={{ color: Link_Color || '#73d9fc' }}>
                                    {isLastItem ? `#${value}` : `#${value}, `}
                                </Link>
                            )
                        }) : (
                            <Link to={`/games/Name/A-Z/play_type/Web/page/1`} className='underline' style={{ color: Link_Color || '#73d9fc' }}>Web</Link>
                        )}
                    </tr>
                    <tr>
                        <td className='text-end pr-2 font-medium'>หมวดหมู่</td>
                        {data?.categories?.length > 0 ? data.categories.map((value, index, array) => {
                            const isLastItem = index === array.length - 1
                            return (
                                <Link to={`/games/Name/A-Z/categories/${value.name}/page/1`} key={index} className='underline' style={{ color: Link_Color || '#73d9fc' }}>
                                    {isLastItem ? `#${value.name}` : `#${value.name}, `}
                                </Link>
                            )
                        }) : (
                            <td>ไม่พบข้อมูล</td>
                        )}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default GameInformation
