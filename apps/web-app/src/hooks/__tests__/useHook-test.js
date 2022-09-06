import { Subgraph } from '@semaphore-protocol/subgraph'
import { Group } from '@semaphore-protocol/group'
import axios from 'axios'

const useHookTest = async () => {
  const SUBGRAPH_URL =
    'https://api.thegraph.com/subgraphs/name/semaphore-protocol/goerli'
  const postData = {
    query: `
            {
              members(first: 200 
              where: { group: "1080" } 
              orderBy: timestamp 
              orderDirection: asc
              ) {
                identityCommitment
              }
            }
            `,
  }

  const data = await axios.post(SUBGRAPH_URL, postData)
  const membersList = data.data.data.members
  const newMemberList = membersList.map(
    ({ identityCommitment }) => identityCommitment,
  )

  const group = new Group(16)
  group.addMembers(newMemberList)

  const testMemberList = new Set(newMemberList)
  // console.log(list)

  const subgraph = new Subgraph('goerli')
  const { members } = await subgraph.getGroup('1080', { members: true })

  const group2 = new Group(16)
  group2.addMembers(members)

  return {
    data,
    membersList,
    newMemberList,
    group,
    testMemberList,
    members,
    group2,
  }
}
export default useHookTest
