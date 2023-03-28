import { Fragment, useRef, useState } from "react"

const PassportLoadingModal = () => (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75 z-[30]">
        <div className="bg-zulalu-primary text-white rounded-[16px] p-6">
            <h1>Connecting your passport...</h1>
        </div>
    </div>
)

export default PassportLoadingModal
