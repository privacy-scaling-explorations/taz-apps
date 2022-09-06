import { useState } from 'react'
import axios from 'axios'
import { Identity } from '@semaphore-protocol/identity'
import QRCode from 'qrcode'
import { useIdentityLoginContext } from '../../context/IdentityContextProvider'

import { GenerateIdentityComponent } from './View'

// Page 3 will Generate Identity and Join Group
export const GenerateIdentity = (props) => {
  const { invitation } = props

  const onSetIdentity = useIdentityLoginContext()
  const [imageUrl, setImageUrl] = useState('')
  // const [isGeneratingIdentity, setIsGeneratingIdentity] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(
    'This is a Loading Message',
  )
  const handleJoinButton = async () => {
    // setIsGeneratingIdentity(true)
    setIsLoading(true)
    setLoadingMessage('Identity is Generating')
    // Step 1
    const identity = new Identity()
    const identityCommitment = identity.generateCommitment().toString()
    const identityKey = identity.toString()
    console.log(identityCommitment)

    setLoadingMessage(
      `Identity Generated! We are now adding it to our Semaphore Contract Devcon Group, this process can take up to 1-2 mins, please dont close the App before the Transaction.`,
    )

    // Step 2
    await axios
      .post('/api/addMember', {
        identityCommitment,
        invitation,
      })
      .then(async (res) => {
        console.log('Success!')
        console.log(res)
        console.log('Status!')
        console.log(res.status)
        onSetIdentity(identityKey)
        try {
          const responseQR = await QRCode.toDataURL(identityKey)
          setImageUrl(responseQR)
        } catch (error) {
          console.log(error)
          // setIsGeneratingIdentity(false)
        }

        console.log('Error10!')
      })
      .catch((err) => {
        console.log(err)
        console.log('Error2!')

        // console.log(err.response?.status)
      })
    // step 3
    // Add logic to only set Identity when Response is True
    setIsLoading(false)
  }

  const onClose = () => {
    setIsLoading(!isLoading)
  }

  return (
    <GenerateIdentityComponent
      isLoading={isLoading}
      onClose={onClose}
      loadingMessage={loadingMessage}
      imageUrl={imageUrl}
      handleJoinButton={handleJoinButton}
    />
  )
}
