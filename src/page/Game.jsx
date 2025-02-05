import React from 'react';
import { useParams, Link } from 'react-router-dom'

import { getGamebyId } from '../hook/useGame'
import { useAuthContext } from '../context/AuthContext';

import WebgameDisplay from '../component/_GetGame/WebgameDisplay'
import Content from '../component/_GetGame/Content'
import GameInformation from '../component/_GetGame/GameInformation'
import Galleries from '../component/_GetGame/Galleries'
import DowloadGame from '../component/_GetGame/DowloadGame'
import Comment from '../component/_GetGame/Comment'


export default function Game() {

    const { slug } = useParams()
    const { data, isLoading, error } = getGamebyId(slug)
    const { user } = useAuthContext()

    const Gamedata = data?.data
    const Images = Gamedata?.galleries?.[0]?.images
    const Theme = Gamedata?.galleries?.[0]?.theme

    const isOwner = user?.email === Gamedata?.user?.email

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
        <div
            className="bg-cover bg-center"
            style={{
                backgroundImage: Images?.background
                    ? `url(${Images?.background})`
                    : '',
                backgroundColor: Theme?.Bg_Color || '#f5f5f5',
                backgroundAttachment: 'fixed',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className='fixed flex flex-col gap-2 mt-2 right-2 z-10'>
                {/* <div className='flex items-center justify-center gap-2 border border-white rounded-sm px-2 py-1 bg-black/40 text-white fill-white'>
                    <box-icon name='like' type='solid' ></box-icon>
                    <span className='font-medium'>กดถูกใจ</span>
                </div> */}

                {/* {isOwner && (
                    <Link to={`/editgame/${Gamedata.title}`} className='flex items-center justify-center gap-2 border border-white rounded-sm px-2 py-1 bg-black/40 text-white fill-white'>
                        <box-icon name='edit-alt' type='solid' ></box-icon>
                        <span className='font-medium'>แก้ไขเกม</span>
                    </Link>
                )} */}


            </div>

            <div className='flex flex-col items-center w-full'>
                <div
                    className='w-full md:w-4/5 px-3 pt-5 '
                    style={{
                        backgroundColor: hexToRgba(
                            Theme?.Bg_2_Color || '#FFFFFF', // สี Hex
                            (Theme?.Background_opacity ?? 100) / 100 // แปลงค่า 0-100 เป็น 0.0-1.0
                        ),
                    }}
                >
                    {Gamedata?.play_type === "web" && (
                        <WebgameDisplay file={Gamedata.file_path.web} />
                    )}

                    <div className='flex flex-col-reverse lg:grid lg:grid-cols-3 gap-5 mt-5'>


                        <div className='col-span-2 break-words'>
                            <Content
                                Gamecontent={Gamedata.content}
                                Link_Color={Theme.Link_Color}
                                Text_Color={Theme.Text_Color}
                            />

                            <GameInformation
                                data={{
                                    username: Gamedata.user.name,
                                    created_at: Gamedata.created_at,
                                    updated_at: Gamedata.updated_at,
                                    rating: Gamedata.rating,
                                    categories: Gamedata.categories,
                                    platform: Gamedata.canplay
                                }}
                                Link_Color={Theme.Link_Color}
                                Text_Color={Theme.Text_Color}
                            />

                            {Gamedata?.play_type === "download" && (
                                <DowloadGame
                                    data={{ file: Gamedata.file_path.download, gamename: Gamedata.title, id: Gamedata.id }}
                                    Text_Color={Theme.Text_Color}
                                    Button_Color={Theme.Button_Color}
                                />
                            )}

                            <Comment
                                data={{ game_name: Gamedata.title, game_id: Gamedata.id, comment: Gamedata.reviews }}
                                Text_Color={Theme.Text_Color}
                                Button_Color={Theme.Button_Color}
                                Link_Color={Theme.Link_Color}
                                user={{ email: user?.email, role: user?.role }}
                            />

                        </div>

                        <Galleries ImgGalleries={Images.galleries} />

                    </div>
                </div>

            </div>
        </div>
    );
}
