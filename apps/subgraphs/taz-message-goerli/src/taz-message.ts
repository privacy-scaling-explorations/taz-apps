import {
  MemberAdded as MemberAddedEvent,
  MessageAdded,
  ViolationAdded
} from "../generated/TazMessage/TazMessage"
import {
  MemberAdded,
  Message,  
  Violation
} from "../generated/schema"

export function handleMemberAdded(event: MemberAddedEvent): void {
  let entity = new MemberAdded(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.groupId = event.params.groupId
  entity.identityCommitment = event.params.identityCommitment
  entity.save()
}

export function handleMessageAdded(event: MessageAdded): void {
  let message = new Message(
    event.params.messageId.toString()
  )
  message.parentMessageId = event.params.parentMessageId
  message.messageId = event.params.messageId
  message.hasViolation = false
  message.messageContent = event.params.messageContent
  message.timestamp = event.block.timestamp
  message.save()
}

export function handleViolationAdded(event: ViolationAdded): void {
  const message = Message.load(event.params.messageId.toString())
  if(message) {
    let violation = new Violation(
      event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    )
    violation.message = event.params.messageId.toString()
    violation.reviewer = event.params.reviewer
    violation.timestamp = event.block.timestamp
    violation.save()
    
    message.hasViolation = true
    message.save()      
  }
}
