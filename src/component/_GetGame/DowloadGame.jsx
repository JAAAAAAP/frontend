import React from 'react'
import { useDownloadGameCount } from '../../hook/useGame'

function DowloadGame({ data, Text_Color, Button_Color }) {
    const { mutateAsync, isPending } = useDownloadGameCount()
    const fileGame = data.file
    const Gamename = data.gamename.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

    const handleDownloadGameCount = async (id) => {
        try {
            await mutateAsync(id)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex items-center mt-4" style={{ color: Text_Color || '#000000' }}>
            {fileGame ? (
                <div className='flex flex-col gap-4 w-full'>
                    <h1 className='font-semibold text-xl'>ดาวน์โหลด</h1>
                    <div className='flex flex-col gap-3 '>
                        {fileGame.Android && (
                            <div className='flex flex-col justify-center gap-1 lg:flex-row lg:items-center lg:justify-start'>
                                <a
                                    href={fileGame.Android.url}
                                    download
                                    className="py-2 px-5 rounded-md text-center"
                                    style={{ backgroundColor: Button_Color || '#fde047' }}
                                    onClick={() => handleDownloadGameCount(data.id)}
                                >
                                    ดาวน์โหลด
                                </a>
                                <div className='flex items-center gap-2 text-lg font-medium break-words md:max-w-sm lg:max-w-xl' style={{ fill: Text_Color || '#000000' }}>
                                    <span className='line-clamp-1'>{Gamename} (Android) </span>
                                    <span className='text-nowrap'>{fileGame.Android.size} MB</span>
                                    <div className='flex'>
                                        <box-icon type='logo' name='android'></box-icon>
                                    </div>
                                </div>
                            </div>
                        )}

                        {fileGame.Ios && (
                            <div className='flex flex-col justify-center gap-1 lg:flex-row lg:items-center lg:justify-start'>
                                <a
                                    href={fileGame.Ios.url}
                                    download
                                    className="py-2 px-5 rounded-md text-center"
                                    style={{ backgroundColor: Button_Color || '#fde047' }}
                                    onClick={() => handleDownloadGameCount(data.id)}
                                >
                                    ดาวน์โหลด
                                </a>
                                <div className='flex items-center gap-2 text-lg font-medium break-words md:max-w-sm lg:max-w-xl' style={{ fill: Text_Color || '#000000' }}>
                                    <span className='line-clamp-1'>{Gamename} (Ios) </span>
                                    <span className='text-nowrap'>{fileGame.Ios.size} MB</span>
                                    <div className='flex'>
                                        <box-icon type='logo' name='apple'></box-icon>
                                    </div>
                                </div>
                            </div>
                        )}

                        {fileGame.Window && (
                            <div className='flex flex-col justify-center gap-1 lg:flex-row lg:items-center lg:justify-start'>
                                <a
                                    href={fileGame.Window.url}
                                    download
                                    className="py-2 px-5 rounded-md text-center"
                                    style={{ backgroundColor: Button_Color || '#fde047' }}
                                    onClick={() => handleDownloadGameCount(data.id)}
                                >
                                    ดาวน์โหลด
                                </a>
                                <div className='flex items-center gap-2 text-lg font-medium break-words md:max-w-sm lg:max-w-xl' style={{ fill: Text_Color || '#000000' }}>
                                    <span className='line-clamp-1'>{Gamename} (Window) </span>
                                    <span className='text-nowrap'>{fileGame.Window.size} MB</span>
                                    <div className='flex'>
                                        <box-icon type='logo' name='windows'></box-icon>
                                    </div>
                                </div>
                            </div>
                        )}

                        {fileGame.Mac && (
                            <div className='flex flex-col justify-center gap-1 lg:flex-row lg:items-center lg:justify-start'>
                                <a
                                    href={fileGame.Mac.url}
                                    download
                                    className="py-2 px-5 rounded-md text-center"
                                    style={{ backgroundColor: Button_Color || '#fde047' }}
                                    onClick={() => handleDownloadGameCount(data.id)}
                                >
                                    ดาวน์โหลด
                                </a>
                                <div className='flex items-center gap-2 text-lg font-medium break-words md:max-w-sm lg:max-w-xl' style={{ fill: Text_Color || '#000000' }}>
                                    <span className='line-clamp-1'>{Gamename} (Mac) </span>
                                    <span className='text-nowrap'>{fileGame.Mac.size} MB</span>
                                    <div className='flex'>
                                        <box-icon type='logo' name='apple'></box-icon>
                                    </div>
                                </div>
                            </div>
                        )}

                        {fileGame.Linux && (
                            <div className='flex flex-col justify-center gap-1 lg:flex-row lg:items-center lg:justify-start'>
                                <a
                                    href={fileGame.Linux.url}
                                    download
                                    className="py-2 px-5 rounded-md text-center"
                                    style={{ backgroundColor: Button_Color || '#fde047' }}
                                    onClick={() => handleDownloadGameCount(data.id)}
                                >
                                    ดาวน์โหลด
                                </a>
                                <div className='flex items-center gap-2 text-lg font-medium break-words md:max-w-sm lg:max-w-xl' style={{ fill: Text_Color || '#000000' }}>
                                    <span className='line-clamp-1'>{Gamename} (Linux) </span>
                                    <span className='text-nowrap'>{fileGame.Linux.size} MB</span>
                                    <div className='flex'>
                                        <box-icon type="logo" name="tux"></box-icon>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-gray-500">ไม่มีไฟล์สำหรับดาวน์โหลด</p>
            )}
        </div>
    )
}

export default DowloadGame
