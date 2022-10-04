import React, { useEffect, useState } from "react"

import axios from "axios"
import ArtGalleryComponent from "./View"
import { Subgraphs } from "../../helpers/subgraphs.js"
// Used to dev when images didn't load
import mockImages from "./data"

export default function ArtGallery(props) {
    const [images, setImages] = useState(null)
    const [activeImage, setActiveImage] = useState(null)
    const [open, setOpen] = useState(false)
    const [isVoting, setIsVoting] = useState()
    const [isTxLoading, setIsTxLoading] = useState(false)

    const handleClick = (image) => {
        setActiveImage(image)
    }

    const fetchCanvasData = async () => {
        const subgraphs = new Subgraphs()
        let imageData = []

        try {
            const tokens = await subgraphs.getMintedTokens()
            const canvas = (await axios.get("/api/fetchCanvases")).data
            imageData = tokens.map((token) => ({
                ...token,
                ...canvas.find((canva) => canva.imageId === token.imageId)
            }))
        } catch (err) {
            console.error("Error fetching image data", err)
        }

        // Check local storage for new saved canvas
        const savedCanvas = JSON.parse(window.localStorage.getItem("savedCanva"))
        const found = imageData.some((element) => savedCanvas && element.imageId === savedCanvas.imageId)
        if (found) {
            window.localStorage.removeItem("savedCanva")
        } else if (savedCanvas) {
            imageData.unshift(savedCanvas)
            setImages(imageData)
        }
        setImages(imageData)
    }

    useEffect(() => {
        if (activeImage) {
            // open modal
            setOpen(true)
        }
        fetchCanvasData()
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
