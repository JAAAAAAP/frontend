import React, { useState } from 'react'
import CustomDataTable from './CustomDataTable';

function LogTable({ data, title }) {

    const [searchQuery, setSearchQuery] = useState('');

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
            row.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.activity.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const columns = [
        {
            name: <span className="text-lg font-medium">ID</span>,
            selector: row => row.id,
            sortable: true,
            width: '60px'
        },
        // {
        //     name: <span className="text-lg font-medium">ประเภท</span>,
        //     selector: row => row.log_type,
        //     center: true,
        //     width: '100px'
        // },
        {
            name: <span className="text-lg font-medium">วันเวลา</span>,
            selector: row => new Date(row.created_at).toLocaleString('th-Th', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }),
            sortable: true,
            center: true,
            width: '150px'
        },
        {
            name: <span className="text-lg font-medium">ผู้ใช้</span>,
            selector: row => row.user,
            sortable: true,
            center: true,
            width: '250px'
        },
        {
            name: <span className="text-lg font-medium">การกระทำ</span>,
            selector: row => row.activity,
            sortable: true,
            center: true,
            width: '150px'
        },
        {
            name: <span className="text-lg font-medium">รายละเอียด</span>,
            selector: row => row.detail,
            wrap: true,
            width: '300px',
            center: true
        },
    ];

    return (
        <>
            <div className="flex flex-col gap-1 mb-2 md:flex-row md:justify-between md:items-center">
                <h1 className='text-sm font-medium md:text-xl'>{title}</h1>
                <div className='text-end'>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ค้นหา..."
                        className="border w-40 h-7 p-1 pl-2 border-black rounded outline-yellow-300"
                    />
                </div>
            </div>

            <div>
                <CustomDataTable
                    data={filteredData}
                    columns={columns}
                />
            </div>
        </>
    )
}

export default LogTable;
