import React from 'react'

import LoadingModalComponent from './View'

export default function LoadingModal({
  onClose,
  loadingMessage,
  loadingProof,
}) {
  const handleClick = () => {
    onClose && onClose()
  }
  // Special thanks to fireship.io for this beautiful code snippet to animate modal drop in.

  return (
    <LoadingModalComponent
      handleClick={handleClick}
      loadingMessage={loadingMessage}
      loadingProof={loadingProof}
    />
  )
}
