import React from 'react'
import Images from '../Images'

function Galleries({ ImgGalleries }) {

    return (
        <div className='relative overflow-x-auto'>
            {ImgGalleries?.length > 0 && (
                <div className='flex flex-row gap-1 transition-all duration-300 ease-in-out w-1/2 md:w-1/3 lg:flex-col lg:gap-5 lg:w-full'>
                    {ImgGalleries.map((file, index) => (
                        <div key={index}>
                            <Images img={{
                                src: file,
                                width: "100%",
                                height: "200px"
                            }}
                            />
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default Galleries
