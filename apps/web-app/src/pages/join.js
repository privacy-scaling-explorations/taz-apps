import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import GenerateIdentity from '../components/GenerateIdentity'

export default function JoinPage() {
  const router = useRouter()
  const { code: invitation } = router.query
  const [isCodeValid, setIsCodeValid] = useState(false)
  const checkCode = async () => {
    console.log('code', invitation)
    const apiResponse = await axios.post('/api/validateInvitation', {
      invitation
    })
    console.log('Is code valid and not used yet? ', apiResponse.data.isValid)

    // console.log(apiResponse.data.isValid)
    setIsCodeValid(apiResponse.data.isValid)
    if (apiResponse.data.isValid === false) {
      alert('Code is Not Valid')
      router.push('/')
    }
  }

  useEffect(() => {
    if (!invitation) {
      return
    }
    console.log('checking Invitation', invitation)

    checkCode()
  }, [invitation])

  return (
    <div>
      <GenerateIdentity invitation={invitation} />
    </div>
  )
}
