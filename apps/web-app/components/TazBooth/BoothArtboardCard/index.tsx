import React from "react"

import { RiLiveLine } from "react-icons/ri"

const BoothArtboardCard = ({ canvas }: { canvas: { canvasId: number; tiles: string[] } }) => {
    const emptyTiles = canvas.tiles.filter((tile: string) => tile.length === 0)
    return (
        <div className="flex flex-col h-[470px] w-1/4 mx-8 p-7 bg-brand-beige2 border border-brand-gray2 shadow-[-20px_15px_0px_0px_rgba(184,174,167)]">
            <div className="grow flex flex-wrap bg-white mb-4">
                {canvas.tiles.map((tile: string, index: number) => (
                    <picture key={index} className="w-1/3 h-1/3">
                        {tile ? <img alt={`Artboard tile ${index}`} src={tile} /> : <div className="bg-white" />}
                    </picture>
                ))}
            </div>
            <div className="flex flex-col h-24">
                <h1 className="font-extrabold mb-4">Canvas ID #{canvas.canvasId}</h1>
                <p className="text-xs mb-4">There are still {emptyTiles.length} available tiles</p>
                <div className="flex items-center w-fit py-1 px-2 rounded bg-brand-red text-brand-beige animate-pulse">
                    <RiLiveLine className="mr-1" />
                    <p className="text-xs font-normal">LIVE</p>
                </div>
            </div>
        </div>
    )
}

export default BoothArtboardCard
