import { useState, useRef } from 'react'
import axios from 'axios'
// import Link from 'next/link'
import { useRouter } from 'next/router'

import { useIdentityLoginContext } from '../../context/IdentityContextProvider'
import { Identity } from '@semaphore-protocol/identity'
// import useGetMembers from '../../hooks/useGetMembers'
import ValidateInvitationComponent from './View'

const { Subgraph } = require('@semaphore-protocol/subgraph')

// Page 1 it will check Invitation
export default function InvitationCheck() {
  console.log('test')
  const [selected, setSelected] = useState('environment')
  const [startScan, setStartScan] = useState(false)
  // const [loadingScan, setLoadingScan] = useState(false)
  const [data, setData] = useState('')
  const onSetIdentity = useIdentityLoginContext()
  const [invitation, setInvitation] = useState('test-code-15')
  const [response, setResponse] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [checkingIdentity, setCheckingIdenty] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(
    'This is a Loading Message',
  )
  // const [members, setMembers] = useState([])
  const router = useRouter()

  const qrRef = useRef(null)

  const handleScan = async (scanData) => {
    // setLoadingScan(true)
    try {
      console.log(`loaded data data`, scanData)
      if (scanData && scanData !== '') {
        console.log(`loaded >>>`, scanData)
        setData(scanData)
        setStartScan(false)

        // const apiResponse = await axios.post('/api/validateInvitation', {
        //   scanData,
        // })
        // console.log('Is code valid and not used yet? ', apiResponse.data.isValid)

        // console.log(apiResponse.data.isValid)
        // setResponse(apiResponse.data.isValid)

        // setLoadingScan(false)
      }
    } catch {
      console.log('error')
    }
  }

  const handleSignUpButton = async () => {
    setIsSignUp(!isSignUp)
  }

  const validate = async () => {
    setIsLoading(true)
    setLoadingMessage('Verifying your Invitation-Code')

    const apiResponse = await axios.post('/api/validateInvitation', {
      invitation,
    })
    console.log('Is code valid and not used yet? ', apiResponse.data.isValid)

    // console.log(apiResponse.data.isValid)
    setResponse(apiResponse.data.isValid)

    if (apiResponse.data.isValid) {
      console.log(response)
      console.log('moving to generate Id Page')
      router.push(`/generate-id-page?invitation=${invitation}`)
    } else if (apiResponse.data.isValid === false) {
      setIsLoading(false)
      alert('Invalid Invitation code')
    }
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
      console.log(result)
      console.log('Scanned!')

      // check it identity is part of members array
      const checkIdentity = new Identity(result)
      const checkIdentityCommitment = checkIdentity
        .generateCommitment()
        .toString()
      const subgraph = new Subgraph('goerli')

      const { members } = await subgraph.getGroup('10803', { members: true })
      console.log('Checking Members')
      console.log(members)
      const check = members.includes(checkIdentityCommitment)
      console.log('Is Identity part of Semaphore?')
      console.log(check)
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
    setIsLoading(!isLoading)
  }

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
      setInvitation={setInvitation}
      data={data}
      validate={validate}
      onClose={onClose}
      loadingMessage={loadingMessage}
    />
  )
}
