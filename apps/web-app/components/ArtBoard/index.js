import React, { useState, useEffect, useRef } from 'react'
import { useScreenshot } from 'use-react-screenshot'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useGenerateProof } from '../../hooks/useGenerateProof'
import ArtBoardComponent from './View'

const { FACTS } = require('../../data/facts.json')

export default function ArtBoard() {
  const [generateFullProof] = useGenerateProof()
  const [identityKey, setIdentityKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isComponentLoading, setIsComponentLoading] = useState(false)
  const [tool, setTool] = useState('pen')
  const [userSelectedTile, setUserSelectedTile] = useState(false)

  const [isDrawing, setIsDrawing] = useState(false)

  const [lines, setLines] = useState([])
  const [color, setColor] = React.useState('black')
  const [fillColor, setFillColor] = React.useState()

  const router = useRouter()

  const [selectedTile, setSelectedTile] = useState()
  const [tiles, setTiles] = useState([''])
  const [currentCanvas, setCurrentCanvas] = useState()

  const stageRef = useRef(null)
  const tilesRef = useRef()
  const canvasId = useRef(null)
  const runFetch = useRef(false)

  const canvasRef = useRef(null)
  const borderRef = useRef(null)
  const [image, takeScreenShot] = useScreenshot({})
  const [steps, setSteps] = useState([])
  const [fact, setFact] = useState(FACTS[Math.floor(Math.random() * FACTS.length)])

  useEffect(() => {
    let tilesTemp
    let selectedTileTemp
    let identityKeyTemp = ''
    if (identityKeyTemp === '') {
      identityKeyTemp = window.localStorage.getItem('identity')
      setIdentityKey(identityKeyTemp)
      // setIsMember(true)
    }
    const fetchData = async () => {
      setIsComponentLoading(true)

      if (runFetch.current === false) {
        try {
          const result = await axios.get('/api/modifyCanvas')
          console.log('result:')
          console.log(result)

          tilesTemp = result.data.canvas.tiles
          canvasId.current = result.data.canvas.canvasId
          setCurrentCanvas(result.data.canvas.canvasId)
          console.log('tilesTemp: ', tilesTemp)
          console.log('canvasId.current: ', canvasId.current)

          const remainingIndices = []

          for (let i = 0; i < tilesTemp.length; i++) {
            if (tilesTemp[i] === '') {
              remainingIndices.push(i)
            }
          }

          selectedTileTemp = remainingIndices[Math.floor(Math.random() * (remainingIndices.length - 1))] || 0

          console.log('selectedTileTemp: ', selectedTileTemp)
          setTiles(tilesTemp)
          tilesRef.current = tilesTemp
          setSelectedTile(selectedTileTemp)
          setIsComponentLoading(false)
        } catch (err) {
          console.log("Error with axios.get('/api/modifyCanvas')", err)
        }
      }
    }
    fetchData()
    return () => {
      console.log('Use Effect Finished')
      runFetch.current = true
    }
  }, [])

  const handleUndo = () => {
    lines.pop()
    setLines(lines.concat())
  }

  const toggleTool = (e) => {
    if (tool === 'pen') {
      console.log('settofill')
      setFillColor(color)
      setTool('fill')
    } else {
      setTool('pen')
    }
  }

  const startDrawing = (i) => {
    if (tiles[i] === '' && userSelectedTile === false) {
      setIsDrawing(true)
      setSelectedTile(i)
    } else if (i === selectedTile) {
      setIsDrawing(true)
    } else {
      console.log('You Cannot select this Tile')
    }

    // ------ For testing
    // setSelectedTile(i)
    // setIsDrawing(true)
  }
  const minimize = () => {
    const uri = stageRef.current.toDataURL()
    console.log('uri', uri)
    console.log('selectedTile', selectedTile)
    console.log('tiles', tiles)
    tiles[selectedTile] = uri
    setUserSelectedTile(true)
    setIsDrawing(false)
  }

  const handleColorSelect = (e) => {
    console.log('handleColorSelect: ', e.target)
    if (tool === 'fill') {
      setFillColor(e.target.id)
      setColor(e.target.id)
    } else {
      setColor(e.target.id)
    }
  }

  const generateCanvasUri = async () => {
    console.log('canvasRef.current: ', canvasRef.current)
    return await takeScreenShot(canvasRef.current)
  }

  const submit = async () => {
    // removeBorder
    // borderRef.current.className = 'touch-none bg-white h-[250] w-[250]'

    // const uri = stageRef.current.toDataURL()
    // tilesRef.current[selectedTile] = uri.toString()

    const tilesRemaining = tilesRef.current.filter((x) => x === '')

    let canvasUri
    if (tilesRemaining.length === 0) {
      setSelectedTile(-1)
      canvasUri = await generateCanvasUri()
    }

    // Should be renamed. This is for Posting data not loading.
    setIsLoading(true)
    setSteps([
      { status: 'processing', text: 'Generate zero knowledge proof' },
      { status: 'queued', text: 'Verify ZKP Membership and submit Art' }
    ])
    const signal = 'proposal_1'
    const { fullProofTemp, solidityProof, nullifierHash, externalNullifier, merkleTreeRoot, groupId } =
      await generateFullProof(identityKey, signal)
    // axios POSTs
    console.log('POSTING to /api/modifyCanvas:')
    console.log('tilesRef.current: ', tilesRef.current)
    console.log('canvasId.current: ', canvasId.current)

    // const response = await axios.post('/api/modifyCanvas', {
    //   updatedTiles: tilesRef.current,
    //   tileIndex: selectedTile,
    //   canvasId: canvasId.current
    // })
    // console.log('RESPONSE FROM /api/modifyCanvas:')
    // console.log(response)

    // if (response.status === 201) {
    //   router.push('/artGallery-page')
    // } else if (response.status === 203) {
    //   alert('Tile already exists, please submit another Tile')
    //   setIsLoading(false)
    // }

    try {
      setSteps([
        { status: 'complete', text: 'Generate zero knowledge proof' },
        { status: 'processing', text: 'Verify ZKP Membership and submit Art' }
      ])
      const response = await axios.post('/api/modifyCanvas', {
        updatedTiles: tilesRef.current,
        tileIndex: selectedTile,
        canvasId: canvasId.current
      })
      if (response.status === 201) {
        router.push('/artGallery-page')
      }
    } catch (error) {
      alert('Tile already exists, please submit another Tile')
      console.log('error', error)
      console.log('data', error.response.data.existingTile)
      tiles[selectedTile] = error.response.data.existingTile
      setIsLoading(false)
      setUserSelectedTile(false)
      setSelectedTile(null)
    }

    if (tilesRemaining.length === 0) {
      const body = {
        imageUri: canvasUri,
        canvasId: canvasId.current,
        groupId,
        signal,
        nullifierHash,
        externalNullifier,
        solidityProof,
        merkleTreeRoot
      }
      console.log('POSTING to /api/mintFullCanvas')
      console.log('canvasUri: ', canvasUri)
      console.log('canvasId.current: ', canvasId.current)
      setSteps([
        { status: 'complete', text: 'Generate zero knowledge proof' },
        { status: 'complete', text: 'Submit transaction with proof and Canva' },
        { status: 'processing', text: 'Update ArtGallery from on-chain events' }
      ])

      // Add Try and Catch
      const mintResponse = await axios.post('/api/mintFullCanvas', body)

      console.log('RESPONSE FROM /api/mintFullCanvas:', mintResponse)
      console.log('Canva Uri', mintResponse.ipfsUrl)

      const newCanvas = {
        id: 10000,
        timestamp: 999999999,
        tokenId: 0,
        uri: mintResponse.data.ipfsUrl,
        canvaUri: canvasUri
      }
      if (mintResponse.status === 201) {
        window.localStorage.setItem('savedCanva', JSON.stringify(newCanvas))
        router.push('/artGallery-page')
      } else if (mintResponse.status === 403) {
        alert('Tx have failed, please try submitting again')
      }
    }
  }

  const handleResetTile = () => {
    tiles[selectedTile] = ''
    setUserSelectedTile(false)
  }

  const closeProcessingModal = () => {
    setIsLoading(false)
  }

  const rotateFact = () => {
    setFact(FACTS[FACTS.indexOf(fact) + 1 === FACTS.length ? 0 : FACTS.indexOf(fact) + 1])
  }

  // const handleGenerateProof = async () => {
  //   const { fullProofTemp, solidityProof, nullifierHashTemp, externalNullifier, signal, merkleTreeRoot, groupId } =
  //     await generateFullProof(identityKey)
  //   console.log('fullProof', fullProofTemp)
  //   console.log('solidityProof', solidityProof)
  //   console.log('nullifierHashTemp', nullifierHashTemp)
  //   console.log('externalNullifier', externalNullifier)
  //   console.log('merkleTreeRoot', merkleTreeRoot)
  //   console.log('groupId', groupId)
  //   console.log('signal', signal)
  // }

  return (
    <ArtBoardComponent
      isLoading={isLoading}
      isComponentLoading={isComponentLoading}
      startDrawing={startDrawing}
      isDrawing={isDrawing}
      submit={submit}
      canvasRef={canvasRef}
      borderRef={borderRef}
      selectedTile={selectedTile}
      setSelectedTile={setSelectedTile}
      tiles={tiles}
      lines={lines}
      setLines={setLines}
      stageRef={stageRef}
      handleUndo={handleUndo}
      toggleTool={toggleTool}
      handleColorSelect={handleColorSelect}
      tool={tool}
      color={color}
      fillColor={fillColor}
      setColor={setColor}
      setFillColor={setFillColor}
      minimize={minimize}
      handleResetTile={handleResetTile}
      userSelectedTile={userSelectedTile}
      closeProcessingModal={closeProcessingModal}
      steps={steps}
      fact={fact}
      currentCanvas={currentCanvas}
    />
  )
}
