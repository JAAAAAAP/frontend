import React, { Suspense } from 'react'
// import GameSilder from '../component/Index/GameSilder.jsx'
// import IndexGame from '../component/Index/IndexGame.jsx';
import BannerLoading from '../component/Loading/BannerLoading.jsx'
import SliderLoading from '../component/Loading/SliderLoading.jsx';

const GameSilder = React.lazy(() => import('../component/Index/GameSilder.jsx')); // lazy load for GameSilder
const IndexGame = React.lazy(() => import('../component/Index/IndexGame.jsx')); // lazy load for IndexGame
const Banner = React.lazy(() => import('../component/Banner.jsx'));

function Index() {

    return (
        <div>
            <Suspense fallback={<BannerLoading />}>
                <Banner />
            </Suspense>

            <Suspense fallback={<SliderLoading />}>
                <GameSilder />
                <IndexGame />
            </Suspense>
        </div>
    )
}

export default Index
