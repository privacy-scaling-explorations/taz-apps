import { useRouter } from 'next/router'

import GenerateIdentity from '../components/GenerateIdentity'

export default function GenerateIdentityPage() {
  const router = useRouter()
  const { invitation } = router.query

  return (
    <div>
      <GenerateIdentity invitation={invitation} />
    </div>
  )
}
