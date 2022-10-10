import React, { forwardRef } from "react"
import Link from "next/link"

import { AnimatePresence } from "framer-motion"

import DrawingModal from "./drawingModal"
import EraseModal from "./eraseModal"
import GenerateTile from "./generateTile"
import BackArrow from "../svgElements/BackArrow"
import ProcessingModal from "../ProcessingModal"
import Loading from "../Loading"
import Flame from "../svgElements/Flame"
import Footer from "../Footer"

// import { Identity } from '@semaphore-protocol/identity'

// eslint-disable-next-line react/display-name
const ArtBoardComponent = forwardRef(
    ({
        isLoading,
        isComponentLoading,
        submit,
        setSelectedTile,
        selectedTile,
        tiles,
        lines,
        setLines,
        handleUndo,
        toggleTool,
        handleColorSelect,
        tool,
        stageRef,
        borderRef,
        canvasRef,
        color,
        fillColor,
        setFillColor,
        startDrawing,
        isDrawing,
        minimize,
        handleStartOver,
        handleClear,
        userSelectedTile,
        openProcessingModal,
        closeProcessingModal,
        eraseModalIsOpen,
        cancelEraseModal,
        acceptEraseModal,
        steps,
        fact,
        currentCanvas
    }) => {
        const tileCounter = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8]
        ]

        return (
            <div className="flex h-auto min-h-screen flex-col justify-between overflow-x-hidden">
                <EraseModal
                    eraseModalIsOpen={eraseModalIsOpen}
                    acceptEraseModal={acceptEraseModal}
                    cancelEraseModal={cancelEraseModal}
                />
                <ProcessingModal
                    isOpen={openProcessingModal}
                    closeModal={closeProcessingModal}
                    steps={steps}
                    fact={fact}
                />
                {isDrawing && (
                    <AnimatePresence initial={false} exitBeforeEnter onExitComplete={() => null} className="z-20">
                        <DrawingModal
                            stageRef={stageRef}
                            borderRef={borderRef}
                            color={color}
                            lines={lines}
                            setLines={setLines}
                            fillColor={fillColor}
                            setFillColor={setFillColor}
                            tool={tool}
                            toggleTool={toggleTool}
                            handleUndo={handleUndo}
                            handleColorSelect={handleColorSelect}
                            minimize={minimize}
                            tiles={tiles}
                            handleClear={handleClear}
                        />
                    </AnimatePresence>
                )}
                <div className="z-10 px-6 py-8 font-sans">
                    <div className="p-4 pb-6 min-w-[200px] relative border-2 border-brand-blue rounded-md bg-white drop-shadow-lg">
                        <div className="mb-4">
                            <Link href="/artGallery-page">
                                <div>
                                    <BackArrow />
                                </div>
                            </Link>
                        </div>
                        <div className="text-brand-brown mb-4">
                            <p className="text-sm w-full font-bold mb-4">
                                {userSelectedTile
                                    ? "Add your art or continue editing."
                                    : "To draw, choose 1 open tile."}
                            </p>
                            <p className="text-xs opacity-[70%]">
                                {userSelectedTile
                                    ? "Delete your drawing and pick a new tile or tap your tile to continue editing."
                                    : "Once you have created a drawing, you will be able to add it to the canvas."}
                            </p>
                        </div>
                        <div className="flex items-center justify-center">
                            {isComponentLoading ? (
                                <div className="my-10">
                                    <Loading size="xl" />
                                </div>
                            ) : (
                                <div ref={canvasRef} id="ipfsURI">
                                    <table className="border border-slate-200 border-collapse">
                                        <tbody>
                                            {tileCounter.map((counter) => (
                                                <tr className="w-full h-full border border-slate-200" key={counter}>
                                                    {counter.map((id) => (
                                                        <GenerateTile
                                                            startDrawing={startDrawing}
                                                            key={id}
                                                            selectedTile={selectedTile}
                                                            setSelectedTile={setSelectedTile}
                                                            i={id}
                                                            tiles={tiles}
                                                            color={color}
                                                            fillColor={fillColor}
                                                            stageRef={stageRef}
                                                            borderRef={borderRef}
                                                            lines={lines}
                                                            setLines={setLines}
                                                            userSelectedTile={userSelectedTile}
                                                        />
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        <div className="flex">
                            {userSelectedTile ? (
                                <div className="flex items-center justify-between w-full pt-6">
                                    <button
                                        className="flex items-center font-bold text-[14px] px-4 py-1.5 rounded-full border border-black"
                                        type="submit"
                                        onClick={handleStartOver}
                                    >
                                        <Flame />
                                        <div className="pl-2">New tile</div>
                                    </button>

                                    <button
                                        className="bg-brand-yellow font-bold text-brand-body px-4 py-1.5 rounded-full"
                                        type="submit"
                                        onClick={submit}
                                    >
                                        Add my art
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className="flex grid grid-rows-1 justify-items-center mt-5">
                        <p className="text-xs pb-2">You were randomly placed on</p>
                        <p className="text-xs">Canvas {currentCanvas}</p>
                    </div>
                </div>
                <div className="flex w-full justify-center bg-black pb-3 pt-9">
                    <Footer />
                </div>
            </div>
        )
    }
)

export default ArtBoardComponent
