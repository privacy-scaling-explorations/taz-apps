import React, { forwardRef } from "react"

const GenerateTile = forwardRef(({ i, tiles, startDrawing }) => (
    <td className="bg-white p-0 ">
        <div className="w-[112px] h-[112px]" onClick={() => startDrawing(i)}>
            {tiles[i] ? (
                <picture>
                    <img alt={`Artboard tile ${i}`} id={`${i}`} src={tiles[i] ? tiles[i] : ""} />
                </picture>
            ) : (
                <div className="w-[112px] h-[112px] border border-slate-200 border-collapse flex items-center">
                    <p className="text-sm text-brand-blue w-full text-center">open tile</p>
                </div>
            )}
        </div>
    </td>
))

export default GenerateTile

GenerateTile.displayName = "GenerateTile"
