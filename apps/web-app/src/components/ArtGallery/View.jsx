import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import Modal from './Modal'
import BackToTopArrow from '../svgElements/BackToTopArrow'
import ArtBunny from '../svgElements/ArtBunny'
import Footer from '../Footer'
import Loading from '../Loading'
import BackLink from '../Buttons/BackLink'

export default function ArtGalleryComponent({
  open,
  handleClose,
  activeImage,
  setActiveImage,
  handleClick,
  images,
  isVoting,
  setIsVoting,
  isTxLoading,
  changeTxLoadingModal
}) {
  const [showTopBtn, setShowTopBtn] = useState(false)

  useEffect(() => {
    // Get the view height of the device.
    const windowHeight = window.outerHeight
    window.addEventListener('scroll', () => {
      if (window.scrollY > windowHeight) {
        setShowTopBtn(true)
      } else {
        setShowTopBtn(false)
      }
    })
  }, [])

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="flex h-auto min-h-screen flex-col justify-between overflow-x-hidden">
      {open && (
        <Modal
          onClose={handleClose}
          activeImage={activeImage}
          setActiveImage={setActiveImage}
          images={images}
          isVoting={isVoting}
          setIsVoting={setIsVoting}
          isTxLoading={isTxLoading}
          changeTxLoadingModal={changeTxLoadingModal}
        />
      )}

      {/* Header */}
      <div className="flex flex-col w-full px-8 mb-6">
        <div className="mt-8 mb-10">
          <BackLink hre="/experiences-page" />
        </div>
        <p className="mb-3 text-2xl font-extrabold">
          WELCOME TO THE DEVCON <span className="font-extrabold">XI GALLERY</span>
        </p>
        <p className="w-3/4 py-2min-h-[80px] md:min-h-fit text-brand-info text-[#1E1E1E]">
          Every canvas has 9 anonymous contributors. There are 4 active canvases at one time.
        </p>
      </div>
      <div className="relative bg-black">
        <div className="absolute bottom-8 -right-6">
          <ArtBunny />
        </div>
        <p className="relative overflow-hidden text-brand-beige text-opacity-100 text-xs w-full px-8 py-2 leading-relaxed">
          Vote for your favorite! The winner will be announced at the end of the week.
        </p>
      </div>

      {/* Image Gallery */}
      <div className="flex flex-row-reverse flex-wrap-reverse grow h-full w-full md:w-3/5 md:self-center lg:w-1/2 bg-white">
        {!images ? (
          <div className="flex justify-center w-full items-center">
            <Loading size="xl" />
          </div>
        ) : (
          images.map((img, index) => {
            // Can delete after we ensure that propper order of images is returned
            console.log('image', img, index)
            return (
              <picture
                key={img.tokenId}
                onClick={() => handleClick({ tokenId: img.tokenId, url: img.uri })}
                className="w-1/2 md:w-1/4 h-auto cursor-pointer"
              >
                <img
                  className="min-h-[195px] outline"
                  src={img.canvaUri ? img.canvaUri : img.uri}
                  alt={`Image ${img.tokenId}`}
                />
              </picture>
            )
          })
        )}
      </div>

      {/* Put Fixed and Absolute Positioned items at the bottom Gallery container */}
      <div className="fixed bottom-[15%] right-2 flex justify-end">
        <Link href="/artBoard-page">
          <button
            type="button"
            className="rounded-full bg-brand-yellow ring-2 ring-brand-black py-3 px-4 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
          >
            Draw with others
          </button>
        </Link>
      </div>
      {showTopBtn && (
        <div className="fixed bottom-[15%] left-2 flex justify-end">
          <button onClick={goToTop}>
            <BackToTopArrow />
          </button>
        </div>
      )}

      <div className="flex w-full justify-center bg-black pb-3 pt-9">
        <Footer />
      </div>
    </div>
  )
}
