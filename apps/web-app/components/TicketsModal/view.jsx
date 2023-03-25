import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function TicketsModalView(props) {
  const downloadFile = async (url) => {
    const headers = {
      Accept: "application/json, text/javascript",
      Authorization: `Token ${process.env.NEXT_PUBLIC_PRETIX_API}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error("Error fetching file");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

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
                    className="text-lg left-10 pb-1 mx-4 font-medium  text-gray-900 border-b-2 border-brand-blue mt-2 align-self: center"
                  >
                    Available Tickets
                  </Dialog.Title>
                  <div className="p-4 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold mb-2">Session:</label>
                      {props.tickets
                        ? props.tickets.map((ticket, index) => (
                            <div className="text-xl" key={index}>{ticket.name}</div>
                          ))
                        : ""}
                    </div>
                    <div>
                      <label className="block font-bold mb-2">Tickets:</label>
                      {props.tickets
                        ? props.tickets.map((ticket, index) => (
                            <div key={index}>
                              <a >
                                <button onClick={downloadFile} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                  Download Ticket
                                </button>
                              </a>
                            </div>
                          ))
                        : ""}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
