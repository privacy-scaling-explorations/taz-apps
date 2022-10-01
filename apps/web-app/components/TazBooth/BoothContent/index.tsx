import React from "react"

import BoothArtboardCard from "../BoothArtboardCard"

const BoothContent = ({ canvases }: any) => {
    console.log("canvases", canvases)

    return (
        <div className="grow flex justify-between items-center px-14 bg-brand-beige">
            {canvases.map((canvas: any) => (
                <BoothArtboardCard key={canvas.canvasId} canvas={canvas} />
            ))}
        </div>
    )
}

export default BoothContent
