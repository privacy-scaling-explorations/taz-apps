import Link from "next/link"
// import { AnimatePresence } from 'framer-motion'
// import LoadingModal from '../LoadingModal/Index.js'
import ProcessingModal from "../ProcessingModal"
import Header from "../Header/index.js"
import RedBunny from "../svgElements/RedBunny"
import Camera from "../svgElements/Camera"
import Footer from "../Footer"

// Page 3 will Generate Identity and Join Group
export default function GenerateIdentityComponent({
    isLoading,
    onClose,
    /* loadingMessage, */ imageUrl,
    handleJoinButton,
    steps,
    fact
}) {
    return (
        <div className="font-sans bg-brand-blue h-full">
            {/* {isLoading ? (
        <div className="absolute top-[0px] left-[0px] z-20">
          <LoadingModal onClose={onClose} loadingMessage={loadingMessage} />
        </div>
      ) : null} */}
            {/* {isLoading ? (
      <AnimatePresence initial={false} exitBeforeEnter onExitComplete={() => null} className="z-20">
        <LoadingModal onClose={onClose} loadingMessage={loadingMessage} />
      </AnimatePresence>
    ) : null} */}
            <ProcessingModal isOpen={isLoading} closeModal={onClose} steps={steps} fact={fact} />
            <Header />

            <div className="flex flex-col items-center rounded-md px-[32px] py-4 z-10">
                <div className="z-10 mt-3 min-h-[620px] h-auto w-full py-3">
                    {!imageUrl ? (
                        <div className="h-full w-full">
                            <p className="font-bold text-brand-h3 text-brand-beige">
                                You've been invited to Join a Semaphore Group
                            </p>
                            <div className="bg-brand-beige rounded-2xl mt-10 mb-3 relative shadow-[rgba(0,_0,_0,_0.38)_0px_4px_10px] h-[157px]">
                                <div className="p-5">
                                    <p className="text-brand-red text-brand-h3">SEMAPHORE GROUP</p>
                                    <p className="text-brand-gray2 text-brand-h1">DEVCON VI</p>
                                    <p className="text-brand-gray2 opacity-[70%] text-brand-body">
                                        Anonymity is stronger
                                    </p>
                                    <p className="text-brand-gray2 opacity-[70%] text-brand-body">in groups</p>
                                    <div className="absolute right-[48%] bottom-0">
                                        <RedBunny width="42" height="36" />
                                    </div>
                                    <div className="absolute right-[31%] bottom-0">
                                        <RedBunny width="58" height="45" />
                                    </div>
                                    <div className="absolute right-[3%] bottom-0">
                                        <RedBunny width="94" height="91" />
                                        {/* old version of bunny inside circle}
                                        {/* <svg
                                            width="106"
                                            height="86"
                                            viewBox="0 0 106 86"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M13.5201 91.225C13.5201 91.225 20.8306 67.7076 21.5801 62.3652C21.713 61.4005 21.6043 58.5579 22.4293 57.7709C23.898 56.372 30.6703 57.8723 32.3535 58.0411C34.7137 58.2781 46.1702 58.1488 47.379 60.7437C48.8054 63.8003 49.162 67.7805 49.6455 71.0131C49.8359 72.2743 50.0595 73.5311 50.2137 74.7966C51.3274 100.123 50.9995 87.6003 52.3943 112.975"
                                                stroke="#BD5141"
                                                strokeWidth="2.79259"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M62.8325 97.0878C61.249 103.431 60.6278 106.844 59.3646 113.27C72.9421 113.663 81.0689 108.335 94.0762 100.775C93.922 99.5096 93.0738 90.7821 92.8834 89.5209C92.3999 86.2883 92.0433 82.3081 90.6169 79.2515C89.4081 76.6566 77.9517 76.786 75.5915 76.5489C73.9082 76.3801 67.1359 74.8798 65.6672 76.2787C64.8422 77.0657 64.951 79.9083 64.818 80.873C64.0685 86.2154 64.1441 91.8341 62.8325 97.0878Z"
                                                fill="#BD5141"
                                                stroke="#BD5141"
                                                strokeWidth="2.79259"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M22.6328 57.133C24.0652 54.4016 22.654 49.6517 22.9169 46.6388C23.6422 38.3247 25.1653 30.5346 26.8666 22.4219C27.1265 21.1922 30.5475 16.777 32.2307 17.8475C33.7115 18.7871 33.2461 23.5566 33.0769 24.8437C32.7566 27.2913 32.2307 29.8534 32.2307 32.3777C32.2307 35.727 31.3846 38.9092 31.3846 42.3337C31.3846 42.5132 31.3846 41.9748 31.3846 41.7956C31.3846 40.9882 31.2637 40.173 31.3846 39.3739C31.6294 37.7506 31.9104 35.9384 32.2307 34.2613C33.098 29.7113 35.2739 26.0414 37.3138 22.1529C37.7671 21.2855 40.0125 18.9352 41.2636 19.7311C43.1674 20.9407 41.5507 30.753 40.9825 32.9158C40.0699 36.3924 39.0514 39.918 38.441 43.4099C38.3654 43.8524 38.0511 44.5066 38.441 44.7555C39.9731 45.7288 43.1916 43.4448 43.8051 46.3698C44.343 48.9379 44.343 52.1475 43.8051 54.7112C43.5089 56.1213 42.3938 57.57 42.3938 59.0166"
                                                stroke="#BD5141"
                                                strokeWidth="2.79259"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M67.5581 75.6369C68.9905 72.9055 67.5793 68.1556 67.8422 65.1427C68.5675 56.8286 70.0905 49.0385 71.7919 40.9258C72.0518 39.6961 75.4728 35.2809 77.156 36.3514C78.6368 37.291 78.1714 42.0605 78.0022 43.3476C77.6819 45.7952 77.156 48.3573 77.156 50.8816C77.156 54.2309 76.3099 57.4131 76.3099 60.8376C76.3099 61.0171 76.3099 60.4787 76.3099 60.2995C76.3099 59.4921 76.189 58.6769 76.3099 57.8778C76.5547 56.2545 76.8357 54.4423 77.156 52.7652C78.0233 48.2153 80.1992 44.5453 82.2391 40.6568C82.6924 39.7894 84.9377 37.4391 86.1889 38.235C88.0927 39.4446 86.476 49.2569 85.9078 51.4197C84.9952 54.8963 83.9767 58.4219 83.3663 61.9138C83.2907 62.3563 82.9764 63.0105 83.3663 63.2594C84.8984 64.2327 88.1169 61.9487 88.7304 64.8737C89.2683 67.4418 89.2683 70.6514 88.7304 73.2151C88.4342 74.6252 87.3191 76.0739 87.3191 77.5205"
                                                fill="#BD5141"
                                            />
                                            <path
                                                d="M67.5581 75.6369C68.9905 72.9055 67.5793 68.1556 67.8422 65.1427C68.5675 56.8286 70.0905 49.0385 71.7919 40.9258C72.0518 39.6961 75.4728 35.2809 77.156 36.3514C78.6368 37.291 78.1714 42.0605 78.0022 43.3476C77.6819 45.7952 77.156 48.3573 77.156 50.8816C77.156 54.2309 76.3099 57.4131 76.3099 60.8376C76.3099 61.0171 76.3099 60.4787 76.3099 60.2995C76.3099 59.4921 76.189 58.6769 76.3099 57.8778C76.5547 56.2545 76.8357 54.4423 77.156 52.7652C78.0233 48.2153 80.1992 44.5453 82.2391 40.6568C82.6924 39.7894 84.9377 37.4391 86.1889 38.235C88.0927 39.4446 86.476 49.2569 85.9078 51.4197C84.9952 54.8963 83.9767 58.4219 83.3663 61.9138C83.2907 62.3563 82.9764 63.0105 83.3663 63.2594C84.8984 64.2327 88.1169 61.9487 88.7304 64.8737C89.2683 67.4418 89.2683 70.6514 88.7304 73.2151C88.4342 74.6252 87.3191 76.0739 87.3191 77.5205L67.5581 75.6369Z"
                                                stroke="#BD5141"
                                                strokeWidth="2.79259"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <circle cx="58" cy="58" r="56.26" stroke="#BD5141" strokeWidth="3.48" />
                                        </svg> */}
                                    </div>
                                </div>
                            </div>
                            <p className="mb-4 pt-4 pb-8 text-brand-beige opacity-70 text-[14px]]">
                                Accepting this invitation will generate a Semaphore ID that will be added to the Devcon
                                VI group.
                            </p>
                            <div className="flex flex-col items-center justify-center">
                                <button
                                    className="w-full border-2 border-brand-gray2 bg-brand-yellow p-2 py-4 shadow-[-3px_3px_0px_0px_rgba(30,30,30)] text-brand-button"
                                    onClick={handleJoinButton}
                                >
                                    {isLoading ? (
                                        "Generating Identity"
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <span className="mr-4">Accept</span>
                                            <svg
                                                className="left-[16.67%] right-[16.67%] top-[17.59%] bottom-[17.59%]"
                                                width="16px"
                                                height="16px"
                                                viewBox="0 0 16 16"
                                                fill="#BD5141"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M12.172 6.99968L6.808 1.63568L8.222 0.22168L16 7.99968L8.222 15.7777L6.808 14.3637L12.172 8.99968H0V6.99968H12.172Z" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                                <Link
                                    href="https://pse-team.notion.site/Experience-zero-knowledge-1ae2793046414468b56472f43725961e"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <p className="mb-3 py-5 px-3 text-brand-beige opacity-70 text-xs">
                                        Learn more about <a className="underline">Semaphore</a>
                                    </p>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <p className="font-bold text-xl text-brand-beige">You’ve joined the group!</p>
                            <p className="mb-3 py-5 text-brand-beige opacity-[70%] text-[16px]">
                                Save this QR, it has your Semaphore ID and group membership
                            </p>
                            <div className="flex items-center justify-center flex-col">
                                <img src={imageUrl} alt="img" className="mb-7 rounded-xl" />
                                <div className="flex items-center pb-10">
                                    <p className="text-brand-beige">Screenshot Me!</p>
                                    <div className="px-2">
                                        <Camera />
                                    </div>
                                </div>
                                <Link href="/experiences-page">
                                    <button className="w-[100%] p-3 text-brand-button bg-brand-yellow border-brand-gray2 border-2  shadow-[-3px_3px_0px_0px_rgba(30,30,30)] flex items-center justify-center">
                                        <span className="mr-4">Enter TAZ</span>
                                        <svg
                                            className="left-[16.67%] right-[16.67%] top-[17.59%] bottom-[17.59%]"
                                            width="16px"
                                            height="16px"
                                            viewBox="0 0 16 16"
                                            fill="#BD5141"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M12.172 6.99968L6.808 1.63568L8.222 0.22168L16 7.99968L8.222 15.7777L6.808 14.3637L12.172 8.99968H0V6.99968H12.172Z" />
                                        </svg>
                                    </button>
                                </Link>
                                <p className="mb-3 py-5 text-brand-beige text-brand-info opacity-[70%] text-center">
                                    {`Your browser will remember your ID unless you remove it or use a private browser. Save the QR image in
              case your browser forgets :)`}
                                </p>
                            </div>

                            <div className="flex flex-col items-center justify-center"></div>
                        </div>
                    )}
                </div>
            </div>
            <div className="pb-6">
                <Footer />
            </div>
        </div>
    )
}
