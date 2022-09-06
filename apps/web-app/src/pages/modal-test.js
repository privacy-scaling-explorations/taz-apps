import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
// import Modal from './Modal/Modal'
import LoadingModal from '../components/LoadingModal/Index.js'
import useGetMembers from '../hooks/useGetMembers.js'
import { useGenerateProof } from '../hooks/useGenerateProof.js'

// import './style.css'

export default function ModalTest() {
  const [showModal, setShowModal] = useState(false)
  const { data } = useGetMembers()

  const [generateFullProof] = useGenerateProof()

  console.log('Hook Result')
  console.log(generateFullProof)

  console.log('Use GenerateProof Hook')

  const handleGetMembersHook = async () => {
    console.log('Members List')
    const { membersList, group } = data
    console.log(membersList)
    console.log(group.root)
  }

  const handleGenerateProof = () => {
    console.log(generateFullProof)
    const [fullProof, solidityProof, proofNullifierHash, signal] =
      generateFullProof('secret-message')
    console.log(fullProof)
    console.log(solidityProof)
    console.log(proofNullifierHash)
    console.log(signal)
  }
  return (
    <div className="container flex items-center justify-center flex-col">
      <AnimatePresence
        initial={false}
        exitBeforeEnter
        onExitComplete={() => null}
      >
        {showModal && <LoadingModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
      <button
        className="button my-10 p-3 bg-gray-300"
        onClick={() => setShowModal(true)}
      >
        Show Modal
      </button>
      <button className="p-3 bg-gray-300 mt-5" onClick={handleGetMembersHook}>
        Test GetMembers Hook
      </button>
      <button className="p-3 bg-gray-300 mt-5" onClick={handleGenerateProof}>
        Generate Proof
      </button>
    </div>
  )
}
