import QrReader from 'react-qr-reader'
import { AnimatePresence } from 'framer-motion'
import { RiArrowRightLine, RiUploadLine } from 'react-icons/ri'
// import LoadingModal from '../LoadingModal/Index'
import ProcessingModal from '../ProcessingModal'
import Header from '../Header'
import Loading from '../Loading'
import Footer from '../Footer'

// Page 1 it will check Invitation
export default function InvitationCheckComponent({
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
  inviteCodeChangeHandler,
  setInvitation,
  data,
  handleValidate,
  onClose,
  loadingMessage,
  invitation,
  steps,
  fact
}) {
  console.log('change')
  return (
    <div className=" font-sans bg-brand-blue h-full">
      {/* {isLoading && (
        <AnimatePresence initial={false} exitBeforeEnter onExitComplete={() => null} className="z-20">
          <LoadingModal onClose={onClose} loadingMessage={loadingMessage} />
        </AnimatePresence>
      )} */}
      <ProcessingModal isOpen={isLoading} closeModal={onClose} steps={steps} fact={fact} />
      <Header />
      {!isSignUp ? (
        <div className="flex flex-col px-[32px] items-center overflow-hidden rounded-md  text-brand-gray2">
          <div className="min-h-[700px] h-auto py-3 w-full  z-10">
            <div className="divide-y divide-opacity-70">
              <div>
                <p className="pt-10 font-bold  text-brand-[20px] text-brand-beige">Do you have a TAZ invitation?</p>
                <p className="py-5 mb-8  text-brand-[16px] text-brand-beige opacity-70">
                  If not, visit a TAZ location to grab an invitation card.
                </p>
                <button
                  className="text-brand-button bg-brand-yellow flex items-center justify-center w-full py-4 border-2 border-brand-gray2 shadow-[-5px_5px_0px_0px_rgba(30,30,30)]"
                  onClick={handleSignUpButton}
                >
                  <span className="mr-4">Scan Invite</span>
                  <RiArrowRightLine size={24} fill="#BD5141" />
                </button>
                <p className="py-5 px-5 text-center text-brand-info text-brand-beige opacity-70">
                  This is an anonymous community space just for Devcon attendees.
                </p>
              </div>
              <div>
                <p className="py-5 font-bold mb-3 px-3 text-brand-h3 text-brand-beige outline-2 border-brand-black opacity-70">
                  Already a member?
                </p>
                <button
                  className="text-brand-button bg-brand-beige bg-opacity-10 w-full py-4 border-2 border-brand-beige text-brand-beige mb-8"
                  onClick={handleUploadQrCode}
                >
                  {checkingIdentity ? (
                    'Checking Identity please wait'
                  ) : (
                    <div className="flex items-center justify-center">
                      <span className="mr-4">Upload Sempahore ID</span>
                      <RiUploadLine size={24} fill="#EAE1DA" />
                    </div>
                  )}
                </button>

                <QrReader
                  className={`border-0 w-0 h-0`}
                  ref={qrRef}
                  delay={300}
                  onError={handleError}
                  onScan={handleScanQrCode}
                  legacyMode
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center overflow-hidden rounded-md px-3 text-brand-gray2">
          <div className="min-h-[650px] h-auto py-3 w-full px-4 z-10">
            <p className="pt-10 pb-5 font-bold mb-3 px-3 text-brand-h3 text-brand-beige">
              Scan the QR code on the invitation card
            </p>

            <div>
              <div className="flex items-center justify-center flex-col mb-5">
                <QrReader
                  facingMode={selected}
                  delay={1000}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ width: '300px' }}
                />
              </div>

              <div className="flex items-center justify-center flex-col">
                <button className="bg-brand-yellow px-3 py-1 rounded-full mb-5 text-xs" onClick={handleSignUpButton}>
                  Stop Scan
                </button>

                <input
                  className="border-solid border-2 border-brand-beige w-full mb-3 py-1 rounded-sm bg-[#F0EBE8] bg-opacity-10 max-w-[80%] text-brand-beige text-xl text-center"
                  type="text"
                  placeholder="invitation-code"
                  maxLength="8"
                  value={invitation}
                  onChange={inviteCodeChangeHandler}
                />
                <p className="text-brand-beige mb-3 px-1 text-sm opacity-70">or type the 8 digit code here</p>
              </div>

              {invitation && invitation.length > 5 && (
                <button
                  className="w-full border-2 border-brand-gray2 bg-brand-yellow p-2 py-4 mb-10 shadow-[-3px_3px_0px_0px_rgba(30,30,30)] text-sm flex items-center justify-center"
                  onClick={handleValidate}
                >
                  <span className="mr-4">Next</span>
                  <RiArrowRightLine size={24} fill="#BD5141" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="pb-6">
        <Footer />
      </div>
    </div>
  )
}
