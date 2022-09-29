import React, { forwardRef } from 'react'
import { Stage, Layer, Line, Rect } from 'react-konva'

const DrawingHtml = forwardRef(({ color, stageRef, borderRef, lines, setLines, fillColor }) => {
  const isDrawing = React.useRef(false)
  const [tool] = React.useState('pen')
  const COLORCONVERT = {
    white: 'white',
    black: '#171717',
    'red-600': '#dc2626',
    'orange-500': '#f97316',
    'yellow-300': '#fde047',
    'green-600': '#16a34a',
    'blue-600': '#2563eb',
    'purple-600': '#9333ea'
  }

  const handleMouseDown = (e) => {
    isDrawing.current = true
    const pos = e.target.getStage().getPointerPosition()
    setLines([...lines, { tool, points: [pos.x, pos.y] }])
  }
  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return
    }
    const stage = e.target.getStage()
    const point = stage.getPointerPosition()
    const lastLine = lines[lines.length - 1]

    // set color
    lines[lines.length - 1].color = COLORCONVERT[color]

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
    <div ref={borderRef} className="border-black border touch-none bg-white h-[250] w-[250]">
      <Stage
        width={80}
        height={80}
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
          <Rect x={0} y={0} width={80} height={80} fill={COLORCONVERT[fillColor]} />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.color}
              strokeWidth={3}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  )
})

export default DrawingHtml
