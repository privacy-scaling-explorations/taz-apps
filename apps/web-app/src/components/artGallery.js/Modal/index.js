import React from 'react'
import { images } from '../data'

export default function Modal({ onClose, activeImage, setActiveImage }) {
  const handleClick = () => {
    onClose && onClose()
  }
  const handleControlTabClick = (e, url) => {
    e.stopPropagation()
    setActiveImage(url)
  }
  // Special thanks to fireship.io for this beautiful code snippet to animate modal drop in.

  return (
    // <div onClick={handleClick} className={styles.backdrop}>
    <div
      onClick={handleClick}
      className="absolute left-0 top-0 bottom-0 right-0 h-[100vh] w-[100vw] overflow-scroll bg-[#00000070] flex flex-col items-center justify-center z-10"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[50%] min-h-[30%] flex flex-col justify-center items-center"
      >
        <button
          onClick={onClose}
          className="border-none h-[400px] w-[300px] rounded-md"
          style={{
            boxShadow: `0 20px 50px #2563eb`,
            backgroundImage: `url(${activeImage})`,
            backgroundSize: 'cover',
          }}
        ></button>
      </div>
      <div className="absolute z-20 bottom-5 w-[100%] h-[70px] overflow-x-auto flex justify-center">
        {images.map((url, idx) => (
          <button
            style={{
              backgroundImage: `url(${url})`,
              backgroundSize: 'cover',
              border: `1px solid ${
                activeImage === url ? '#06b6d4' : 'transparent'
              }`,
            }}
            className="h-[100%] w-[50px] cursor-pointer mx-1"
            key={idx}
            onClick={(e) => handleControlTabClick(e, url)}
          ></button>
        ))}
      </div>
    </div>
  )
}
