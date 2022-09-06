import Link from 'next/link'
import LoadingModal from '../LoadingModal/Index.js'
import { AnimatePresence } from 'framer-motion'

// Page 3 will Generate Identity and Join Group
export const GenerateIdentityComponent = ({
  isLoading,
  onClose,
  loadingMessage,
  imageUrl,
  handleJoinButton,
}) => {
  return (
    <div className="p-4 font-sans bg-brand-beige">
      {/* {isLoading ? (
        <div className="absolute top-[0px] left-[0px] z-20">
          <LoadingModal onClose={onClose} loadingMessage={loadingMessage} />
        </div>
      ) : null} */}
      {isLoading ? (
        <AnimatePresence
          initial={false}
          exitBeforeEnter
          onExitComplete={() => null}
          className="z-20"
        >
          <LoadingModal onClose={onClose} loadingMessage={loadingMessage} />
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
      <div className="flex flex-col items-center rounded-md px-3 z-10">
        <div className="z-10 mt-3 h-[586px] w-full py-3 px-4">
          <p className="px-3 font-bold text-xl text-brand-gray2">
            To use the app you will need to join the Devcon VI group
          </p>
          {!imageUrl ? (
            <p className="mb-3 py-5 px-3 text-[#513E2E] text-sm">
              Click the <span className="underline">Join Button</span> to
              generate an Identity and join the Semaphore Devcon Group`
            </p>
          ) : (
            <p className="mb-3 py-5 px-3 text-[#513E2E] text-sm">
              Identity Generated! Please save or take a print screen of your QR
              code
            </p>
          )}

          {imageUrl ? (
            <div className="flex items-center justify-center flex-col">
              <a
                href={imageUrl}
                download="semaphore.jpg"
                className="flex items-center justify-center flex-col mb-5"
              >
                <img src={imageUrl} alt="img" className="mb-7 " />
                <button className="p-3 text-2xl font-bold bg-brand-beige2 border-brand-gray2 border-2  shadow-[-3px_3px_0px_0px_rgba(71,95,111)]">
                  Save to photo gallery
                </button>
              </a>
              <Link href="/experiences-page">
                <button className="p-3 text-2xl font-bold bg-brand-beige2 border-brand-gray2 border-2  shadow-[-3px_3px_0px_0px_rgba(71,95,111)]">
                  Enter the TAZ
                </button>
              </Link>
            </div>
          ) : (
            <button
              className="mb-9 w-full rounded-lg border-2 border-brand-gray2 bg-brand-beige2 p-2 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
              onClick={handleJoinButton}
            >
              {isLoading ? 'Generating Identity' : 'Join'}
            </button>
          )}
        </div>
      </div>

      <div className="absolute bottom-[50px] left-0 -z-10 h-[20%] w-full bg-black"></div>
    </div>
  )
}
