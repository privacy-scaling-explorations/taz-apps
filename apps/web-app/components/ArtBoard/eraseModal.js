import React, { forwardRef, Fragment, useRef } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { motion } from "framer-motion"

const EraseModal = ({ eraseModalIsOpen, acceptEraseModal, cancelEraseModal }) => {
    
    
    return <button onClick={console.log(eraseModalIsOpen)}>
        <p>click</p>
    </button>

}

export default EraseModal