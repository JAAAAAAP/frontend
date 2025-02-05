import React, { useState, useEffect, useRef } from 'react'
import QuillEditer from './QuillEditer'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProgressBar from '../ProgressBar'

import { useUploadGameContext } from '../../context/UploadGameContext'
import { getCategories } from '../../hook/useCategory'
import { useUploadGame } from '../../hook/useGame'

function UploadGameform() {
    const { Categoriesdata } = getCategories()
    const { Gamedata, updateGamedata } = useUploadGameContext()
    const [isTooltipVisible, setIsTooltipVisible] = useState(false)
    const { mutate: uploadGame, error, uploadProgress, isPending, cancelUpload } = useUploadGame()

    const fileInputRefs = {
        web: useRef(null),
        logo: useRef(null),
        background: useRef(null),
        galleries: useRef(null),
    };


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        if (name === "play_type") {
            if (value === "web") {
                updateGamedata((prev) => ({
                    ...prev,
                    play_type: value,
                    file: {}, // ล้างไฟล์ทั้งหมด
                    canplay: [], // ล้างแพลตฟอร์มทั้งหมด
                }))
            } else if (value === "download") {
                updateGamedata((prev) => ({
                    ...prev,
                    play_type: value,
                    file: {}, // ล้างไฟล์ แต่เก็บ canplay
                }))
            }
            return // หยุดการทำงานส่วนที่เหลือ
        }

        if (name === "play_type" && value === "download") {
            updateGamedata({
                play_type: value,
                file: {},
            })
        }

        if (type === 'checkbox') {
            if (checked) {
                updateGamedata({ [name]: [...Gamedata[name], value] });
            } else {
                updateGamedata((prev) => {
                    const updatedFile = { ...prev.file };
                    delete updatedFile[value]; // ลบไฟล์ของแพลตฟอร์มที่ถูก uncheck

                    return {
                        ...prev,
                        [name]: prev[name].filter((item) => item !== value), // ลบแพลตฟอร์มออกจาก canplay
                        file: updatedFile, // อัปเดตไฟล์ที่ลบออก
                    };
                });
            }
        } else if (type === 'range') {
            setIsTooltipVisible(true);
            updateGamedata({ [name]: value })
        } else {
            updateGamedata({ [name]: value })
        }

    }

    const handlePlatformFileChange = (e) => {
        const { name, files } = e.target
        const filename = files[0]

        if (filename) {
            updateGamedata({
                file: {
                    [name]: filename,
                },
            })
        }
    }

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const fileArray = Array.from(files);

        // ถ้าไม่มีไฟล์ หรือถูกกดยกเลิก
        if (fileArray.length === 0) {

            // ตรวจสอบว่า fileInputRefs[name] มีอยู่ก่อนใช้ .current
            if (fileInputRefs[name] && fileInputRefs[name].current) {
                fileInputRefs[name].current.value = ""; // รีเซ็ตค่า input file
            }

            updateGamedata({ [name]: null }); // ล้างค่าไฟล์ใน Gamedata
            return;
        }

        updateGamedata({ [name]: fileArray });
    };


    const handleOutsideClick = (e) => {
        setIsTooltipVisible(false)
    }

    const addGame = async (e) => {
        e.preventDefault()
        try {

            if (Gamedata.play_type === "download" && (!Gamedata.canplay || Gamedata.canplay.length === 0)) {
                toast.error("กรุณาเลือกแพลตฟอร์มก่อนบันทึกเกม", {
                    position: 'top-center',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
                return
            }

            uploadGame(Gamedata, {
                onSuccess: () => {
                    toast.success("อัพโหลดเกมสำเร็จ", {
                        position: 'top-center',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    })
                    updateGamedata({
                        title: null,
                        content: null,
                        play_type: null,
                        canplay: [],
                        file: {},
                        category_id: [],

                        logo: null,
                        background: null,
                        galleries: [],

                        Bg_color: null,
                        Bg_2_Color: null,
                        Link_Color: null,
                        Text_Color: null,
                        Button_Color: null,
                        Background_opacity: null,
                    })
                    Object.values(fileInputRefs).forEach((ref) => {
                        if (ref.current) {
                            ref.current.value = null;
                        }
                    })
                },
            });

        } catch (error) {
            console.error(error);
            toast.error('เกิดข้อผิดพลาดบางอย่าง กรุณาลองอีกครั้งหรือติดต่อเจ้าหน้าที่', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)
        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [handlePlatformFileChange])

    return (
        <div>
            {isPending && (
                <div className='flex flex-col justify-center items-center fixed right-0 top-0 z-10 bg-black/70 h-screen w-screen'>
                    <div className='flex flex-col justify-center items-center gap-5 fill-yellow-400 w-72'>
                        <box-icon name='loader' animation='spin' size="lg"></box-icon>
                        <ProgressBar progress={uploadProgress} />
                    </div>
                    <div className='flex justify-between items-center w-72 mt-1'>
                        <span className='text-yellow-300 text-lg'>กำลังอัพโหลดเกม</span>
                        <span className='text-yellow-300 text-lg'>{uploadProgress}%</span>
                    </div>
                    <button
                        onClick={cancelUpload}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        ยกเลิก
                    </button>
                </div>
            )}

            <h1 className='text-center text-2xl font-medium'>UploadGame</h1>

            <form className='flex flex-col gap-4' onSubmit={addGame} enctype="multipart/form-data">
                <div className='flex flex-col'>
                    <div className='flex items-center gap-1'>
                        <label className='text-xl font-medium'>ชื่อเกม</label>
                        <span className='text-red-500 text-sm'>{error?.response?.data?.errors?.title}</span>
                    </div>
                    <input
                        type="text"
                        name='title'
                        value={Gamedata?.title || ''}
                        onChange={handleChange}
                        className='border-2 rounded-sm outline-yellow-400 h-10 pl-2'
                        required
                    />
                </div>

                <div className='flex flex-col'>
                    <div className='flex items-center gap-1'>
                        <label className='text-xl font-medium'>เว็บ/ดาวน์โหลด</label>
                        <span className='text-red-500 text-sm'>{error?.response?.data?.errors?.play_type}</span>
                    </div>
                    <select name="play_type" className='border-2 rounded-sm outline-yellow-400 pl-1 h-10' value={Gamedata?.play_type || ''} onChange={handleChange}>
                        <option disabled value="">เลือกประเภทการเล่น</option>
                        <option value="web">เว็บ</option>
                        <option value="download">ดาวน์โหลด</option>
                    </select>
                </div>

                {Gamedata?.play_type === "web" && (
                    <div className='flex flex-col gap-1'>
                        <div className='flex flex-col justify-between md:flex-row'>
                            <label className="text-xl font-medium ">
                                <h1>อัปโหลดไฟล์สำหรับเว็บ</h1>
                                <span className='font-normal text-base text-gray-500'> (รองรับ Godot,Unity,JavascriptGame)</span>
                            </label>
                            {/* <Link>
                                <div className='flex items-center text-sky-300 fill-sky-300'>
                                    <box-icon name='info-circle'></box-icon>
                                    <span>วิธีอัพโหลดเกมขึ้นเว็บ</span>
                                </div>
                            </Link> */}
                        </div>
                        <input
                            type="file"
                            name="web"
                            onChange={handlePlatformFileChange}
                            ref={fileInputRefs.web}
                            className="border border-yellow-300 rounded-sm file:py-1 file:rounded-sm file:bg-yellow-300 file:border-none"
                            accept='.zip'
                            required
                        />
                    </div>
                )}

                {Gamedata?.play_type === "download" && (
                    <div className='flex flex-col gap-4'>
                        <div>
                            <div className='flex items-center gap-1'>
                                <label className='text-xl font-medium'>แพลตฟอร์ม</label>
                                {!Gamedata.canplay || Gamedata.canplay.length === 0 && (
                                    <span className='text-red-500 text-sm'>กรุณาเลือกแพลตฟอร์ม</span>
                                )}
                            </div>
                            <div className='grid grid-cols-2 gap-1'>
                                {['Ios', 'Android', 'Window', 'Linux', 'Mac'].map((platform) => (
                                    <label key={platform} className="inline-flex items-center space-x-2 mr-4">
                                        <input
                                            type="checkbox"
                                            name="canplay"
                                            value={platform}
                                            checked={Gamedata?.canplay.includes(platform)}
                                            onChange={handleChange}
                                            className='w-5 h-5 accent-yellow-300'
                                        />
                                        <span>{platform}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {Gamedata?.canplay.map((platform) => (
                            <div key={platform} className='flex flex-col'>

                                <label className="text-xl font-medium">
                                    อัปโหลดไฟล์สำหรับ {platform}
                                    <span className='font-normal text-base text-gray-500'> (รองรับแค่ไฟล์ zip,exe,apk)</span>
                                </label>
                                <input
                                    type="file"
                                    name={platform}
                                    onChange={handlePlatformFileChange}
                                    className="border border-yellow-300 rounded-sm file:py-1 file:rounded-sm file:bg-yellow-300 file:border-none"
                                    accept=".zip, .exe, .apk"
                                    required
                                />
                            </div>
                        ))}

                    </div>

                )}

                <div className='flex flex-col'>
                    <div className='flex items-center gap-1'>
                        <label className='text-xl font-medium'>หมวดหมู่</label>
                        <span className='text-red-500 text-sm'>{error?.response?.data?.errors?.category_id}</span>
                    </div>
                    <div className='grid grid-cols-2 gap-1'>
                        {Categoriesdata.map((category) => (
                            <label key={category.id} className="inline-flex items-center space-x-2 mr-4">
                                <input
                                    type="checkbox"
                                    name="category_id"
                                    value={category.id}
                                    checked={Gamedata?.category_id.includes(category.id)} // ควบคุมสถานะ
                                    onChange={(e) => {
                                        const { value, checked } = e.target;
                                        updateGamedata((prev) => ({
                                            ...prev,
                                            category_id: checked
                                                ? [...prev.category_id, Number(value)] // เพิ่มค่าเมื่อ checked
                                                : prev.category_id.filter((id) => id !== Number(value)), // ลบค่าเมื่อ unchecked
                                        }));
                                    }}
                                    className="w-5 h-5 accent-yellow-300"
                                />
                                <span>{category.name}</span>
                            </label>
                        ))}

                    </div>
                </div>

                <div className='flex flex-col gap-1'>
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-1'>
                            <label className="text-xl font-medium">รูปปกเกม</label>
                            <span className='text-red-500 text-sm'>{error?.response?.data?.errors?.logo?.[0]}</span>
                        </div>
                        <span className='text-gray-500'>(แนะนำขนาด 300X300 ขึ้นไป)</span>
                    </div>
                    <input
                        type="file"
                        name='logo'
                        ref={fileInputRefs.logo}
                        onChange={handleFileChange}
                        className="border border-yellow-300 rounded-sm file:py-1 file:rounded-sm file:bg-yellow-300 file:border-none"
                        accept=".jpg, .jpeg, .png, .gif , .webp"
                        required
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <label className='text-xl font-medium'>รูปภาพตัวอย่างเกม</label>
                    <input
                        type="file"
                        name='galleries'
                        ref={fileInputRefs.galleries}
                        multiple
                        onChange={handleFileChange}
                        className="border border-yellow-300 rounded-sm file:py-1 file:rounded-sm file:bg-yellow-300 file:border-none"
                        accept=".jpg, .jpeg, .png, .gif , .webp"
                    />
                </div>


                <div className='flex flex-col gap-1'>
                    <div className='flex items-center gap-1'>
                        <label className="text-xl font-medium">รูปภาพพื้นหลัง</label>
                        <span className='text-red-500 text-sm'>{error?.response?.data?.errors?.background?.[0]}</span>
                    </div>
                    <input
                        type="file"
                        name='background'
                        ref={fileInputRefs.background}
                        onChange={handleFileChange}
                        className="border border-yellow-300 rounded-sm file:py-1 file:rounded-sm file:bg-yellow-300 file:border-none"
                        accept=".jpg, .jpeg, .png, .gif , .webp"
                    />
                </div>


                <div>
                    <div className='flex items-center gap-1'>
                        <label className='text-xl font-medium'>คำอธิบาย</label>
                        <span className='text-red-500 text-sm'>{error?.response?.data?.errors?.content}</span>
                    </div>
                    <QuillEditer
                        name="content"
                        value={Gamedata?.content || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className='flex flex-col gap-2'>

                    <div className='flex items-center justify-between'>

                        <label className="text-xl font-medium">สีข้อความ</label>

                        <div className='flex justify-center items-center rounded-md pl-2 pr-1 border-2 text-sm border-yellow-300'>
                            <input
                                type="text"
                                name="Text_Color"
                                value={Gamedata.Text_Color || "#" + ""}
                                onChange={handleChange}
                                className='w-24 bg-transparent outline-none'
                            />

                            <input
                                type="color"
                                name="Text_Color"
                                value={Gamedata.Text_Color || "#222222"}
                                onChange={handleChange}
                                className='w-8 h-8'
                            />
                        </div>

                    </div>

                    <div className='flex items-center justify-between'>

                        <label className="text-xl font-medium">สีพื้นหลัง</label>

                        <div className='flex justify-center items-center rounded-md pl-2 pr-1 border-2 text-sm border-yellow-300'>
                            <input
                                type="text"
                                name="Bg_color"
                                value={Gamedata.Bg_color || "#" + ""}
                                onChange={handleChange}
                                className='w-24 bg-transparent outline-none'
                            />
                            <input
                                type="color"
                                name="Bg_color"
                                value={Gamedata.Bg_color || "#eeeeee"}
                                onChange={handleChange}
                                className='w-8 h-8'
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <label className="text-xl font-medium">สีพื้นหลัง 2</label>

                        <div className='flex justify-center items-center rounded-md pl-2 pr-1 border-2 text-sm border-yellow-300'>
                            <input
                                type="text"
                                name="Bg_2_Color"
                                value={Gamedata.Bg_2_Color || "#" + ""}
                                onChange={handleChange}
                                className='w-24 bg-transparent outline-none'
                            />
                            <input
                                type="color"
                                name="Bg_2_Color"
                                value={Gamedata.Bg_2_Color || "#ffffff"}
                                onChange={handleChange}
                                className='w-8 h-8'
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>

                        <label className="text-xl font-medium max-w-44">ความจางของสีพื้นหลัง 2</label>

                        <div className="relative">
                            {isTooltipVisible && (
                                <span
                                    className="absolute -top-5 text-sm bg-yellow-300 px-1 rounded-md"
                                    style={{
                                        left: `calc(${Gamedata.Background_opacity}% - 12px)`,
                                    }}
                                >
                                    {Gamedata.Background_opacity}%
                                </span>
                            )}
                            <input
                                type="range"
                                name='Background_opacity'
                                min="0"
                                max="100"
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <div className='flex items-center justify-between'>
                        <label className="text-xl font-medium">สีลิงก์</label>

                        <div className='flex justify-center items-center rounded-md pl-2 pr-1 border-2 text-sm border-yellow-300'>
                            <input
                                type="text"
                                name="Link_Color"
                                value={Gamedata.Link_Color || "#" + ""}
                                onChange={handleChange}
                                className='w-24 bg-transparent outline-none'
                            />
                            <input
                                type="color"
                                name="Link_Color"
                                value={Gamedata.Link_Color || "#73d9fc"}
                                onChange={handleChange}
                                className='w-8 h-8'
                            />
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <label className="text-xl font-medium">สีปุ่ม</label>
                        <div className='flex justify-center items-center rounded-md pl-2 pr-1 border-2 text-sm border-yellow-300'>
                            <input
                                type="text"
                                name="Button_Color"
                                value={Gamedata.Button_Color || "#" + ""}
                                onChange={handleChange}
                                className='w-24 bg-transparent outline-none'
                            />
                            <input
                                type="color"
                                name="Button_Color"
                                value={Gamedata.Button_Color || "#" + ""}
                                onChange={handleChange}
                                className='w-8 h-8'
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className='bg-yellow-300 w-24 p-2 rounded-md font-medium 
                        hover:bg-transparent hover:ring-2 hover:ring-yellow-300 duration-200'
                >
                    เพิ่มเกม

                </button>


            </form>

        </div>
    )
}

export default UploadGameform
