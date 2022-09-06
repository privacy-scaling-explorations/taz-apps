import React, { useEffect, useState } from 'react'
import { images } from './data'
import Modal from './Modal'
import Header from '../Header'

export default function ArtGallery() {
  const [activeImage, setActiveImage] = useState(null)
  const [open, setOpen] = useState(false)
  const handleClick = (url) => {
    setActiveImage(url)
  }

  useEffect(() => {
    if (activeImage) {
      // open modal
      setOpen(true)
    }
  }, [activeImage])

  const handleClose = () => {
    setOpen(false)
    setActiveImage(null)
  }
  return (
    <div>
      {open && (
        <Modal
          onClose={handleClose}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
        />
      )}
      <Header />
      <div className="flex flex-col items-center rounded-md px-3">
        <div className="z-10 mt-3 w-full py-3 px-4">
          <p className="px-3 text-xl font-bold">Welcome to the TAZ Gallery!</p>
          <p className="mb-3 py-5 px-3 text-sm text-[#513E2E]">
            Checkout the Arts done by anonymous collaborators!{' '}
            <a className="underline">Click Here to start drawing</a>
          </p>
        </div>
      </div>

      <div className="flex flex-row flex-wrap justify-center py-10 rounded-xl">
        {images.map((url, idx) => (
          <ImageCard key={idx} url={url} onClick={() => handleClick(url)} />
        ))}
      </div>
      <div className="flex items-center justify-center mb-20">
        <button className="bg-brand-beige2 w-full p-2 rounded-lg border-2 border-brand-gray shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] ml-20 mr-20">
          Start CoDrawing!
        </button>
      </div>
    </div>
  )
}

const ImageCard = ({ url, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mr-[10px] mb-[10px] relative border-none hover:bg-red-700 cursor-pointer h-[150px] w-[120px] sm:h-[250px] sm:w-[200px] "
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        borderRadius: '5px',
      }}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 h-[100%] w-[100%] opacity-0 bg-black "></div>
    </button>
  )
}
