import React from "react"

import { RiFocus2Line } from "react-icons/ri"

const BoothArtboardCard = ({ canvas }: { canvas: { canvasId: number; tiles: string[] } }) => {
    const tileGrid = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
    ]
    const emptyTiles = canvas.tiles.filter((tile: string) => tile.length === 0)
    return (
        <div className="flex flex-col h-auto w-1/4 mx-8 p-7 bg-brand-beige2 shadow-[-20px_15px_0px_0px_rgba(184,174,167)]">
            <table className="grow flex flex-wrap bg-white mb-4 border border-brand-beige3 border-collapse">
                <tbody>
                    {tileGrid.map((rows, index) => (
                        <tr className="flex w-full h-1/3" key={index}>
                            {rows.map((item, i) => (
                                <td
                                    key={i}
                                    className="flex h-full w-full min-h-[110px] min-w-[110px] bg-white p-0 border border-brand-beige3"
                                >
                                    {canvas.tiles[item] ? (
                                        <img
                                            alt={`Artboard tile ${item}`}
                                            src={canvas.tiles[item]}
                                            className="w-full h-full"
                                        />
                                    ) : (
                                        <div className="bg-white grow flex items-center w-full h-full">
                                            <p className="text-sm text-brand-blue w-full text-center">open tile</p>
                                        </div>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex flex-col h-24">
                <h1 className="font-extrabold mb-4">Canvas {canvas.canvasId}</h1>
                {emptyTiles.length === 9 && (
                    <p className="text-xs mb-4">This canvas is empty – Join the TAZ app to start drawing!</p>
                )}
                {emptyTiles.length === 0 && (
                    <p className="text-xs mb-4">This complete canvas has been added to the TAZ app gallery!</p>
                )}
                {emptyTiles.length !== 0 && emptyTiles.length !== 9 && (
                    <p className="text-xs mb-4">
                        {9 - emptyTiles.length} tiles are complete | {emptyTiles.length} open tiles remains
                    </p>
                )}
                <div className="flex items-center w-fit py-1 px-2 rounded bg-brand-red text-brand-beige">
                    <RiFocus2Line className="mr-1" />
                    <p className="text-xs font-normal">LIVE</p>
                </div>
            </div>
        </div>
    )
}

export default BoothArtboardCard
