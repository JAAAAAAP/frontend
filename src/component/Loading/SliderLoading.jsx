import React from 'react'

export default function SliderLoading() {
  
  return (
    <div className='flex flex-col gap-4 mx-auto px-6 container animate-pulse'>
      <div className='flex justify-between mt-7 '>

        <h1 className='w-24 rounded bg-gray-400'></h1>

        <div className='flex gap-2'>
          <button className='w-8 h-8 bg-gray-400 rounded-md ' ></button>
          <button className='w-8 h-8 bg-gray-400 rounded-md '></button>
        </div>

      </div>

      <div className='grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5'>
        
        <div className='flex flex-col gap-1 w-full'>
          <div className='w-full h-64 rounded bg-gray-400'></div>
          
          <div className='flex justify-between mt-1'>

            <div className='bg-gray-400 w-12 h-6 rounded'></div>
            <div className='bg-gray-400 w-8 h-6 rounded'></div>
          
          </div>

          <div className='bg-gray-400 w-28 h-3 rounded'></div>
          <div className='bg-gray-400 w-full h-11 rounded'></div>

        </div>

        <div className='flex flex-col gap-1 w-full'>
          <div className='w-full h-64 rounded bg-gray-400'></div>
          
          <div className='flex justify-between mt-1'>

            <div className='bg-gray-400 w-12 h-6 rounded'></div>
            <div className='bg-gray-400 w-8 h-6 rounded'></div>
          
          </div>

          <div className='bg-gray-400 w-28 h-3 rounded'></div>
          <div className='bg-gray-400 w-full h-11 rounded'></div>

        </div>

        <div className='hidden flex-col gap-1 w-full md:flex'>
          <div className='w-full h-64 rounded bg-gray-400'></div>
          
          <div className='flex justify-between mt-1'>

            <div className='bg-gray-400 w-12 h-6 rounded'></div>
            <div className='bg-gray-400 w-8 h-6 rounded'></div>
          
          </div>

          <div className='bg-gray-400 w-28 h-3 rounded'></div>
          <div className='bg-gray-400 w-full h-11 rounded'></div>

        </div>

        <div className='hidden flex-col gap-1 w-full md:flex'>
          <div className='w-full h-64 rounded bg-gray-400'></div>
          
          <div className='flex justify-between mt-1'>

            <div className='bg-gray-400 w-12 h-6 rounded'></div>
            <div className='bg-gray-400 w-8 h-6 rounded'></div>
          
          </div>

          <div className='bg-gray-400 w-28 h-3 rounded'></div>
          <div className='bg-gray-400 w-full h-11 rounded'></div>

        </div>

        <div className='hidden flex-col gap-1 w-full lg:flex'>
          <div className='w-full h-64 rounded bg-gray-400'></div>
          
          <div className='flex justify-between mt-1'>

            <div className='bg-gray-400 w-12 h-6 rounded'></div>
            <div className='bg-gray-400 w-8 h-6 rounded'></div>
          
          </div>

          <div className='bg-gray-400 w-28 h-3 rounded'></div>
          <div className='bg-gray-400 w-full h-11 rounded'></div>

        </div>
        
      </div>
    </div>
  )
}
