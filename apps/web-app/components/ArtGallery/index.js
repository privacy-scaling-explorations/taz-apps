import React, { useEffect, useState } from "react"

import axios from "axios"
import ArtGalleryComponent from "./View"
import { Subgraphs } from "../../helpers/subgraphs.js"
// Used to dev when images didn't load
import mockImages from "./data"

const { GALLERY_OPEN } = require("../../config/goerli.json")

export default function ArtGallery(props) {
    const [images, setImages] = useState(null)
    const [activeImage, setActiveImage] = useState(null)
    const [open, setOpen] = useState(false)
    const [isVoting, setIsVoting] = useState()
    const [isTxLoading, setIsTxLoading] = useState(false)
    const [winner, setWinner] = useState(null)

    const galleryOpen = GALLERY_OPEN

    const handleClick = (image) => {
        setActiveImage(image)
    }

    const fetchCanvasData = async () => {
        const subgraphs = new Subgraphs()
        let imageData = []

        try {
            const tokens = await subgraphs.getMintedTokens()
            console.log("TOKENS:", tokens)
            // const canvas = (await axios.get("/api/fetchCanvases")).data
            // imageData = tokens.map((token) => ({
            //     ...token,
            //     ...canvas.find((canva) => canva.imageId === token.imageId)
            // }))

            imageData = tokens

            const requests = []

            for (const img of imageData) {
                requests.push(axios.get(img.uri))
            }

            const urls = await Promise.all(requests)

            for (let i = 0; i < imageData.length; i++) {
                imageData[i].imageUri = urls[i].data.image
            }
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

        // If gallery is closed, get winner data
        if (!galleryOpen) {
            try {
                const winnerData = await subgraphs.getVoteWinner()
                const { imageUri } = imageData.find((img) => img.tokenId === winnerData.tokenId)
                winnerData.imageUri = imageUri
                setWinner(winnerData)
            } catch (err) {
                console.info("Error fetching winner data: ", err)
            }
        }
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
            galleryOpen={galleryOpen}
            winner={winner}
        />
    )
}
