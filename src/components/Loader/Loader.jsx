import React from 'react'
import { ProgressBar } from 'react-loader-spinner'

export default function Loader() {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <ProgressBar
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )
}
