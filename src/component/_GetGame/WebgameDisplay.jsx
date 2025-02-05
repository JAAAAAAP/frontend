import React from 'react'

function WebgameDisplay({ file }) {
    return (
        <div className="w-full h-[300px] md:h-[400px] lg:h-[490px] xl:h-[600px]">
            <iframe
                src={file + "/"}
                className="w-full h-full"
            />
        </div>
    )
}

export default WebgameDisplay
