import React from 'react'
import { useUploadGameContext } from '../../../context/UploadGameContext'
import Content from './Content'
import Galleries from './Galleries'
import GameInformation from './GameInformation'
import Comment from './Comment'

function PreviewGame() {
  const { Gamedata } = useUploadGameContext()

  function hexToRgba(hex, opacity) {
    // ลบ # ออกจาก Hex
    const sanitizedHex = hex.replace('#', '');

    // แยกสี R, G, B
    const r = parseInt(sanitizedHex.substring(0, 2), 16);
    const g = parseInt(sanitizedHex.substring(2, 4), 16);
    const b = parseInt(sanitizedHex.substring(4, 6), 16);

    // คืนค่ารูปแบบ RGBA
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  return (
    <div className='mt-10'>

      <div className="flex justify-center items-center mx-40 mb-5">
        <h1 className="mr-2 font-medium text-xl text-nowrap">ตัวอย่างการแสดงผลแบบเต็ม</h1>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {Gamedata && (
        <div
          className='bg-cover bg-center'
          style={{
            backgroundImage: Gamedata?.background && Gamedata.background.length > 0
              ? `url(${URL.createObjectURL(Gamedata.background[0])})`
              : '',
            backgroundColor: Gamedata?.Bg_color || '#f5f5f5',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
          }}
        >

          <div className='flex flex-col items-center w-full '>
            <div
              className='w-full md:w-4/5 px-3 pt-5 '
              style={{
                backgroundColor: hexToRgba(
                  Gamedata.Bg_2_Color || '#FFFFFF', // สี Hex
                  (Gamedata.Background_opacity ?? 100) / 100 // แปลงค่า 0-100 เป็น 0.0-1.0
                ),
              }}
            >
              {Gamedata?.play_type === "web" && (
                <div className='w-full h-[300px] md:h-[400px] lg:h-[490px] xl:h-[600px] bg-black'>
                  <iframe src={""} frameborder="0" className='w-full'></iframe>
                </div>
              )}

              <div className='flex flex-col-reverse lg:grid lg:grid-cols-3 gap-5 mt-5'>

                <div className='col-span-2 break-words'>
                  <Content
                    Gamecontent={Gamedata.content}
                    Link_Color={Gamedata.Link_Color}
                    Text_Color={Gamedata.Text_Color}
                  />

                  <GameInformation
                    platform={Gamedata.canplay}
                    category={Gamedata.category_id}
                    Link_Color={Gamedata.Link_Color}
                    Text_Color={Gamedata.Text_Color}
                  />

                  <Comment />

                </div>

                <Galleries ImgGalleries={Gamedata.galleries} />

              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default PreviewGame
