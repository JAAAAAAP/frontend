import React, { Suspense } from 'react'
import { useIndexGame } from '../../hook/useGame'
import { Link } from 'react-router-dom'
import CardGame from '../CardGame'

export default function IndexGame() {

    const { IndexGamesdata, errorGames } = useIndexGame()

    if (errorGames) {
        return <div>Error: {errorGames.message}</div>
    }

    return (
        <div className='flex flex-col gap-4 mx-auto px-6 container'>
            <div className='flex justify-between mt-7'>

                <h1 className='font-semibold text-2xl'>เกมทั้งหมด</h1>

                <Link to="/games">
                    <button className='bg-yellow-300 text-white rounded-md py-1 px-2 ring-yellow-300 duration-150 hover:ring-2 hover:bg-transparent hover:text-black'>ดูเกมทั้งหมด</button>
                </Link>

            </div>

            <Suspense fallback={<div>Loading...</div>}>
                {IndexGamesdata && Array.isArray(IndexGamesdata) && IndexGamesdata.length > 0 ? (
                    <div className='grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5'>
                        {IndexGamesdata.map((data, index) => (
                            <div key={index}>
                                <CardGame data={data} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>ไม่มีข้อมูลเกม</div>
                )}
            </Suspense>

        </div>
    )
}
