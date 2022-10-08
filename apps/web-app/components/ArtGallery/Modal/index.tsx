import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useGenerateProofVote } from "../../../hooks/useGenerateProofVote"
import ProcessingModal from "../../ProcessingModal"
import Cancel from "../../svgElements/Cancel"
import Heart from "../../svgElements/Heart"

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
    const [fact, setFact] = useState([FACTS[0]])
    const [image, setImage] = useState(activeImage)
    const [hasVoted, setHasVoted] = useState(window.localStorage.getItem("voted"))

    const [generateFullProofVote] = useGenerateProofVote()

    console.log("hasVoted", hasVoted)

    console.log("active Image", activeImage.url)

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
            { status: "processing", text: "Generating zero knowledge proof" },
            { status: "queued", text: "Submit transaction with proof and vote" },
            { status: "queued", text: "Update vote from on-chain events" }
        ])
        const identityKey = window.localStorage.getItem("identity")
        // const messageContent = '1'
        const signal = "1"
        const { solidityProof, nullifierHash, externalNullifier, merkleTreeRoot, groupId } =
            await generateFullProofVote(identityKey, signal)

        setSteps([
            { status: "complete", text: "Generated zero knowledge proof" },
            { status: "processing", text: "Submitting transaction with proof and vote" },
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
            window.localStorage.setItem("voted", "true")
            setHasVoted("true")
            setIsTxLoading(false)
        } catch (error) {
            alert("You can only vote once!")
            setIsTxLoading(false)
        }

        setSteps([
            { status: "complete", text: "Generated zero knowledge proof" },
            { status: "complete", text: "Submitted transaction with proof and vote" },
            { status: "processing", text: "Updating vote from on-chain events" }
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
                    <div className="p-4 text-[14px] w-full flex flex-row justify-between border-b-2 border-b-brand-gray2">
                        <div className="flex flex-row">Canvas {activeImage.tokenId}</div>
                        <button className="flex flex-row" onClick={handleClose}>
                            <Cancel />
                        </button>
                    </div>

                    {isVoting ? (
                        <div className="relative flex flex-col items-center justify center">
                            <img className="opacity-20" src={image.url}></img>

                            {hasVoted ? (
                                <div className="absolute mt-16 text-center flex flex-col items-center ">
                                    <p className="text-[28px] font-bold">Thank you for</p>
                                    <p className="mb-10 text-[28px] font-bold">your vote!</p>
                                    <p className="mb-10 text-[#787878] text-[15px] font-extrabold">
                                        Voting window October 11-14, 2022
                                    </p>
                                    <Link
                                        href="https://pse-team.notion.site/Experience-zero-knowledge-1ae2793046414468b56472f43725961e"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <p className="text-[#787878] text-brand-info px-3">
                                            Learn more about <a className="underline">Semaphore voting</a>
                                        </p>
                                    </Link>
                                </div>
                            ) : (
                                <div className="absolute mt-16 text-center flex flex-col items-center ">
                                    <p className="text-[28px] font-bold">YOU GET ONE VOTE.</p>
                                    <p className="mb-10 text-[28px] font-bold">USE IT NOW?</p>
                                    <p className="mb-10 text-[#787878] text-[15px] font-extrabold">
                                        Voting window October 11-14, 2022
                                    </p>
                                    <Link
                                        href="https://pse-team.notion.site/Experience-zero-knowledge-1ae2793046414468b56472f43725961e"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <p className="text-[#787878] text-brand-info px-3">
                                            Learn more about <a className="underline">Semaphore voting</a>
                                        </p>
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <img src={image.url}></img>
                    )}

                    <div className="flex flex-col py-4 text-[14px] w-full h-full text-center border-t-2 border-t-brand-gray2 items-center">
                        {isVoting ? (
                            <div className="flex items-center justify-between space-x-3 bg-brand-yellow w-[145px] text-brand-gray2 rounded-full my-1 px-4 py-2">
                                <Heart color="black" />
                                {hasVoted ? (
                                    <button className="">Submitted!</button>
                                ) : (
                                    <button onClick={handleSubmit} className="">
                                        Yes, Vote!
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center justify-between space-x-3 bg-brand-gray2 w-[190px] text-brand-beige rounded-full my-1 px-5 py-2">
                                <Heart color="white" />
                                {hasVoted ? (
                                    <button className="">Already voted!</button>
                                ) : (
                                    <button onClick={() => setIsVoting(true)}>Vote favorite!</button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
