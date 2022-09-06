import ExperiencesListComponent from './View'
import { useRouter } from 'next/router'

const ExperiencesList = () => {
  const router = useRouter()
  const clearIdentity = () => {
    console.log('clear')
    window.localStorage.removeItem('identity')
    router.push('/')
  }
  return <ExperiencesListComponent clearIdentity={clearIdentity} />
}

export default ExperiencesList
