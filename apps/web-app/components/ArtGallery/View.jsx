import React, { useState, useEffect } from "react"
import Link from "next/link"

import Modal from "./Modal"
import BackToTopArrow from "../svgElements/BackToTopArrow"
import Footer from "../Footer"
import Loading from "../Loading"
import BackLink from "../Buttons/BackLink"

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
    const [galleryOpen, setGalleryOpen] = useState(true)

    useEffect(() => {
        // Get the view height of the device.
        const windowHeight = window.outerHeight
        window.addEventListener("scroll", () => {
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
            behavior: "smooth"
        })
    }

    return (
        <div className="flex h-auto min-h-screen flex-col justify-between overflow-x-hidden">
            {open && galleryOpen ? (
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
            ) : null}

            {/* Header */}
            <div className="flex flex-col w-full px-5 mb-6">
                <div className="mt-8 mb-11 ml-3">
                    <BackLink hre="/experiences-page" />
                </div>
                <div className="flex flex-col w-full items-left">
                    <h2 className="ml-4 text-2xl leading-5 font-extrabold">WELCOME TO THE</h2>
                    <h2 className="ml-4 mb-2 text-2xl font-extrabold">DEVCON VI GALLERY</h2>
                </div>
                {galleryOpen ? (
                    <p className="ml-4 text-brand-info text-brand-blue">
                        Each completed canvas below is a collective creation by 9 anonymous TAZ members. You can vote
                        for your favorite at any time - but you only get one vote so choose wisely!
                    </p>
                ) : (
                    <p className="ml-4 text-brand-info text-brand-blue">
                        Nine anonymous individuals were assigned at random to each canvas October 10-17, 2022.
                    </p>
                )}

                {/* <p className="mb-3 text-2xl font-extrabold">
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
                </p> */}
            </div>
            <div className="relative bg-black">
                {galleryOpen ? (
                    <p className="relative overflow-hidden text-brand-beige text-center text-opacity-100 text-brand-info w-full px-12 py-2 leading-relaxed">
                        Visit the TAZ community hub to see canvases in progress
                    </p>
                ) : (
                    <div>
                        <div className="relative overflow-hidden text-brand-beige text-center text-opacity-100 text-brand-info w-full px-6 py-2 leading-relaxed">
                            <p>This gallery closed at the end of the event. Thank you to everyone who contributed!</p>
                        </div>
                        {/* placeholder for winning canvas */}
                        <div className="w-full h-[400px] bg-white"></div>
                        <div className="relative overflow-hidden text-brand-beige text-center text-opacity-100 text-brand-info w-full px-6 py-2 leading-relaxed">
                            <p className="text-2xl">Exhibition Favorite</p>
                            <p>Canvas 323 | 746 of 909 Votes</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Image Gallery */}
            <div className="flex flex-row flex-wrap grow h-full w-full md:w-3/5 md:self-center lg:w-1/2 bg-white">
                {!images ? (
                    <div className="flex justify-center w-full items-center">
                        <Loading size="xl" />
                    </div>
                ) : (
                    images?.map((img) => (
                        <picture
                            key={img.tokenId}
                            onClick={() =>
                                handleClick({
                                    tokenId: img.tokenId,
                                    url: img.canvaUri ? img.canvaUri : img.imageUri,
                                    imageId: img.imageId
                                })
                            }
                            className="w-1/2 md:w-1/4 h-auto cursor-pointer"
                        >
                            <img
                                className="min-h-[195px] outline"
                                src={img.canvaUri ? img.canvaUri : img.imageUri}
                                alt={`Image ${img.tokenId}`}
                            />
                        </picture>
                    ))
                )}
            </div>

            {/* Put Fixed and Absolute Positioned items at the bottom Gallery container */}
            {galleryOpen ? (
                <div>
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
                </div>
            ) : (
                <div>
                    {showTopBtn && (
                        <div className="fixed bottom-[15%] left-[44%] flex justify-end">
                            <button onClick={goToTop}>
                                <BackToTopArrow />
                            </button>
                        </div>
                    )}
                </div>
            )}

            <div className="flex w-full justify-center bg-black pb-3 pt-9">
                <Footer />
            </div>
        </div>
    )
}
