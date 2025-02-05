import React from 'react'
import BannerImg from '../assets/Img/BannerImg.png'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import Images from './Images'


import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import { Autoplay } from 'swiper/modules';

export default function Banner() {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >

        <SwiperSlide>
          <div
            className='flex flex-col absolute text-white gap-1 translate-x-4 translate-y-6 
        2xl:translate-y-44 
        xl:translate-y-28 xl:translate-x-10
        lg:translate-y-16 lg:gap-4
        md:translate-y-12 md:gap-2 md:translate-x-6'
          >

            <span
              className='font-semibold tracking-widest text-sm leading-4
          2xl:text-6xl 2xl:leading-[4rem] 
          xl:text-5xl xl:leading-[3.5rem] 
          lg:text-4xl
          md:text-3xl md:leading-[2.3rem]'
            >
              แหล่งรวมผลงานเกม<br></br>ของนักศึกษาอาชีวลำปาง
            </span>

            <p
              className='tracking-wider text-[10px] w-60
          2xl:text-2xl 2xl:w-[630px] 
          xl:w-[530px] xl:text-xl 
          lg:w-[400px] lg:text-base
          md:w-[350px] md:text-sm'
            >
              พื้นที่รวบรวมผลงานเกมสร้างสรรค์และนวัตกรรมจากนักศึกษาที่สะท้อนจินตนาการ ความคิดสร้างสรรค์ และทักษะที่พัฒนาในระหว่างการเรียน
            </p>

            <button
              className='bg-yellow-300 text-black rounded-full w-16  text-xs 
          xl:p-2 xl:w-44 xl:text-2xl
          lg:w-32 lg:text-xl
          md:text-base md:w-28 md:p-1
          hover:ring-2  hover:ring-yellow-300  hover:bg-inherit hover:text-white hover:duration-150 '
            >
              <Link to="/games">ดูผลงาน</Link>
            </button>
          </div>
          
          <img src={BannerImg} className='w-full h-auto object-cover' alt="BannerImg" loading='lazy' />
        </SwiperSlide>


      </Swiper>
    </div>
  )
}
