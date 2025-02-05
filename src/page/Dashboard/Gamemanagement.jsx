import React from 'react'

function Gamemanagement() {
    return (
        <div className='mt-6 mx-10'>
            <h1 className='text-3xl font-medium'>ภาพรวม</h1>
            <div className='grid grid-cols-1 mt-6 gap-5 lg:grid-cols-3'>

                <div className='flex flex-col items-center justify-evenly gap-6 bg-white shadow-xl rounded-md py-5 h-auto xl:flex-row xl:h-28'>

                    <box-icon name='joystick' size="lg" style={{ height: '70px', width: '70px' }} />

                    <div className='flex flex-col justify-start'>
                        <h1 className=''>เกมทั้งหมด</h1>
                        <span className='text-2xl font-medium text-center'></span>
                    </div>

                </div>

                <div className='flex flex-col items-center justify-evenly gap-6 bg-white shadow-xl rounded-md py-5 h-auto xl:flex-row xl:h-28'>
                    <box-icon name='joystick' size="lg" style={{ height: '70px', width: '70px' }} />

                    <div className='flex flex-col justify-start'>
                        <h1>เกมวันนี้</h1>
                        <span className='text-2xl font-medium text-center'></span>
                    </div>

                </div>

                <div className='flex flex-col items-center justify-evenly gap-6 bg-white shadow-xl rounded-md py-5 h-auto xl:flex-row xl:h-28'>

                    <box-icon name='joystick' size="lg" style={{ height: '70px', width: '70px' }} />

                    <div className='flex flex-col justify-start'>
                        <h1>เกมเดือนนี้</h1>
                        <span className='text-2xl font-medium text-center'></span>
                    </div>

                </div>



            </div>

            <div className='grid grid-cols-1 mt-5'>

            </div>
        </div>
    )
}

export default Gamemanagement
