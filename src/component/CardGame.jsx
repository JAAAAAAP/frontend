import React from 'react'
import { Link } from 'react-router-dom'
import Images from './Images'

export default function CardGame({ data }) {
    const canplayArray = typeof data.canplay === "string" ? JSON.parse(data.canplay) : data.canplay;
    return (
        <>
            <div className='rounded-t-md overflow-hidden'>
                {data?.galleries?.map((val, idx) => {
                    return (
                        <Link key={idx} to={`/game/${data.title}`}>

                            <div className='relative w-full'>
                                <Images img={{
                                    src: val.images,
                                    width: "100%",
                                    height: "auto"
                                }} />

                                <div className="absolute top-0 left-0 w-full h-full text-white fill-white 
                                                                bg-gradient-to-t from-black/40 via-transparent to-black/40 
                                                                flex flex-col justify-between  
                                                                opacity-0 hover:opacity-100 transition-all duration-300
                                                                text-sm 
                                                                "
                                >

                                    <div className='flex justify-between m-2'>
                                        {data.play_type === "web" ? "" : (
                                            <div className='flex items-center justify-center gap-1'>
                                                <box-icon type='solid' name='download' ></box-icon>
                                                <span className='font-medium'>{data.download}</span>
                                            </div>
                                        )}

                                        <div className='flex items-center justify-end gap-1 w-full fill-yellow-300 text-yellow-300'>
                                            <box-icon type='solid' name='star'></box-icon>
                                            <span className='font-medium'>{data.rating}/5</span>
                                        </div>
                                    </div>

                                    <div className='flex justify-between items-center m-2'>
                                        <div className='flex justify-center items-center rounded-sm'>
                                            {Array.isArray(canplayArray) &&
                                                canplayArray.map((val, index) => {
                                                    switch (val) {
                                                        case "Android":
                                                            return <box-icon key={index} type='logo' name='android'></box-icon>;
                                                        case "Ios":
                                                            return <box-icon key={index} type="logo" name="apple"></box-icon>;
                                                        case "Linux":
                                                            return <box-icon key={index} type="logo" name="tux"></box-icon>;
                                                        case "Window":
                                                            return <box-icon key={index} type="logo" name="windows"></box-icon>;
                                                        case "Mac":
                                                            return <box-icon key={index} type="logo" name="apple"></box-icon>;
                                                        default:
                                                            return null;
                                                    }
                                                })}
                                        </div>

                                        {/* <div className='flex items-center justify-center gap-1'>
                                            <box-icon name='like' type='solid' ></box-icon>
                                            <span className='font-medium'>{data.likes}</span>
                                        </div> */}
                                    </div>

                                </div>

                            </div>
                        </Link>
                    )
                })}
            </div>

            <div className='flex flex-col my-2'>
                <div className='flex justify-between items-start gap-1'>
                    <Link to={`/game/${data.title}`}>
                        <h2 className='font-medium text-[14px] text-pretty max-w-20 break-words line-clamp-2 hover:underline md:max-w-24 lg:text-base xl:max-w-36 2xl:max-w-48'>{data.title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2>
                    </Link>
                    <div className='text-[12px] rounded-md text-center bg-slate-200 py-[2px] px-[5px] lg:py-1 lg:px-2 lg:text-xs' alt="">{data.play_type}</div>
                </div>
                <div className='flex flex-wrap'>
                    {data?.categories?.map((val, index, array) => {
                        const isLastItem = index === array.length - 1;
                        return (
                            <div key={index} >
                                <Link to={`/games/Name/A-Z/categories/${val.name}/page/1`} className='text-yellow-400 text-[12px] hover:text-yellow-600 lg:text-sm'>{isLastItem ? `#${val.name}` : `#${val.name},`}</Link>
                            </div>
                        );
                    })}
                </div>
                <span className='line-clamp-3 max-w-full break-words text-xs'>{data.content.replace(/<[^>]+>/g, '')}</span>
            </div>
        </>
    )
}
