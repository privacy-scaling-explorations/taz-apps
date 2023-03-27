import React, { useEffect } from "react"

type Props = {
    isOpen: boolean
    closeModal: (open: boolean) => void
}

const ContactModal = ({ isOpen, closeModal }: Props) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    if (!isOpen) {
        return null
    }

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center" onClick={() => closeModal(false)}>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div
                className="relative bg-gray-100 p-6 w-full max-w-md mx-auto rounded-lg shadow-md"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
                <h3 className="text-4xl font-semibold text-gray-900 mb-4">Contact</h3>
                <p className="text-lg text-gray-700">
                    For event or venue support, please email at{" "}
                    <a href="mailto:support@zuzalu.org" className="text-blue-500 hover:underline">
                        support@zuzalu.org
                    </a>
                    .
                </p>
                <br />
                <p className="text-lg text-gray-700">
                    For support related to Zuzalu Passport, please email{" "}
                    <a href="mailto:passport@0xparc.org" className="text-blue-500 hover:underline">
                        passport@0xparc.org
                    </a>
                    .
                </p>
                <div className="mt-4">
                    <button
                        className="bg-white border border-primary text-zulalu-primary font-semibold py-2 px-4 rounded-lg hover:bg-primary hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={() => closeModal(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ContactModal
