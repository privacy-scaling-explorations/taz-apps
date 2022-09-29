import dynamic from 'next/dynamic'
import React from 'react'

const ArtBoard = dynamic(() => import('../components/ArtBoard/index'), {
  ssr: false
})

export default function ArtBoardPage() {
  return (
    <div className="relative min-h-[700px]">
      <ArtBoard />
    </div>
  )
}
