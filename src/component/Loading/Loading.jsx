import React from 'react'

export default function Loading() {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center bg-slate-300/35'>
      <box-icon name='loader' animation='spin'  size='lg'></box-icon>
      <h1>Loading...</h1>
    </div>
  )
}
