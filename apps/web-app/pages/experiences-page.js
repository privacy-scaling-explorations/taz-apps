// import dynamic from 'next/dynamic'
// import { useState, useEffect } from 'react'
import ExperiencesList from '../components/ExperiencesList'
import Link from 'next/link'
// const InvitationCheck = dynamic(() => import('../components/InvitationCheck'), {
//   ssr: false,
// })

export default function ExperiencesListPage({ clearIdentity }) {
  return (
    <div>
      {' '}
      <ExperiencesList />{' '}
    </div>
  )
}
