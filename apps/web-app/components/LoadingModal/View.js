import React from 'react'
import { motion } from 'framer-motion'

import Loading from '../Loading'

const LoadingModalComponent = ({ handleClick, loadingMessage, loadingProof }) => {
  const dropIn = {
    hidden: {
      y: '-200vh',
      opacity: 0
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 25,
        stiffness: 500
      }
    },
    exit: {
      y: '-200vh',
      opacity: 0
    }
  }
  return (
    <div
      onClick={handleClick}
      className="absolute top-0 left-0 bottom-0 right-0 h-full w-full m-0 bg-[#00000070] flex flex-col items-center px-5 z-20"
    >
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="w-full md:w-2/4 h-[450px] sm:w-9/12 m-32 md:mt-52 border rounded border-brand-gray bg-white drop-shadow-lg items-center justify-center"
      >
        <div className="flex items-center rounded-t border-b border-brand-gray gap-4 py-4 px-4 bg-brand-beige">
          <Loading size="sm" variant="teritary" />
          <h1 className="text-md sm:text-2xl text-brand-gray">Processing</h1>
        </div>
        <div className="flex w-full flex-row items-center  p-4 text-brand-gray">{loadingMessage}</div>

        {loadingProof && (
          <div className="flex w-full flex-col items-center p-4 line-clamp-6 break-words text-brand-gray">
            <p>2. Generated Zero Knowledge Proof</p>
            <p className="px-3 pr-2 text-xs">{loadingProof}</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
export default LoadingModalComponent
