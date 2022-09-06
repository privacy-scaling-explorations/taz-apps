import AnswerBoard from '../../components/AnswersBoard'
import { useRouter } from 'next/router'

export default function AnswersBoardPage() {
  const router = useRouter()
  const { messageId } = router.query

  return (
    <div>
      <AnswerBoard messageId={messageId} />
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {},
  }
}
