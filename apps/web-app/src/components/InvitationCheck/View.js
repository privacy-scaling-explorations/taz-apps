import QrReader from 'react-qr-reader'
import { AnimatePresence } from 'framer-motion'
import LoadingModal from '../LoadingModal/Index'

// Page 1 it will check Invitation
const InvitationCheckComponent = ({
  isSignUp,
  handleSignUpButton,
  handleUploadQrCode,
  checkingIdentity,
  qrRef,
  handleError,
  handleScanQrCode,
  isLoading,
  handleStartScan,
  startScan,
  setSelected,
  selected,
  handleScan,
  setInvitation,
  data,
  validate,
  onClose,
  loadingMessage,
}) => {
  console.log('change')
  return (
    <div className="p-4 font-sans bg-brand-beige">
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
      {!isSignUp ? (
        <div className="flex flex-col items-center overflow-hidden rounded-md px-3 text-brand-gray2">
          <div className="h-[586px] py-3 w-full px-4 z-10">
            <div>
              <p className="py-5 font-bold mb-3 px-3 text-xl">Get started?</p>
              <button
                className="bg-brand-beige2 w-full p-2 border-2 border-brand-gray2 shadow-[-3px_3px_0px_0px_rgba(71,95,111)] mb-8"
                onClick={handleSignUpButton}
              >
                I`m new to TAZ
              </button>
              <button
                className="bg-brand-beige2 w-full p-2 border-2 border-brand-gray2 shadow-[-3px_3px_0px_0px_rgba(71,95,111)] mb-8"
                onClick={handleUploadQrCode}
              >
                {checkingIdentity
                  ? 'Checking Identity please wait'
                  : 'I`ve been here before'}
              </button>
              <QrReader
                className="border-0"
                ref={qrRef}
                delay={300}
                onError={handleError}
                onScan={handleScanQrCode}
                legacyMode
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center overflow-hidden rounded-md px-3 text-brand-gray2">
          <div className="h-[600px] py-3 w-full px-4 z-10">
            <p className="py-5 font-bold mb-3 px-3 text-xl">Get started?</p>

            <div>
              <button
                className="bg-brand-beige2 w-full p-2 border-2 border-brand-gray2 shadow-[-3px_3px_0px_0px_rgba(71,95,111)] mb-8"
                onClick={handleStartScan}
              >
                {startScan ? 'Stop Scan' : 'Scan Invitation QR Code'}
              </button>

              {startScan ? (
                <div className="flex items-center justify-center flex-col mb-10">
                  <select
                    className="mb-3"
                    onChange={(e) => setSelected(e.target.value)}
                  >
                    <option value={'environment'}>Back Camera</option>
                    <option value={'user'}>Front Camera</option>
                  </select>
                  <QrReader
                    facingMode={selected}
                    delay={1000}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '300px' }}
                  />
                </div>
              ) : (
                <div>
                  <p className="py-5 font-bold mb-3 px-3 text-xl">
                    Paste Invitation Code
                  </p>
                  <input
                    className="border-2 border-black w-full mb-3 py-2 rounded-lg"
                    onChange={(e) => setInvitation(e.target.value)}
                  ></input>
                </div>
              )}

              {data ? (
                <div>
                  <p className="font-bold">QrCode Key is:</p>
                  <p>{data}</p>
                </div>
              ) : null}
              <button
                className="bg-brand-beige2 w-full p-2 border-2 border-brand-gray2 shadow-[-3px_3px_0px_0px_rgba(71,95,111)] mb-[180px]"
                onClick={validate}
              >
                Submit
              </button>

              <button
                className="bg-brand-beige2 w-full p-2 border-2 border-brand-gray2 shadow-[-3px_3px_0px_0px_rgba(71,95,111)] mb-20"
                onClick={handleSignUpButton}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-[50px] left-0 -z-10 h-[20%] w-full bg-black"></div>
    </div>
  )
}

export default InvitationCheckComponent
