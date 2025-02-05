import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom'
import 'swiper/css';
import 'swiper/css/navigation';
import CardGame from '../CardGame';





export default function Slider({ caption, data, nextName, prevName  , error }) {

    const [isAtStart, setIsAtStart] = useState(true)
    const [isAtEnd, setIsAtEnd] = useState(false)

    const handleSlideChange = (swiper) => {
        setIsAtStart(swiper.isBeginning)  // ตรวจสอบว่าอยู่ที่จุดเริ่มต้น
        setIsAtEnd(swiper.isEnd)          // ตรวจสอบว่าอยู่ที่จุดสิ้นสุด
    }

    if (error) {
        return <div>Error: {error.message}</div>;  // แสดงข้อความข้อผิดพลาดถ้ามี
    }

    return (

        <div className='flex flex-col gap-4 mx-auto px-6 container'>



            <div className='flex justify-between mt-7'>

                <h1 className='font-semibold text-2xl'>{caption}</h1>

                <div className='flex gap-2 fill-white'>
                    <button className={`flex items-center justify-center p-1 bg-yellow-300 rounded-md duration-150  ${prevName} ${isAtStart ? 'opacity-50 cursor-not-allowed' : 'hover:bg-transparent hover:fill-black hover:ring-2 hover:ring-yellow-300'}`} >
                        <box-icon name='chevron-left'></box-icon>
                    </button>
                    <button className={`flex items-center justify-center p-1 bg-yellow-300 rounded-md duration-150 ${nextName} ${isAtEnd ? 'opacity-50 cursor-not-allowed' : 'hover:bg-transparent hover:fill-black hover:ring-2 hover:ring-yellow-300'}`}>
                        <box-icon name='chevron-right' ></box-icon>
                    </button>
                </div>

            </div>


            <div >
                <Swiper
                    className='mySwiper rounded-md'
                    spaceBetween={20} slidesPerView={5} slidesPerGroup={5}
                    onSlideChange={handleSlideChange}
                    navigation={{
                        nextEl: `.${nextName}`,
                        prevEl: `.${prevName}`,
                    }}
                    speed={700}
                    modules={[Navigation]}
                    breakpoints={{
                        1024: { slidesPerView: 5, slidesPerGroup: 5 },
                        640: { slidesPerView: 4, slidesPerGroup: 4 },
                        0: { slidesPerView: 2, slidesPerGroup: 2 },
                    }}
                >
                    {data?.map((data) => (
                        <SwiperSlide key={data.id}>
                            <CardGame data={data}/>
                        </SwiperSlide>

                    ))}

                </Swiper>
            </div>

        </div>
    )
}
