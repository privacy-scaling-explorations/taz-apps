import { useEffect, useState } from 'react'
// import { Subgraph } from '@semaphore-protocol/subgraph'
import { Subgraphs } from '../hooks/subgraphs'

const { GROUP_ID } = require('../config/goerli.json')

const useGetMembers = async () => {
  const [data, setData] = useState([])
  const [error, setError] = useState([])
  // const [loading, setLoading] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // const subgraph = new Subgraph('goerli')
      // const { members } = await subgraph.getGroup('1080', { members: true })

      const groupId = GROUP_ID.toString()
      const subgraphs = new Subgraphs()
      const members = await subgraphs.getGroupIdentities(groupId)

      setData(members)
      console.log('Members Set!!')
    } catch (error) {
      setError(error)
    }
  }

  // console.log('Members')
  // console.log(members)

  console.log('Hook Members from Inside Hooks')
  console.log(data[1])

  return { data, error }
}
export default useGetMembers
