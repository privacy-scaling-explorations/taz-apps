import { GenerateIdentity } from '../components/GenerateIdentity'
import { useRouter } from 'next/router'

export default function GenerateIdentityPage() {
  const router = useRouter()
  const { invitation } = router.query

  return (
    <div>
      <GenerateIdentity invitation={invitation} />
    </div>
  )
}
