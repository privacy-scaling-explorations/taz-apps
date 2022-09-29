import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Identity } from '@semaphore-protocol/identity'

import { useIdentityLoginContext } from '../../context/IdentityContextProvider'
// import useGetMembers from '../../hooks/useGetMembers'
import ValidateInvitationComponent from './View'

// const { Subgraph } = require('@semaphore-protocol/subgraph')
import { Subgraphs } from '../../hooks/subgraphs'

const { GROUP_ID, FACT_ROTATION_INTERVAL } = require('../../config/goerli.json')
const { FACTS } = require('../../data/facts.json')

// Page 1 it will check Invitation
export default function InvitationCheck() {
  const [selected, setSelected] = useState('environment')
  const [startScan, setStartScan] = useState(false)
  // const [loadingScan, setLoadingScan] = useState(false)
  const [data, setData] = useState('')
  const onSetIdentity = useIdentityLoginContext()
  const [invitation, setInvitation] = useState('')
  const [response, setResponse] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [checkingIdentity, setCheckingIdenty] = useState(false)
  // const [loadingMessage, setLoadingMessage] = useState('This is a Loading Message')
  const [steps, setSteps] = useState([])
  const [fact, setFact] = useState(FACTS[Math.floor(Math.random() * FACTS.length)])
  // const [members, setMembers] = useState([])
  const router = useRouter()

  const qrRef = useRef(null)

  const inviteCodeChangeHandler = (event) => {
    setInvitation(event.target.value)
  }

  const validate = async (invitationCode) => {
    if (invitationCode.length < 8) {
      alert('Error: must be 8 characters')
      return
    }

    setIsLoading(true)
    // setLoadingMessage('Verifying your Invitation-Code')

    setSteps([{ status: 'processing', text: 'Verifying invite is valid' }])

    const apiResponse = await axios.post('/api/validateInvitation', {
      invitation: invitationCode
    })
    console.log('Is code valid and not used yet? ', apiResponse.data.isValid)

    // console.log(apiResponse.data.isValid)
    setResponse(apiResponse.data.isValid)

    if (apiResponse.data.isValid) {
      setSteps([{ status: 'complete', text: 'Verified invite is valid' }])

      console.log(response)
      console.log('moving to generate Id Page')
      router.push(`/generate-id-page?invitation=${invitationCode}`)
    } else if (apiResponse.data.isValid === false) {
      setIsLoading(false)
      alert('Invalid Invitation code')
    }
  }

  const handleScan = async (scanData) => {
    // setLoadingScan(true)
    try {
      if (scanData && scanData !== '') {
        const scanDataCode = scanData.slice(-8)
        console.log(`loaded >>>`, scanDataCode)
        setData(scanDataCode)
        setStartScan(false)
        setInvitation(scanDataCode)
        validate(scanDataCode)
      }
    } catch {
      console.log('error')
    }
  }

  const handleSignUpButton = async () => {
    setIsSignUp(!isSignUp)
  }

  const handleStartScan = () => {
    try {
      setStartScan(!startScan)
    } catch {
      console.log('error')
    }
  }

  const handleUploadQrCode = () => {
    qrRef.current.openImageDialog()
  }

  const handleError = (err) => {
    console.error(err)
  }

  const handleScanQrCode = async (result) => {
    if (result) {
      setCheckingIdenty(true)
      console.log('Scanned', result)

      // check it identity is part of members array
      const checkIdentity = new Identity(result)
      const checkIdentityCommitment = checkIdentity.generateCommitment().toString()

      //   const subgraph = new Subgraph('goerli')
      //   const { members } = await subgraph.getGroup('10803', { members: true })
      //   console.log('Checking Members')
      //   console.log(members)
      //   const check = members.includes(checkIdentityCommitment)

      const subgraphs = new Subgraphs()
      const check = await subgraphs.isVerifiedGroupIdentity(GROUP_ID.toString(), checkIdentityCommitment)
      console.log('Is Identity part of Semaphore?', check)

      if (check) {
        onSetIdentity(result)
        router.push(`/`)
      } else {
        alert('Identity is not part of the Semaphore Group')
      }
      setCheckingIdenty(false)
    }
  }

  const onClose = () => {
    // setIsLoading(!isLoading)
    setIsLoading(true) // Don't allow user to close
  }

  const rotateFact = () => {
    setFact(FACTS[FACTS.indexOf(fact) + 1 === FACTS.length ? 0 : FACTS.indexOf(fact) + 1])
  }

  const handleValidate = () => {
    validate(invitation)
  }

  useEffect(() => {
    setTimeout(rotateFact, FACT_ROTATION_INTERVAL)
  }, [fact])

  return (
    <ValidateInvitationComponent
      isSignUp={isSignUp}
      handleSignUpButton={handleSignUpButton}
      handleUploadQrCode={handleUploadQrCode}
      checkingIdentity={checkingIdentity}
      qrRef={qrRef}
      handleError={handleError}
      handleScanQrCode={handleScanQrCode}
      isLoading={isLoading}
      handleStartScan={handleStartScan}
      startScan={startScan}
      setSelected={setSelected}
      selected={selected}
      handleScan={handleScan}
      invitation={invitation}
      inviteCodeChangeHandler={inviteCodeChangeHandler}
      data={data}
      handleValidate={handleValidate}
      onClose={onClose}
      // loadingMessage={loadingMessage}
      steps={steps}
      fact={fact}
    />
  )
}
