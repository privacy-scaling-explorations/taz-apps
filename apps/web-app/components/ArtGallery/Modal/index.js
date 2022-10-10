import React, { useState, useEffect } from "react"
import Link from "next/link"
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
                            <svg
                                className="mr-2"
                                width="18"
                                height="17"
                                viewBox="0 0 18 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    transform="translate(5,5)"
                                    d="M7.25467 1.49196C7.55767 1.20954 7.57439 0.73496 7.29194 0.431952C7.00957 0.128937 6.53497 0.112242 6.23197 0.394655L4.03739 2.44007L1.99196 0.24548C1.70954 -0.0575276 1.23496 -0.0742224 0.931952 0.20819C0.628937 0.490603 0.612242 0.96518 0.894655 1.2682L2.94007 3.46277L0.74548 5.50824C0.442472 5.79062 0.425778 6.26522 0.70819 6.56822C0.990603 6.87122 1.46518 6.88794 1.7682 6.60549L3.96277 4.56009L6.00824 6.75467C6.29062 7.05767 6.76522 7.07439 7.06822 6.79194C7.37122 6.50957 7.38794 6.03497 7.10549 5.73197L5.06009 3.53739L7.25467 1.49196Z"
                                    fill="black"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.75 8.5C0.75 3.94365 4.44365 0.25 9 0.25C13.5563 0.25 17.25 3.94365 17.25 8.5C17.25 13.0563 13.5563 16.75 9 16.75C4.44365 16.75 0.75 13.0563 0.75 8.5ZM9 15.25C5.27208 15.25 2.25 12.228 2.25 8.5C2.25 4.77208 5.27208 1.75 9 1.75C12.728 1.75 15.75 4.77208 15.75 8.5C15.75 12.228 12.728 15.25 9 15.25Z"
                                    fill="black"
                                />
                            </svg>
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
                                <svg
                                    width="14"
                                    height="13"
                                    viewBox="0 0 14 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12.4493 1.17132C13.9445 2.68332 13.996 5.09132 12.6053 6.66199L6.99998 12.3233L1.39601 6.66199C0.00526547 5.09132 0.0574847 2.67932 1.55201 1.17132C3.04917 -0.338013 5.44398 -0.38868 7.0013 1.01932C8.55399 -0.38668 10.9534 -0.340013 12.4493 1.17132ZM2.48732 2.11465C1.50243 3.10799 1.45286 4.69799 2.36041 5.74865L7.00064 10.436L11.6409 5.74932C12.5491 4.69799 12.4995 3.10999 11.5133 2.11332C10.5304 1.11999 8.94795 1.07199 7.90885 1.98932L5.13133 4.79132L4.19601 3.84865L6.06334 1.96399L6.00914 1.91799C4.96806 1.07465 3.44644 1.14665 2.48732 2.11465Z"
                                        fill="#1E1E1E"
                                    />
                                </svg>

                                {hasVoted ? (
                                    <button className="">Vote Submitted!</button>
                                ) : (
                                    <button onClick={handleSubmit} className="">
                                        Yes, Vote!
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center justify-between space-x-3 bg-brand-gray2 w-[190px] text-brand-beige rounded-full my-1 px-5 py-2">
                                <svg
                                    width="14"
                                    height="13"
                                    viewBox="0 0 14 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12.4493 1.17132C13.9445 2.68332 13.996 5.09132 12.6053 6.66199L6.99998 12.3233L1.39601 6.66199C0.00526547 5.09132 0.0574847 2.67932 1.55201 1.17132C3.04917 -0.338013 5.44398 -0.38868 7.0013 1.01932C8.55399 -0.38668 10.9534 -0.340013 12.4493 1.17132ZM2.48732 2.11465C1.50243 3.10799 1.45286 4.69799 2.36041 5.74865L7.00064 10.436L11.6409 5.74932C12.5491 4.69799 12.4995 3.10999 11.5133 2.11332C10.5304 1.11999 8.94795 1.07199 7.90885 1.98932L5.13133 4.79132L4.19601 3.84865L6.06334 1.96399L6.00914 1.91799C4.96806 1.07465 3.44644 1.14665 2.48732 2.11465Z"
                                        fill="#EAE1DA"
                                    />
                                </svg>
                                {hasVoted ? (
                                    <button className="">Already voted!</button>
                                ) : (
                                    <button onClick={() => setIsVoting(true)}>Vote favorite!</button>
                                )}
                            </div>
                        )}
                        {/* <button className="underline mx-2 mt-3" onClick={handleClose}>
                            cancel
                        </button> */}
                    </div>
                </div>
            )}
        </div>
    )
}
