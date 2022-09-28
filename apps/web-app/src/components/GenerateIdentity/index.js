import { useState, useEffect } from 'react'
import axios from 'axios'
import { Identity } from '@semaphore-protocol/identity'
import QRCode from 'qrcode'
import { useScreenshot } from 'use-react-screenshot'
import { useIdentityLoginContext } from '../../context/IdentityContextProvider'
import GenerateIdentityComponent from './View'

const { FACT_ROTATION_INTERVAL } = require('../../config/goerli.json')
const { FACTS } = require('../../data/facts.json')

// Page 3 will Generate Identity and Join Group
export default function GenerateIdentity(props) {
  const { invitation } = props

  const onSetIdentity = useIdentityLoginContext()
  const [imageUrl, setImageUrl] = useState('')
  // const [isGeneratingIdentity, setIsGeneratingIdentity] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  // const [loadingMessage, setLoadingMessage] = useState('This is a Loading Message')
  const [image, takeScreenShot] = useScreenshot({})
  const [steps, setSteps] = useState([])
  const [fact, setFact] = useState(FACTS[Math.floor(Math.random() * FACTS.length)])

  const cancelTimers = (timers) => {
    timers.forEach((timer) => {
      clearTimeout(timer)
    })
  }

  const handleJoinButton = async () => {
    const timers = []

    // setIsGeneratingIdentity(true)
    setIsLoading(true)

    // setLoadingMessage('Identity is Generating')
    setSteps([
      { status: 'processing', text: 'Generating Semaphore Identity (private values and id commitment)' },
      { status: 'queued', text: 'Send invitation code and identity commmitment to our server/relay' },
      { status: 'queued', text: 'Add ID commitment to group' },
      { status: 'queued', text: 'Generate ID QR code' },
      { status: 'queued', text: 'Save private values to browser cache' }
    ])

    // Step 1
    const identity = new Identity()
    const identityCommitment = identity.generateCommitment().toString()
    const identityKey = identity.toString()
    console.log(identityCommitment)

    // setLoadingMessage(
    //   `Identity Generated! We are now adding it to our Semaphore Contract Devcon Group, this process can take up to 1-2 mins, please dont close the App before the Transaction.`
    // )
    setTimeout(() => {
      setSteps([
        { status: 'complete', text: 'Generated Semaphore Identity (private values and id commitment)' },
        { status: 'processing', text: 'Sending invitation code and identity commmitment to our server/relay' },
        { status: 'queued', text: 'Add ID commitment to group' },
        { status: 'queued', text: 'Generate ID QR code' },
        { status: 'queued', text: 'Save private values to browser cache' }
      ])
    }, 2500)

    // Step 2

    // try{

    const addMemberResponse = await axios
      .post('/api/addMember', {
        identityCommitment,
        invitation
      })
      .then(async (res) => {
        console.log('Success!')
        console.log(res)
        console.log('Status!')
        console.log(res.status)
        onSetIdentity(identityKey)

        setSteps([
          { status: 'complete', text: 'Generated Semaphore Identity (private values and id commitment)' },
          { status: 'complete', text: 'Sent invitation code and identity commmitment to our server/relay' },
          { status: 'processing', text: 'Adding ID commitment to group' },
          { status: 'queued', text: 'Generate ID QR code' },
          { status: 'queued', text: 'Save private values to browser cache' }
        ])
        timers.push(
          setTimeout(() => {
            setSteps([
              { status: 'complete', text: 'Generated Semaphore Identity (private values and id commitment)' },
              { status: 'complete', text: 'Sent invitation code and identity commmitment to our server/relay' },
              { status: 'complete', text: 'Added ID commitment to group' },
              { status: 'processing', text: 'Generating ID QR code' },
              { status: 'queued', text: 'Save private values to browser cache' }
            ])
          }, 2000)
        )

        // } catch(error){
        //   alert("Identity creation failed, please try again")
        //   setIsLoading(false)

        // }

        try {
          const opts = {
            type: 'image/jpeg',
            color: {
              dark: '#1E1E1E',
              light: '#EAE1DA'
            }
          }
          const responseQR = await QRCode.toDataURL(identityKey, opts)
          setImageUrl(responseQR)
        } catch (error) {
          cancelTimers(timers)
          console.log(error)

          cancelTimers(timers)
          setIsLoading(false)
          alert('Error encountered')

          // setIsGeneratingIdentity(false)
        }

        console.log('Error10!')
      })
      .catch((err) => {
        console.log(err)
        console.log('Error2!')

        cancelTimers(timers)
        setIsLoading(false)
        alert('Transaction Failed, please try again')

        // console.log(err.response?.status)
      })

    // step 3
    // Add logic to only set Identity when Response is True

    timers.push(
      setTimeout(() => {
        setSteps([
          { status: 'complete', text: 'Generated Semaphore Identity (private values and id commitment)' },
          { status: 'complete', text: 'Sent invitation code and identity commmitment to our server/relay' },
          { status: 'complete', text: 'Added ID commitment to group' },
          { status: 'complete', text: 'Generated ID QR code' },
          { status: 'processing', text: 'Saving private values to browser cache' }
        ])
      }, 4000)
    )

    timers.push(
      setTimeout(() => {
        setSteps([
          { status: 'complete', text: 'Generated Semaphore Identity (private values and id commitment)' },
          { status: 'complete', text: 'Sent invitation code and identity commmitment to our server/relay' },
          { status: 'complete', text: 'Added ID commitment to group' },
          { status: 'complete', text: 'Generated ID QR code' },
          { status: 'complete', text: 'Saved private values to browser cache' }
        ])
      }, 6000)
    )

    timers.push(
      setTimeout(() => {
        setIsLoading(false)
      }, 8000)
    )
  }

  const onClose = () => {
    // setIsLoading(!isLoading)
    setIsLoading(true) // Don't allow user to close
  }

  const rotateFact = () => {
    setFact(FACTS[FACTS.indexOf(fact) + 1 === FACTS.length ? 0 : FACTS.indexOf(fact) + 1])
  }

  useEffect(() => {
    setTimeout(rotateFact, FACT_ROTATION_INTERVAL)
  }, [fact])

  return (
    <GenerateIdentityComponent
      isLoading={isLoading}
      onClose={onClose}
      // loadingMessage={loadingMessage}
      imageUrl={imageUrl}
      handleJoinButton={handleJoinButton}
      steps={steps}
      fact={fact}
    />
  )
}
