import React, { useState, useEffect } from "react"
import axios from "axios"
import ethers from "ethers"
import ProcessingModal from "../../ProcessingModal"
import { useGenerateProofVote } from "../../../hooks/useGenerateProofVote"

const { FACTS } = require("../../../data/facts.json")
const {
    API_REQUEST_TIMEOUT,
    FACT_ROTATION_INTERVAL,
    CHAINED_MODAL_DELAY,
    ITEMS_PER_FETCH
} = require("../../../config/goerli.json")



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
    const [fact,setFact] = useState([FACTS[0]])
    const [generateFullProofVote] = useGenerateProofVote()

    const handleControlTabClick = (e, image) => {
        e.stopPropagation()
        setActiveImage(image)
    }
    // Special thanks to fireship.io for this beautiful code snippet to animate modal drop in.

    const closeProcessingModal = () => {
        console.log("Closing")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        setIsTxLoading(true)
        // setTimeout(openProcessingModal, CHAINED_MODAL_DELAY)

        setSteps([
            { status: "processing", text: "Generate zero knowledge proof" },
            { status: "queued", text: "Submit transaction with proof and vote" },
            { status: "queued", text: "Update vote from on-chain events" }
        ])
        const identityKey = window.localStorage.getItem("identity")
        // const messageContent = '1'
        const signal = "1"
        const { solidityProof, nullifierHash, externalNullifier, merkleTreeRoot, groupId } =
            await generateFullProofVote(identityKey, signal)

        setSteps([
            { status: "complete", text: "Generate zero knowledge proof" },
            { status: "processing", text: "Submit transaction with proof and vote" },
            { status: "queued", text: "Update vote from on-chain events" }
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
        console.log("ANSWERS PAGE | body", body)
        try {
            const postVote = await axios.post("/api/voteOnCanvas", body)
            console.log("Post Vote Response", postVote)
            setIsTxLoading(false)
        } catch (error) {
            alert("You can only vote once!")
            setIsTxLoading(false)
        }

        setSteps([
            { status: "complete", text: "Generate zero knowledge proof" },
            { status: "complete", text: "Submit transaction with proof and vote" },
            { status: "processing", text: "Update vote from on-chain events" }
        ])

        // setTimeout(internalCloseProcessingModal, 2000)
    }

    const isOpen = true

    const handleClose = () => {
        setIsVoting(false)
        onClose()
    }

    useEffect(() => {
        setTimeout(rotateFact, FACT_ROTATION_INTERVAL)
    }, [fact])

    const rotateFact = () => {
        setFact(FACTS[FACTS.indexOf(fact) + 1 === FACTS.length ? 0 : FACTS.indexOf(fact) + 1])
    }


    return (
        // <div onClick={handleClick} className={styles.backdrop}>

        <div
            onClick={handleClose}
            className="fixed left-0 top-0 bottom-0 right-0 h-[100%] w-[100%] overflow-scroll bg-[#1E1E1E] bg-opacity-70 flex flex-col items-center justify-start z-20"
        >
            {isTxLoading ? (
                <ProcessingModal isOpen={isTxLoading} closeModal={changeTxLoadingModal} steps={steps} fact={fact} />
            ) : (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="mt-[140px] w-[90%] sm:w-[50%] min-h-[30%] flex flex-col justify-center items-center bg-[#FFFFFF] border-2 border-brand-gray2 rounded-md"
                >
                    <div className="py-4 text-[14px] w-full text-center border-b-2 border-b-brand-gray2">
                        Canvas ID {activeImage.tokenId}
                    </div>
          
                        {isVoting ? 
                            <div className="relative flex flex-col items-center justify center">
                                <img className="opacity-20" src={activeImage.url}></img>
                                <div className="absolute mt-16 px-12 text-center flex flex-col items-center ">
                                    <p className="mb-10 text-[16px] font-bold px-3">You only get 1 vote. Use it now?</p>
                                    <p className="text-[#787878] text-[12px] px-3">Voting Window</p>
                                    <p className="mb-10 text-[#787878] text-[12px] px-3">October 10-15, 2022</p>
                                    <p className="text-[#787878] text-[12px] px-3">Learn more about <a className="underline">Semaphore Voting</a></p>
                                </div>
                            </div>
                            :
                            <img src={activeImage.url}></img>}
         
 
                    <div className="flex flex-col py-4 text-[14px] w-full text-center border-t-2 border-t-brand-gray2 items-center">
                        {isVoting ? (
                            <button
                                onClick={handleSubmit}
                                className=" bg-[#EFAD5F] max-w-[181px] text-brand-gray2 rounded-xl my-2 px-4 py-1"
                            >
                                Yes Vote!
                            </button>
                     
                        ) : (
                  
                            <button
                                className=" bg-brand-gray2 max-w-[181px] text-brand-beige rounded-xl my-2 px-4 py-1"
                                onClick={() => setIsVoting(true)}
                            >
                                Vote favorite!
                            </button>
                        )}

                        <button className="underline mx-2 mt-3" onClick={handleClose}>
                            cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
