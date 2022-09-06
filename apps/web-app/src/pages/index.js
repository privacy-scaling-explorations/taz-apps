import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import ExperiencesList from '../components/ExperiencesList'

const InvitationCheck = dynamic(() => import('../components/InvitationCheck'), {
  ssr: false,
})

export default function Home() {
  const [localIdentity, setLocalIdentity] = useState()

  useEffect(() => {
    // setter
    let identityKey = ''
    console.log(window)
    console.log(window.localStorage)
    if (identityKey === '') {
      identityKey = window.localStorage.getItem('identity')
    }
    setLocalIdentity(identityKey)
    console.log(identityKey)
  })
  return <div>{localIdentity ? <ExperiencesList /> : <InvitationCheck />}</div>

  // current solution to check invitation
  // return (
  //   <div>
  //     {' '}
  //     <InvitationCheck />{' '}
  //   </div>
  // )
}
