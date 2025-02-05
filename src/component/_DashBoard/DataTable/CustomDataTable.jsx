import React from 'react'
import DataTable from 'react-data-table-component'

function CustomDataTable({ data, columns, title }) {

    return (
        <div className="overflow-x-auto rounded-md">
            <DataTable
                title={title}
                columns={columns}
                data={data}
                pagination
                paginationPerPage={15}  // กำหนดให้แสดงผล 20 รายการต่อหน้า
                paginationComponentOptions={{
                    noRowsPerPage: true, // ซ่อนตัวเลือก rows per page
                    rangeSeparatorText: 'จาก', // เปลี่ยนข้อความของ separator เช่น "1-10 จาก 100"
                }}
                noDataComponent={<div>ไม่พบข้อมูล</div>}
                responsive
            />
        </div>
    )
}

export default CustomDataTable
