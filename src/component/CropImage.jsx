import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../utils/cropImage'

function CropImage({ image, onSave, onCancel, height }) {

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, [])

    const handleSave = async () => {
        if (!croppedAreaPixels || !image) return;
        const croppedImage = await getCroppedImg(image, croppedAreaPixels);
        onSave(croppedImage);
    }

    return (
        <>
            <div
                className="relative w-full bg-gray-200"
                style={{ height: `${height}px` }}
            >
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={handleCropComplete}
                />
            </div>
            <div className="flex justify-between mt-2">
                <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={onCancel}
                >
                    ยกเลิก
                </button>
                <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={handleSave}
                >
                    บันทึก
                </button>
            </div>
        </>
    )
}

export default CropImage
