import React from 'react'
import { useMyProfile } from '../hook/useAuth'
import { useDeleteGame } from '../hook/useGame'
import { useAuthContext } from '../context/AuthContext';
import Images from '../component/Images'
import { Link } from 'react-router-dom';


function MyProfile() {
    const { data, isloading, error } = useMyProfile()
    const { mutateAsync } = useDeleteGame()
    const { user } = useAuthContext()

    const game = data?.data?.profile

    console.log('====================================');
    console.log(game);
    console.log('====================================');

    const handleDelete = async (id) => {
        try {
            await mutateAsync(id)
        } catch (error) {
            throw error
        }
    }

    return (
        <div className='container mx-auto flex flex-col pt-3 gap-5 h-screen'>
            <div className='flex flex-col font-medium ml-5 md:flex-row md:gap-4 md:items-center'>
                <h1 className='text-2xl'>{user?.name}</h1>
                <span className='md:text-lg'>มีเกมทั้งหมด {data?.data?.gamecount} เกม</span>
            </div>

            {game?.map((val, index) => (
                <div className='flex justify-between rounded-md bg-white p-2'>
                    <div className='flex gap-2'>
                        <Link to={`/game/${val.title}`} className='rounded-md overflow-hidden w-24'>
                            <Images img={{
                                src: val?.galleries[0]?.images?.logo,
                                width: "100%",
                                height: "auto"
                            }} />
                        </Link>
                        <div className='flex flex-col gap-3'>
                            <Link to={`/game/${val.title}`} className='text-xl underline font-medium'>{val.title}</Link>
                            <span className='line-clamp-3 max-w-full break-words text-xs'>{val.content.replace(/<[^>]+>/g, '')}</span>
                        </div>
                    </div>
                    <div className='flex justify-center items-center' onClick={() => handleDelete(val.id)}>
                        <button className='bg-red-500 text-white p-1 rounded-md mr-4'>ลบเกม</button>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default MyProfile
