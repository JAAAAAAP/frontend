import React from 'react'
import { useDashboardstat } from '../../hook/useDashboard'
import LogTable from '../../component/_DashBoard/DataTable/LogTable'
function Dashboard() {

  const { statdata, error } = useDashboardstat()

  const visitcount = statdata?.totalVisits?.original?.data

  console.log('====================================');
  console.log(statdata);
  console.log('====================================');


  return (
    <div className='mt-5 mx-10'>
      <h1 className='text-3xl font-medium'>ภาพรวม</h1>

      <div className='grid grid-cols-1 mt-6 gap-5 lg:grid-cols-3'>

        <div className='flex flex-col items-center justify-evenly gap-6 bg-white shadow-xl rounded-md py-5 h-auto xl:flex-row xl:h-28'>

          <box-icon name='joystick' size="lg" style={{ height: '70px', width: '70px' }} />

          <div className='flex flex-col justify-start'>
            <h1 className=''>เกมทั้งหมด</h1>
            <span className='text-2xl font-medium text-center'>{statdata?.totalGame}</span>
          </div>

          <div className='flex flex-col justify-start'>
            <h1>เกมเดือนนี้</h1>
            <span className='text-2xl font-medium text-center text-wrap'>+{statdata?.gameInMonth}</span>
          </div>

        </div>

        <div className='flex flex-col items-center justify-evenly gap-6 bg-white shadow-xl rounded-md py-5 h-auto xl:flex-row xl:h-28'>

          <box-icon name='show-alt' size="lg" style={{ height: '70px', width: '70px' }} ></box-icon>

          <div className='flex flex-col justify-start'>
            <h1>คนเข้าชมทั้งหมด</h1>
            <span className='text-2xl font-medium text-center'>{visitcount?.totalVisits}</span>
          </div>

          <div className='flex flex-col justify-start'>
            <h1>คนเข้าชมวันนี้</h1>
            <span className='text-2xl font-medium text-center text-wrap'>+{visitcount?.todayVisits}</span>
          </div>

        </div>

        <div className='flex flex-col items-center justify-evenly gap-6 bg-white shadow-xl rounded-md py-5 h-auto xl:flex-row xl:h-28'>
          <box-icon name='category-alt' size="lg" style={{ height: '70px', width: '70px' }} ></box-icon>

          <div className='flex flex-col justify-start'>
            <h1>หมวดหมู่ทั้งหมด</h1>
            <span className='text-2xl font-medium text-center'>{statdata?.totalCategories}</span>
          </div>

        </div>



      </div>

      <div className='grid grid-cols-1 gap-5 mt-10 lg:grid-cols-2'>

        <div className='border-2 p-2 rounded-md bg-white'>
          <LogTable
            data={statdata?.authLog}
            title={"รายงานการเข้าสู่ระบบของผู้ใช้"}
          />
        </div>

        <div className='border-2 p-2 rounded-md bg-white'>
          <LogTable
            data={statdata?.reviewsLog}
            title={"รายงานการแสดงความคิดเห็นของผู้ใช้"}
          />
        </div>
        <div className='border-2 p-2 rounded-md bg-white'>
          <LogTable
            data={statdata?.gamelog}
            title={"รายงานการเพิ่มเกม"}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
