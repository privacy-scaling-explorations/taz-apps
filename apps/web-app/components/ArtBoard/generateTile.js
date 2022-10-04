import React, { forwardRef } from "react"

<<<<<<< HEAD
const GenerateTile = forwardRef(({ i, tiles, startDrawing }) => (
    <td className="bg-white border border-slate-200 p-0 ">
=======
const GenerateTile = forwardRef(({ i, tiles, startDrawing, userSelectedTile }) => (
    <td className="bg-white p-0 ">
>>>>>>> 65227f940fd08a8b9e321c19435555e043b216ac
        <div className="w-[112px] h-[112px]" onClick={() => startDrawing(i)}>
            {tiles[i] ? (
                <picture>
                    <img alt={`Artboard tile ${i}`} id={`${i}`} src={tiles[i] ? tiles[i] : ""} />
                </picture>
            ) : (
<<<<<<< HEAD
                <div className="w-[112px] h-[112px] flex items-center">
                    <p className="text-sm text-brand-blue w-full text-center">open tile</p>
=======
                <div className="w-[112px] h-[112px] border border-slate-200 border-collapse flex items-center">
                    {userSelectedTile ? (
                        <p className="text-sm text-brand-blue w-full text-center text-opacity-30">open tile</p>
                    ) : (
                        <p className="text-sm text-brand-blue w-full text-center">open tile</p>
                    )}
>>>>>>> 65227f940fd08a8b9e321c19435555e043b216ac
                </div>
            )}
        </div>
    </td>
))

export default GenerateTile

GenerateTile.displayName = "GenerateTile"
