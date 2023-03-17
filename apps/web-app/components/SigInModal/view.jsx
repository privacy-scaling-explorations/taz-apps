import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function SignInModalView(props) {
  return (
    <>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
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
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full h-full max-h-lg max-w-lg transform overflow-hidden rounded-lg border-brand-blue border-2 bg-white text-left align-middle shadow-xl transition-all">
                  <div className="p-4 mb-1 bg-brand-beige border-b-2 border-brand-blue">
                    <button
                      type="button"
                      className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-beige2"
                      onClick={props.closeModal}
                    >
                      <svg
                        className="mr-2"
                        width="18"
                        height="17"
                        viewBox="0 0 18 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* SVG content remains the same */}
                      </svg>
                      cancel
                    </button>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg left-10 pb-1 mx-4 font-medium leading-6 text-gray-900 border-b-2 border-brand-blue mt-2 align-self: center"
                  >
                    Sign In
                  </Dialog.Title>
                  <form className="p-4" onSubmit={props.handleSignIn}>
                    <div className="my-4">
                      <label
                        htmlFor="email"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="my-4">
                      <label
                        htmlFor="password"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                        placeholder="Enter your password"
                      />
                    </div>
                    <button
                      type="submit"

                      className="w-full my-2 py-2 px-4 bg-brand-blue text-white font-bold rounded-lg hover:bg-brand-blue-dark focus:outline-none"
                    >
                      Sign In
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
