import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ExperiencesListComponent from './View'

const ExperiencesList = () => {
  const [identityUrl, setIdentityUrl] = useState('')

  const router = useRouter()
  const clearIdentity = () => {
    console.log('clear')
    window.localStorage.removeItem('identity')
    router.push('/')
  }

  useEffect(() => {
    const identity = window.localStorage.getItem('identity')
    const identityUrlTemp = identity.replace('["', '').replace('"]', '').replace('","', '_')
    setIdentityUrl(identityUrlTemp)
    console.log('identity', identity)
    console.log('urlIdentity', identityUrlTemp)
  })
  return <ExperiencesListComponent clearIdentity={clearIdentity} urlIdentity={identityUrl} />
}

export default ExperiencesList
