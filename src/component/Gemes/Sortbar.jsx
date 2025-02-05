import React from 'react'

export default function Sortbar({ sortBy, sortOrder, handleSort }) {
    return (
        <div className='flex flex-wrap items-center gap-5 text-lg'>
            <h1 className='text-xl font-medium'>เรียง</h1>

            <button
                className={`flex items-center text-center ${sortBy === 'Name' ? 'fill-yellow-400 text-yellow-400' : ''}`}
                onClick={() => handleSort('Name', sortOrder === 'A-Z' ? 'Z-A' : 'A-Z')}
            >
                <box-icon name={`${sortOrder == 'A-Z' ? 'sort-a-z' : 'sort-z-a'}`}></box-icon>
                <span>ชื่อ</span>
            </button>

            <button
                className={`flex items-center text-center ${sortBy === 'Download' ? 'fill-yellow-400 text-yellow-400' : ''}`}
                onClick={() => handleSort('Download', sortOrder === 'Most-Downloads' ? 'Least-Downloads' : 'Most-Downloads')}
            >
                <box-icon name={`${sortOrder == 'Most-Downloads' ? 'sort-down' : 'sort-up'}`}></box-icon>
                <span>ยอดดาวน์โหลด</span>
            </button>

            <button
                className={`flex items-center text-center ${sortBy === 'Likes' ? 'fill-yellow-400 text-yellow-400' : ''}`}
                onClick={() => handleSort('Likes', sortOrder === 'Most-Likes' ? 'Least-Likes' : 'Most-Likes')}
            >
                <box-icon name={`${sortOrder == 'Most-Likes' ? 'sort-down' : 'sort-up'}`}></box-icon>
                <span>การถูกใจ</span>
            </button>

            <button
                className={`flex items-center text-center ${sortBy === 'Date' ? 'fill-yellow-400 text-yellow-400' : ''}`}
                onClick={() => handleSort('Date', sortOrder === 'Newest' ? 'Oldest' : 'Newest')}
            >
                <box-icon name={`${sortOrder == 'Newest' ? 'sort-down' : 'sort-up'}`}></box-icon>
                <span>วันเวลา</span>
            </button>

            <button
                className={`flex items-center text-center ${sortBy === 'Rating' ? 'fill-yellow-400 text-yellow-400' : ''}`}
                onClick={() => handleSort('Rating', sortOrder === 'Highest-Rating' ? 'Lowest-Rating' : 'Highest-Rating')}
            >
                <box-icon name={`${sortOrder == 'Highest-Rating' ? 'sort-down' : 'sort-up'}`}></box-icon>
                <span>เรตติ้ง</span>
            </button>

        </div>
    )
}
