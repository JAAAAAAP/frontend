import React, { useState } from 'react';
import { useUploadGameContext } from '../../../context/UploadGameContext'
import Images from '../../Images';
import CropImage from '../../CropImage';

function Galleries({ ImgGalleries }) {
   
    const { Gamedata, updateGamedata } = useUploadGameContext()
    const [showCrop, setShowCrop] = useState(false)

    return (
        <div className='relative overflow-x-auto'>
            {ImgGalleries?.length > 0 && (
                <div className='flex flex-row gap-1 transition-all duration-300 ease-in-out w-1/2 md:w-1/3 lg:flex-col lg:gap-5 lg:w-full'>
                    {ImgGalleries.map((file, index) => {
                        // ตรวจสอบว่าไฟล์เป็นภาพและมี type ที่ถูกต้อง
                        if (file && file.type && file.type.startsWith("image/")) {
                            return (
                                <div key={index}>
                                    <Images
                                        img={{
                                            src: URL.createObjectURL(file), // สร้าง URL สำหรับไฟล์
                                            width: "100%",
                                            height: "200px"
                                        }}
                                    />
                                </div>
                            );
                        }
                        return null; // ถ้าไม่ใช่ไฟล์รูปภาพ ให้คืนค่า null
                    })}
                </div>
            )}
        </div>
    );
}

export default Galleries;
