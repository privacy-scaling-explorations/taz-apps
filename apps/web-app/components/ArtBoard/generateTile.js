import React, { forwardRef } from 'react'

const GenerateTile = forwardRef(({ i, tiles, startDrawing }) => (
  <td className="bg-white p-0 ">
    <div className="w-[112px] h-[112px]" onClick={() => startDrawing(i)}>
      {tiles[i] ? (
        <picture>
          <img
            alt={`Artboard tile ${i}`}
            id={`${i}`}
            src={
              tiles[i] ? tiles[i] : ''
              // "https://media.istockphoto.com/vectors/cartoon-raven-isolated-on-white-background-vector-id597250060?k=20&m=597250060&s=612x612&w=0&h=yl0rXftvQNqXTKQyRjqumexaKiyW6Bq0OFl1Ko4zaAs="
            }
          />
        </picture>
      ) : (
        <p className="w-[112px] h-[112px] border border-brand-gray border-collapse" />
      )}
    </div>
  </td>
))

export default GenerateTile

GenerateTile.displayName = 'GenerateTile'
