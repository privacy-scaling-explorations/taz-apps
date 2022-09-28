import {
  NewToken,
  ViolationAdded,
  VoteAdded
} from "../generated/TazToken/TazToken"
import {
  Token,
  Violation,
  Vote
} from "../generated/schema"

export function handleNewToken(event: NewToken): void {
  let token = new Token(
    event.params.tokenId.toString()
  )
  token.tokenId = event.params.tokenId
  token.uri = event.params.uri
  token.hasViolation = false
  token.totalVotes = 0
  token.timestamp = event.block.timestamp
  token.save()
}

export function handleViolationAdded(event: ViolationAdded): void {
  const token = Token.load(event.params.tokenId.toString())
  if(token) {  
    let violation = new Violation(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    violation.token = event.params.tokenId.toString()
    violation.reviewer = event.params.reviewer
    violation.timestamp = event.block.timestamp
    violation.save()

    token.hasViolation = true
    token.save()  
  }
}

export function handleVoteAdded(event: VoteAdded): void {
  const token = Token.load(event.params.tokenId.toString())
  if(token) {
    let vote = new Vote(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    vote.token = event.params.tokenId.toString()
    vote.timestamp = event.block.timestamp
    vote.save()
    
    token.totalVotes = token.totalVotes + 1
    token.save()      
  }
}
