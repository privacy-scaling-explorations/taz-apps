import React, { useEffect, useState } from "react"

import axios from "axios"
import ArtGalleryComponent from "./View"
// Used to dev when images didn't load
import mockImages from "./data"

export default function ArtGallery(props) {
    const [images, setImages] = useState(props.images)
    const [activeImage, setActiveImage] = useState(null)
    const [open, setOpen] = useState(false)
    const [isVoting, setIsVoting] = useState()
    const [isTxLoading, setIsTxLoading] = useState(false)

    const handleClick = (image) => {
        setActiveImage(image)
    }

    const updateFromLocalStorage = () => {
        const savedCanvas = JSON.parse(window.localStorage.getItem("savedCanva"))
        const found = images.some((element) => savedCanvas && element.imageId === savedCanvas.imageId)
        if (found) {
            window.localStorage.removeItem("savedCanva")
            console.log("image found")
        } else if (savedCanvas) {
            const updatedCanvas = [savedCanvas].concat(images)
            setImages(updatedCanvas)
            console.log("savedCanvas", savedCanvas)
            console.log("updatedCanvas", updatedCanvas)
            console.log("image not found")
        }
    }

    const fetchCanvasesData = async () => {
        const response = await axios.get("/api/fetchCanvases");
        console.log("All Canvases",response.data)
    }

    useEffect(() => {
        if (activeImage) {
            // open modal
            setOpen(true)
        }
        updateFromLocalStorage()
        fetchCanvasesData()
    }, [activeImage])

    const handleClose = () => {
        setOpen(false)
        setActiveImage(null)
    }

    const changeTxLoadingModal = () => {
        console.log("isTxLoading", isTxLoading)
        if (isTxLoading === true) {
            setIsTxLoading(false)
        } else {
            setIsTxLoading(true)
        }
    }

    return (
        <ArtGalleryComponent
            open={open}
            handleClose={handleClose}
            activeImage={activeImage}
            setActiveImage={setActiveImage}
            handleClick={handleClick}
            images={images}
            isVoting={isVoting}
            setIsVoting={setIsVoting}
            isTxLoading={isTxLoading}
            changeTxLoadingModal={changeTxLoadingModal}
        />
    )
}
