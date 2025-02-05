import React, { Suspense } from 'react'
import { useNewestGames, useMostDownload, useMostRating } from '../../hook/useGame'
import SliderLoading from '../Loading/SliderLoading';

const Slider = React.lazy(() => import('./Slider'));



export default function GameSilder() {

    const { NewestGamesdata, errorNewest } = useNewestGames()
    const { MostDownloaddata, errorDownload } = useMostDownload()
    const { MostRatingdata, errorRating} = useMostRating()

    const sliderData = [
        { caption: "เกมมาใหม่", data: NewestGamesdata, nextName: "NewestGames-next", prevName: "NewestGames-prev", error: errorNewest },
        { caption: "เกมยอดดาวน์โหลดเยอะ", data: MostDownloaddata, nextName: "MostDownload-next", prevName: "MostDownload-prev", error: errorDownload },
        { caption: "เกมเรตติ้งสูงสุด", data: MostRatingdata, nextName: "MostRating-next", prevName: "MostRating-prev", error: errorRating },
    ];


    return (
        <div>
            {sliderData.map((slider, index) => (
                <Suspense key={index} fallback={<SliderLoading />}>
                    <Slider
                        caption={slider.caption}
                        data={slider.data}
                        nextName={slider.nextName}
                        prevName={slider.prevName}
                        error={slider.error}
                    />
                </Suspense>
            ))}
        </div>
    )
}
