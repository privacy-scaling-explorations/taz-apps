import React from 'react'
import { motion } from 'framer-motion'

const LoadingModalComponent = ({
  handleClick,
  loadingMessage,
  loadingProof,
}) => {
  // const testProof =''
  const dropIn = {
    hidden: {
      y: '-200vh',
      opacity: 0,
    },
    visible: {
      y: '0',
      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: '-200vh',
      opacity: 0,
    },
  }
  return (
    <div
      onClick={handleClick}
      className="absolute top-0 left-0 bottom-0 right-0 h-[100%] w-[100%] m-0 bg-[#00000070] flex flex-col items-center justify-center px-5 z-20"
    >
      <motion.div
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className=" w-[100%] h-[60%] sm:w-[70%] sm:h-[50%] bg-brand-beige2 border-[1px] flex flex-col items-center justify-center rounded-[5px]"
      >
        <div className="index-[10] relative divide-y rounded-md border-2 border-gray-500 bg-white drop-shadow-lg h-[90%] w-[90%] sm:w-[70%]">
          <div className="flex items-center gap-4 py-4 px-4 bg-brand-beige">
            <svg
              aria-hidden="true"
              className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-brand-gray fill-brand-yellow"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <h1 className="text-md sm:text-2xl text-brand-gray">Processing</h1>
          </div>
          <div className="flex w-full flex-row items-center border-b-[1px] border-brand-gray p-4 text-brand-gray">
            {loadingMessage}
          </div>

          {loadingProof ? (
            <div className="flex w-full flex-col items-center border-b-[1px] border-brand-gray p-4 line-clamp-6 break-words text-brand-gray">
              <p>2. Generated Zero Knowledge Proof</p>
              <p className="px-3 pr-2 text-xs">{loadingProof}</p>
            </div>
          ) : null}
        </div>
        {/* <button className="border-2 border-brand-gray" onClick={onClose}>
          Close
        </button> */}
      </motion.div>
    </div>
  )
}
export default LoadingModalComponent
