import React from "react"

import { RiLiveLine } from "react-icons/ri"

const BoothArtboardCard = ({ canvas }) => {
    console.log("canvas", canvas)
    return (
        <div className="flex flex-col h-[470px] w-1/4 mx-8 p-7 bg-brand-beige2 border border-brand-gray2 shadow-[-20px_15px_0px_0px_rgba(30,30,30)]">
            <div className="grow">Content</div>
            <div className="flex flex-col h-24">
                <h1 className="font-extrabold mb-4">Canvas ID #{canvas.canvasId}</h1>
                <p className="text-xs mb-4">3 active participants | 6 available tiles</p>
                <div className="flex items-center w-fit py-1 px-2 rounded bg-brand-red text-brand-beige animate-pulse">
                    <RiLiveLine className="mr-1" />
                    <p className="text-xs font-normal">LIVE</p>
                </div>
            </div>
        </div>
    )
}

export default BoothArtboardCard
