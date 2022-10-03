import React, { forwardRef } from "react"
import { Stage, Layer, Line, Rect } from "react-konva"
import { motion } from "framer-motion"

import Minimize from "../svgElements/Minimize"
import PaintbrushEmpty from "../svgElements/PaintbrushEmpty"
import PaintbrushFull from "../svgElements/PaintbrushFull"
import PaintBucketEmpty from "../svgElements/PaintBucketEmpty"
import PaintBucketFull from "../svgElements/PaintBucketFull"
import Undo from "../svgElements/Undo"
import TrashCan from "../svgElements/TrashCan"

const DrawingHtml = forwardRef(
    ({
        minimize,
        handleColorSelect,
        handleUndo,
        toggleTool,
        tool,
        color,
        stageRef,
        borderRef,
        lines,
        setLines,
        fillColor,
        handleClear
    }) => {
        const isDrawing = React.useRef(false)
        const drawingSize = 300

        const dropIn = {
            hidden: {
                y: "-200vh",
                opacity: 0
            },
            visible: {
                y: "0",
                opacity: 1,
                transition: {
                    duration: 0.1,
                    type: "spring",
                    damping: 25,
                    stiffness: 500
                }
            },
            exit: {
                y: "-200vh",
                opacity: 0
            }
        }

        const handleMouseDown = (e) => {
            if (tool !== "pen") return
            isDrawing.current = true
            const pos = e.target.getStage().getPointerPosition()
            setLines([...lines, { tool, points: [pos.x, pos.y] }])
        }
        const handleMouseMove = (e) => {
            if (tool !== "pen") return
            // no drawing - skipping
            if (!isDrawing.current) {
                return
            }
            const stage = e.target.getStage()
            const point = stage.getPointerPosition()
            const lastLine = lines[lines.length - 1]

            // set color
            lines[lines.length - 1].color = color

            // add point
            lastLine.points = lastLine.points.concat([point.x, point.y])

            // replace last
            lines.splice(lines.length - 1, 1, lastLine)
            setLines(lines.concat())
        }

        const handleMouseUp = () => {
            isDrawing.current = false
        }

        return (
            <div className="absolute top-0 left-0 bottom-0 right-0 h-[100%] w-[100%] m-0 bg-[#00000070] flex flex-col items-center justify-center px-5 z-20">
                <motion.div
                    variants={dropIn}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={(e) => e.stopPropagation()}
                    className=" w-flex h-flex p-2 bg-white border-2 border-black flex flex-col items-center justify-center rounded-[5px]"
                >
                    <div className="flex flex-row w-full items-center justify-between py-1">
                        <button
                            className="text-xs font-bold border border-black border-2 p-1.5 px-4 rounded-full flex flex-row items-center"
                            type="submit"
                            onClick={handleClear}
                        >
                            <TrashCan />
                            <p className="pl-2">Clear</p>
                        </button>
                        <div className="cursor-pointer" onClick={toggleTool}>
                            {tool === "pen" ? <PaintbrushFull /> : <PaintbrushEmpty />}
                        </div>
                        <div className="cursor-pointer" onClick={toggleTool}>
                            {tool === "fill" ? <PaintBucketFull /> : <PaintBucketEmpty />}
                        </div>
                        <button
                            className="text-xs font-bold border border-black border-2 p-1.5 px-4 rounded-full flex flex-row items-center"
                            type="submit"
                            onClick={handleUndo}
                        >
                            <Undo />
                            <p className="pl-2">Undo</p>
                        </button>
                    </div>
                    <div className="grid grid-rows-1 py-1 grid-cols-9">
                        <div>
                            <button
                                id="#BD4157"
                                aria-label="color picker 1"
                                className={
                                    color === "#BD4157"
                                        ? "ring ring-offset-4 ring-slate-500 ring-4 w-6 h-6 m-[5px] bg-[#BD4157] rounded-full"
                                        : "w-6 h-6 m-[5px] bg-[#BD4157] rounded-full"
                                }
                                type="submit"
                                onClick={(e) => handleColorSelect(e)}
                            />
                        </div>
                        <div>
                            <button
                                id="#EE8C45"
                                aria-label="color picker 2"
                                className={
                                    color === "#EE8C45"
                                        ? "ring ring-offset-4 ring-slate-500 ring-4 w-6 h-6 m-[5px] bg-[#EE8C45] rounded-full"
                                        : "w-6 h-6 m-[5px] bg-[#EE8C45] rounded-full"
                                }
                                type="submit"
                                onClick={(e) => handleColorSelect(e)}
                            />
                        </div>
                        <div>
                            <button
                                id="#EFD85F"
                                aria-label="color picker3"
                                className={
                                    color === "#EFD85F"
                                        ? "ring ring-offset-4 ring-slate-500 ring-4 w-6 h-6 m-[5px] bg-[#EFD85F] rounded-full"
                                        : "w-6 h-6 m-[5px] bg-[#EFD85F] rounded-full"
                                }
                                type="submit"
                                onClick={(e) => handleColorSelect(e)}
                            />
                        </div>
                        <div>
                            <button
                                id="#90B188"
                                aria-label="color picker4"
                                className={
                                    color === "#90B188"
                                        ? "ring ring-offset-4 ring-slate-500 ring-4 w-6 h-6 m-[5px] bg-[#90B188] rounded-full"
                                        : "w-6 h-6 m-[5px] bg-[#90B188] rounded-full"
                                }
                                type="submit"
                                onClick={(e) => handleColorSelect(e)}
                            />
                        </div>
                        <div>
                            <button
                                id="#5F99EF"
                                aria-label="color picker5"
                                className={
                                    color === "#5F99EF"
                                        ? "ring ring-offset-4 ring-slate-500 ring-4 w-6 h-6 m-[5px] bg-[#5F99EF] rounded-full"
                                        : "w-6 h-6 m-[5px] bg-[#5F99EF] rounded-full"
                                }
                                type="submit"
                                onClick={(e) => handleColorSelect(e)}
                            />
                        </div>
                        <div>
                            <button
                                id="#2A4D91"
                                aria-label="color picker6"
                                className={
                                    color === "#2A4D91"
                                        ? "ring ring-offset-4 ring-slate-500 ring-4 w-6 h-6 m-[5px] bg-[#2A4D91] rounded-full"
                                        : "w-6 h-6 m-[5px] bg-[#2A4D91] rounded-full"
                                }
                                type="submit"
                                onClick={(e) => handleColorSelect(e)}
                            />
                        </div>
                        <div>
                            <button
                                id="#8679AB"
                                aria-label="color picker7"
                                className={
                                    color === "#8679AB"
                                        ? "ring ring-offset-4 ring-slate-500 ring-4 w-6 h-6 m-[5px] bg-[#8679AB] rounded-full"
                                        : "w-6 h-6 m-[5px] bg-[#8679AB] rounded-full"
                                }
                                type="submit"
                                onClick={(e) => handleColorSelect(e)}
                            />
                        </div>
                        <div>
                            <button
                                id="#000000"
                                aria-label="color picker8"
                                className={
                                    color === "#000000"
                                        ? "ring ring-offset-4 ring-slate-500 ring-4 w-6 h-6 m-[5px] bg-[#000000] rounded-full"
                                        : "w-6 h-6 m-[5px] bg-[#000000] rounded-full"
                                }
                                type="submit"
                                onClick={(e) => handleColorSelect(e)}
                            />
                        </div>
                        <div>
                            <button
                                id="#FFFFFF"
                                aria-label="color picker 9"
                                className={
                                    color === "#FFFFFF"
                                        ? 'ring ring-offset-4 ring-slate-500 ring-4 border border-black w-6 h-6 m-[5px] bg-["#FFFFFF"] rounded-full'
                                        : 'w-6 h-6 m-[5px] bg-["#FFFFFF"] rounded-full border border-black'
                                }
                                type="submit"
                                onClick={(e) => handleColorSelect(e)}
                            />
                        </div>
                    </div>
                    <div ref={borderRef} className="border-black border touch-none bg-white h-[250] w-[250]">
                        <Stage
                            width={drawingSize}
                            height={drawingSize}
                            onTouchStart={handleMouseDown}
                            onTouchEnd={handleMouseUp}
                            onTouchmove={handleMouseMove}
                            onMouseDown={handleMouseDown}
                            onMousemove={handleMouseMove}
                            onMouseup={handleMouseUp}
                            ref={stageRef}
                        >
                            <Layer>
                                {/* <Text text="Just start drawing" x={5} y={30} /> */}
                                <Rect x={0} y={0} width={drawingSize} height={drawingSize} fill={fillColor} />
                                {lines.map((line, i) => (
                                    <Line
                                        key={i}
                                        points={line.points}
                                        stroke={line.color}
                                        strokeWidth={3}
                                        tension={0.5}
                                        lineCap="round"
                                        lineJoin="round"
                                        globalCompositeOperation={
                                            line.tool === "eraser" ? "destination-out" : "source-over"
                                        }
                                    />
                                ))}
                            </Layer>
                        </Stage>
                    </div>
                    <div className="flex flex-row w-full justify-center items-center mt-3 mb-1">
                        <button
                            className="bg-black text-xs text-brand-beige px-4 p-1.5 items-center rounded-full flex flex-row"
                            type="submit"
                            onClick={minimize}
                        >
                            <Minimize />
                            <p className="pl-4 text-brand-beige">preview on canvas</p>
                        </button>
                    </div>
                </motion.div>
            </div>
        )
    }
)

export default DrawingHtml
