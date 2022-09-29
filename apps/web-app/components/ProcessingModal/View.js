import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'

export default function LoadingModalView({ isOpen, closeModal, steps, fact }) {
  const questionTextRef = useRef(null)

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" initialFocus={questionTextRef} className="relative z-40" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-10/12 max-w-md transform overflow-hidden rounded-lg border-brand-blue border-2 bg-white text-left align-middle shadow-xl transition-all min-w-[240px]">
                <Dialog.Title
                  as="div"
                  className="text-brand-blue p-4 mb-1 bg-brand-beige2 border-b-2 border-brand-blue"
                >
                  <button
                    type="button"
                    className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-beige2"
                    onClick={closeModal}
                  >
                    Processing
                  </button>
                </Dialog.Title>
                <div>
                  <ol className=" list-none">
                    {steps.map((step, index) => (
                      <li key={index} className="flex p-3 border-b-2 border-brand-blue">
                        {
                          {
                            complete: (
                              <svg
                                className="min-w-[24px]"
                                width="24"
                                height="24"
                                viewBox="0 0 22 22"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11ZM11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 15.9706 15.9706 20 11 20Z"
                                  fill="#435C6C"
                                />
                                <path
                                  transform="translate(5,6)"
                                  d="M4.2426 9.31391L0 5.07121L1.41421 3.65701L4.2426 6.48551L9.8995 0.828613L11.3137 2.24283L4.2426 9.31391Z"
                                  fill="#435C6C"
                                />
                              </svg>
                            ),
                            processing: (
                              <svg
                                className="min-w-[24px] animate-spin"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13.5 1.83026V2.61115C13.5 3.11759 13.8413 3.5561 14.3291 3.69237C17.9627 4.70735 20.625 8.03942 20.625 11.9995C20.625 16.7662 16.7674 20.6245 12 20.6245C7.23335 20.6245 3.37502 16.7669 3.37502 11.9995C3.37502 8.03998 6.03687 4.70745 9.6709 3.69237C10.1587 3.5561 10.5 3.11749 10.5 2.61101V1.83064C10.5 1.09428 9.80468 0.557839 9.09162 0.741542C4.05954 2.03773 0.346617 6.61854 0.375163 12.0619C0.408913 18.4863 5.60065 23.638 12.0251 23.6245C18.4339 23.611 23.625 18.4114 23.625 11.9995C23.625 6.57921 19.9153 2.02549 14.8964 0.738448C14.1881 0.556807 13.5 1.09901 13.5 1.83026Z"
                                  fill="#BD5141"
                                />
                              </svg>
                            ),
                            queued: (
                              <svg
                                className="min-w-[24px]"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13.5 1.83026V2.61115C13.5 3.11759 13.8413 3.5561 14.3291 3.69237C17.9627 4.70735 20.625 8.03942 20.625 11.9995C20.625 16.7662 16.7674 20.6245 12 20.6245C7.23335 20.6245 3.37502 16.7669 3.37502 11.9995C3.37502 8.03998 6.03687 4.70745 9.6709 3.69237C10.1587 3.5561 10.5 3.11749 10.5 2.61101V1.83064C10.5 1.09428 9.80468 0.557839 9.09162 0.741542C4.05954 2.03773 0.346617 6.61854 0.375163 12.0619C0.408913 18.4863 5.60065 23.638 12.0251 23.6245C18.4339 23.611 23.625 18.4114 23.625 11.9995C23.625 6.57921 19.9153 2.02549 14.8964 0.738448C14.1881 0.556807 13.5 1.09901 13.5 1.83026Z"
                                  fill="#EAE1DA"
                                />
                              </svg>
                            )
                          }[step.status]
                        }
                        <span className="text-brand-brown ml-3">{step.text}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="relative p-4 bg-brand-beige2 h-[220px]">
                    <h3 className="text-brand-red text-sm">ZK facts</h3>
                    <p className="text-brand-blue duration-150 z-20 text-xs pt-2 pb-12">{fact}</p>
                    <svg
                      className="absolute right-2 bottom-0 z-0"
                      width="70"
                      height="65"
                      viewBox="0 0 70 65"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M53.6091 25.2896C53.5181 24.4184 53.4554 23.5433 53.4554 22.6559C53.4554 20.2187 52.9377 17.745 52.6224 15.3817C52.4558 14.139 51.9976 9.53403 53.4554 8.62677C55.1125 7.59324 58.4803 11.8561 58.7361 13.0435C60.4111 20.8765 61.9105 28.3979 62.6245 36.4253C62.8833 39.3343 62.0851 46.605 62.9042 46.5576C66.842 46.3296 65.6524 59.1629 68.7453 70.5962M53.6091 25.2896C53.8498 27.5935 54.2884 29.8695 54.2884 32.2687V31.7491C54.2884 30.9695 54.4074 30.1824 54.2884 29.4109C54.0873 28.1036 53.8615 26.6693 53.6091 25.2896ZM53.6091 25.2896C53.5589 25.0153 53.5077 24.7432 53.4554 24.4746C52.6015 20.0816 50.4595 16.5382 48.4513 12.7837C48.005 11.9462 45.7945 9.67699 44.5629 10.4455C42.6886 11.6133 44.2802 21.0873 44.8395 23.1755C45.738 26.5322 46.7406 29.9363 47.3416 33.3078C47.416 33.735 47.7254 34.3666 47.3416 34.6069C45.8332 35.5467 42.6648 33.3414 42.0609 36.1656C41.5313 38.6451 41.5313 41.744 42.0609 44.2194V48.8333C37.3408 47.9 36.8395 72.2235 36.1512 83.1333M10.0828 6L12.6319 12.5M14.6711 16V17M21.4487 21.2222L27.1899 25.6458V2.26389C27.1899 1.92869 27.0541 1.60721 26.8124 1.37018C26.5707 1.13316 26.243 1 25.9012 1H2.70471C2.36292 1 2.03514 1.13316 1.79347 1.37018C1.55179 1.60721 1.41602 1.92869 1.41602 2.26389V19.9583C1.41602 20.2935 1.55179 20.615 1.79347 20.852C2.03514 21.0891 2.36292 21.2222 2.70471 21.2222H21.4487Z"
                        stroke="#BD5141"
                        strokeWidth="1.63595"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
