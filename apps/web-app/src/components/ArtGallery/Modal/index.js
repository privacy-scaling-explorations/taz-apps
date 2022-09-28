import React, { useState } from 'react'
import axios from 'axios'
import ethers from 'ethers'
import ProcessingModal from '../../ProcessingModal'
import { useGenerateProofVote } from '../../../hooks/useGenerateProofVote'

// import { images } from '../data'

export default function Modal({
  images,
  onClose,
  activeImage,
  setActiveImage,
  isVoting,
  setIsVoting,
  changeTxLoadingModal
}) {
  const [steps, setSteps] = useState([])
  const [isTxLoading, setIsTxLoading] = useState(false)
  const [generateFullProofVote] = useGenerateProofVote()

  const handleControlTabClick = (e, image) => {
    e.stopPropagation()
    setActiveImage(image)
  }
  // Special thanks to fireship.io for this beautiful code snippet to animate modal drop in.

  const closeProcessingModal = () => {
    console.log('Closing')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setIsTxLoading(true)
    // setTimeout(openProcessingModal, CHAINED_MODAL_DELAY)

    setSteps([
      { status: 'processing', text: 'Generate zero knowledge proof' },
      { status: 'queued', text: 'Submit transaction with proof and vote' },
      { status: 'queued', text: 'Update vote from on-chain events' }
    ])
    const identityKey = window.localStorage.getItem('identity')
    // const messageContent = '1'
    const signal = '1'
    const { solidityProof, nullifierHash, externalNullifier, merkleTreeRoot, groupId } = await generateFullProofVote(
      identityKey,
      signal
    )

    setSteps([
      { status: 'complete', text: 'Generate zero knowledge proof' },
      { status: 'processing', text: 'Submit transaction with proof and vote' },
      { status: 'queued', text: 'Update vote from on-chain events' }
    ])

    const { tokenId } = activeImage

    const body = {
      tokenId,
      merkleTreeRoot,
      groupId,
      signal,
      nullifierHash,
      externalNullifier,
      solidityProof
    }
    console.log('ANSWERS PAGE | body', body)
    try {
      const postVote = await axios.post('/api/voteOnCanvas', body)
      console.log('Post Vote Response', postVote)
      setIsTxLoading(false)
    } catch (error) {
      alert('Your transaction has failed. Please try submitting again.')
      setIsTxLoading(false)
    }

    setSteps([
      { status: 'complete', text: 'Generate zero knowledge proof' },
      { status: 'complete', text: 'Submit transaction with proof and vote' },
      { status: 'processing', text: 'Update vote from on-chain events' }
    ])

    // setTimeout(internalCloseProcessingModal, 2000)
  }

  const isOpen = true

  return (
    // <div onClick={handleClick} className={styles.backdrop}>

    <div
      onClick={onClose}
      className="absolute left-0 top-0 bottom-0 right-0 h-[2000px] w-[100%] overflow-scroll bg-[#1E1E1E] bg-opacity-70 flex flex-col items-center justify-start z-20"
    >
      {isTxLoading ? (
        <ProcessingModal isOpen={isTxLoading} closeModal={changeTxLoadingModal} steps={steps} fact={2} />
      ) : (
        <div
          onClick={(e) => e.stopPropagation()}
          className="mt-[140px] w-[90%] sm:w-[50%] min-h-[30%] flex flex-col justify-center items-center bg-[#FFFFFF] border-2 border-brand-gray2 rounded-md"
        >
          <div className="py-4 text-[14px] w-full text-center border-b-2 border-b-brand-gray2">
            Canvas ID {activeImage.tokenId}
          </div>
          <button
            onClick={onClose}
            className="border-none h-[300px] w-[100%] max-w-[500px] max-h-[500px] "
            style={{
              backgroundImage: `url(${activeImage.url})`,
              backgroundSize: 'cover'
            }}
          ></button>
          <div className="flex flex-col py-4 text-[14px] w-full text-center border-t-2 border-t-brand-gray2 items-center">
            {isVoting ? (
              <button
                className=" bg-brand-gray2 max-w-[181px] text-brand-beige rounded-xl my-2 px-4 py-1"
                onClick={() => setIsVoting(true)}
              >
                Vote favorite!
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className=" bg-[#EFAD5F] max-w-[181px] text-brand-gray2 rounded-xl my-2 px-4 py-1"
              >
                Yes Vote!
              </button>
            )}

            <button className="underline mx-2 mt-3" onClick={onClose}>
              cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
