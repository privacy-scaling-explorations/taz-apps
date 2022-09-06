import Link from 'next/link'

import LoadingModal from '../LoadingModal/Index.js'
import { AnimatePresence } from 'framer-motion'

// 3. Ask Question Page
const AskQuestionComponent = ({
  onClose,
  loadingMessage,
  loadingProof,
  isLoading,
  setMessageContent,
  handleAskButton,
  clearIdentity,
}) => {
  return (
    <div className="p-4 font-sans bg-brand-beige">
      {isLoading ? (
        <AnimatePresence
          initial={false}
          exitBeforeEnter
          onExitComplete={() => null}
          className="z-20"
        >
          <LoadingModal
            onClose={onClose}
            loadingMessage={loadingMessage}
            loadingProof={loadingProof}
          />
        </AnimatePresence>
      ) : null}
      <svg
        className="absolute -left-2 top-[370px]"
        width="69"
        height="100"
        viewBox="0 0 69 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="18.8812" cy="50" rx="49.8812" ry="50" fill="#BD5141" />
      </svg>
      <svg
        className="absolute right-[0px] top-[642px]"
        width="121"
        height="160"
        viewBox="0 0 121 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="80.6202" cy="80" rx="80.6202" ry="80" fill="#EFAD5F" />
      </svg>

      <div className="flex flex-col items-center overflow-hidden rounded-md border-2 border-brand-gray shadow-xl">
        <div className="flex w-full justify-between border-b-2 border-brand-gray bg-brand-beige2 p-3">
          <Link href="/questions-page">
            <div className="cursor-pointer">Back</div>
          </Link>
          <div>Q&A</div>
          <div></div>
        </div>

        <div className="h-[586px] bg-white py-3 w-full px-4 z-10">
          <p className="py-5 font-bold">Got a question?</p>
          <p className="py-2 w-[80%] mb-3 text-xs">
            Ask it anonymously below. Look for your question projected in the
            TAZ
          </p>
          <input
            className="border-2 border-brand-gray w-full my-3 py-2 rounded-lg"
            onChange={(e) => {
              setMessageContent(e.target.value)
            }}
          ></input>
          {isLoading ? (
            <button className="bg-brand-beige2 w-full p-2 rounded-lg border-2 border-brand-gray shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
              Waiting for transaction
            </button>
          ) : (
            <button
              className="bg-brand-beige2 w-full p-2 rounded-lg border-2 border-brand-gray shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
              onClick={handleAskButton}
            >
              Ask
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-between w-[70%] py-6 text-white  z-[5]">
        <p className="underline">Share your feedback & claim your POAP!</p>
        <p className="ml-10">X</p>
        <div className="bg-black absolute w-full h-[20%] bottom-[50px] left-0 -z-10"></div>
      </div>

      <button className="p-4" onClick={clearIdentity}>
        Log Out
      </button>
    </div>
  )
}

export default AskQuestionComponent
