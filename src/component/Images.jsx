import React, { memo, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const Images = memo(({ img }) => {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <div className="relative w-full aspect-square " style={{ height: img.height, width: img.width }}>
            {isLoading && (
                <div className="absolute inset-0 bg-gray-300 animate-pulse" />
            )}
            <LazyLoadImage
                className='object-cover w-full h-full'
                src={img.src}
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
            />
        </div>
    )
})

export default Images