import React from 'react'
import UploadGameform from '../component/UploadGame/UploadGameform'
import { UploadGameProvider } from '../context/UploadGameContext'
import ThumbnailPreview from '../component/UploadGame/ThumbnailPreview'
import PreviewGame from '../component/UploadGame/_PreviewGame.jsx/PreviewGame'


function Uploadgame() {

  return (
    <UploadGameProvider>

      <div className='grid grid-cols-1 mx-5 mt-10 p-2 border-2 rounded-sm lg:grid-cols-2 lg:p-5 lg:mx-10 xl:mx-40'>
        <UploadGameform />

        <ThumbnailPreview />
      </div>

      <PreviewGame />
    </UploadGameProvider>
  )
}

export default Uploadgame
