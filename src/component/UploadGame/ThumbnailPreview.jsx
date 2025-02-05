import React, { useState } from 'react'

import { useUploadGameContext } from '../../context/UploadGameContext'
import { getCategories } from '../../hook/useCategory'

import SkeletonLoading from '../Loading/SkeletonLoading'
import Images from '../Images'
import CropImage from '../CropImage';

function ThumbnailPreview() {
  const { Gamedata, updateGamedata } = useUploadGameContext()
  const { Categoriesdata } = getCategories()

  const [showCrop, setShowCrop] = useState(false)

  const handleSaveCroppedImage = (croppedImage) => {
    updateGamedata((prev) => ({
      ...prev,
      logo: [new File([croppedImage], Gamedata.logo[0].name, { type: Gamedata.logo[0].type })],
    }));
    setShowCrop(false);
  };


  return (
    <div className='flex flex-col items-center gap-5 mt-5'>
      <span className='text-xl font-medium'>ตัวอย่างการแสดงผลหน้าปกเกม</span>

      <div className='flex justify-center w-full'>
        <div className='rounded-t-md overflow-hidden w-[300px]'>
          {Gamedata?.logo && Gamedata.logo[0] instanceof File ? (
            <>
              {showCrop ? (
                <CropImage
                  image={URL.createObjectURL(Gamedata.logo[0])}
                  onSave={handleSaveCroppedImage}
                  onCancel={() => setShowCrop(false)}
                  height={300}
                />
              ) : (
                <div className='cursor-pointer' onClick={() => setShowCrop(true)}>
                  <Images img={{
                    src: URL.createObjectURL(Gamedata.logo[0]),
                    width: "100%",
                    height: "300px"
                  }}
                  />
                </div>
              )}
            </>
          ) : (
            <SkeletonLoading width={300} height={300} />
          )}

          <div className='flex flex-col my-2'>
            <div className='flex justify-between items-start gap-1'>
              <h2 className='font-medium text-[14px] text-pretty max-w-52 break-words line-clamp-2 hover:underline lg:text-base'>
                {Gamedata?.title || <SkeletonLoading width={100} height={24} rounded="sm" />}
              </h2>

              {Gamedata?.play_type ? (
                <div className='text-[12px] rounded-md text-center bg-slate-200 py-[2px] px-[5px] lg:py-1 lg:px-2 lg:text-xs' alt="">
                  {Gamedata?.play_type}
                </div>
              ) : (
                <SkeletonLoading width={75} height={24} rounded="sm" />
              )}

            </div>

            <div className='flex flex-wrap'>
              {Gamedata?.category_id?.length === 0 ? (
                <div className='mt-1'>
                  <SkeletonLoading width="112" height="12" rounded="sm" />
                </div>
              ) : (
                Gamedata?.category_id?.map((id, index, array) => {
                  const category = Categoriesdata.find((category) => String(category.id) === String(id));
                  return category && (
                    <span key={id} className='text-yellow-400 text-[12px] hover:text-yellow-600 lg:text-sm'>
                      {category.name}
                      {index !== array.length - 1 && ','}
                    </span>
                  )
                })
              )}
            </div>


            <span className='w-full break-words line-clamp-3 text-xs'>
              {Gamedata?.content && Gamedata.content.replace(/<[^>]+>/g, '')}
            </span>

          </div>
        </div>
      </div>


    </div>
  )
}

export default ThumbnailPreview
