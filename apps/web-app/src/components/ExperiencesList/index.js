import { useRouter } from 'next/router'
import ExperiencesListComponent from './View'

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
