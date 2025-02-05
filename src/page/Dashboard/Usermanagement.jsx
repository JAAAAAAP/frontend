import React from 'react'
import { useUserStat } from '../../hook/useDashboard'
import UserTable from '../../component/_DashBoard/DataTable/UserTable';

function Usermanagement() {

    const { statdata, error } = useUserStat()
  
    return (
        <div className='mt-6 mx-10'>
            <h1 className='text-3xl font-medium'>ภาพรวม</h1>
            <div className='grid grid-cols-1 mt-6 gap-5 lg:grid-cols-3'>

                <div className='flex flex-col items-center justify-evenly gap-6 bg-white shadow-xl rounded-md py-5 h-auto xl:flex-row xl:h-28'>

                    <box-icon name='user' size="lg" style={{ height: '70px', width: '70px' }} />

                    <div className='flex flex-col justify-start'>
                        <h1 className=''>ผู้ใช้ทั้งหมด</h1>
                        <span className='text-2xl font-medium text-center'>{statdata?.totalUsers}</span>
                    </div>

                </div>

                <div className='flex flex-col items-center justify-evenly gap-6 bg-white shadow-xl rounded-md py-5 h-auto xl:flex-row xl:h-28'>
                    <box-icon name='user-plus' size="lg" style={{ height: '80px', width: '80px' }} ></box-icon>

                    <div className='flex flex-col justify-start'>
                        <h1>ผู้สมัครใช้งานเดือนนี้</h1>
                        <span className='text-2xl font-medium text-center'>{statdata?.usersThisMonth}</span>
                    </div>

                </div>

                <div className='flex flex-col items-center justify-evenly gap-6 bg-white shadow-xl rounded-md py-5 h-auto xl:flex-row xl:h-28'>

                    <box-icon name='user' size="lg" style={{ height: '70px', width: '70px' }} />

                    <div className='flex flex-col justify-start'>
                        <h1>นักเรียนทั้งหมด</h1>
                        <span className='text-2xl font-medium text-center'>{statdata?.totalStudents}</span>
                    </div>

                </div>



            </div>

            <div className='grid grid-cols-1 mt-5'>
                <UserTable
                    data={statdata?.userdata}
                    title={"รายงานผู้ใช้"}
                />
            </div>
        </div>
    )
}

export default Usermanagement
