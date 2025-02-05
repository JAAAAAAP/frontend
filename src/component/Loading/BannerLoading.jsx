import React from 'react'

export default function BannerLoading() {
    return (
        <div className='w-full h-[149px] bg-gray-300 animate-pulse md:h-[306px] xl:h-[575px]'>
            <div className='flex flex-col absolute gap-1 translate-x-4 translate-y-6  
            xl:translate-y-28 xl:translate-x-10
            lg:translate-y-16 lg:gap-4
            md:translate-y-12 md:gap-2 md:translate-x-6'
            >
                <span className='font-semibold w-48 h-8 bg-gray-400 rounded md:w-80 md:h-12 xl:w-[700px] xl:h-32'/>
                <span className='font-semibold w-60 h-4 bg-gray-400 rounded md:w-60 xl:w-[630px] xl:h-8' />
                <span className='font-semibold w-60 h-4 bg-gray-400 rounded md:w-60 xl:w-[630px] xl:h-8'/>
                <span className='font-semibold w-60 h-4 bg-gray-400 rounded md:w-60 xl:w-[630px] xl:h-8'/>
                <span className='font-semibold w-16 h-4 bg-gray-400 rounded-2xl md:w-28 md:h-8 xl:w-44 xl:h-12'/>
            </div>

        </div>
    )
}
