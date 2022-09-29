//SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

interface ISemaphore {
    function addMember(uint256 groupId, uint256 identityCommitment) external;
    function updateGroupAdmin(uint256 groupId, address newAdmin) external;
    function verifyProof(
        uint256 groupId,
        uint256 merkleTreeRoot,
        bytes32 signal,
        uint256 nullifierHash,
        uint256 externalNullifier,
        uint256[8] calldata proof
    ) external;
}

contract TazMessage is AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant TAZ_ADMIN_ROLE = keccak256("TAZ_ADMIN_ROLE");
    bytes32 public constant REVIEWER_ROLE = keccak256("REVIEWER_ROLE");

    // Stores the address of the Semaphore contract used for verifications
    ISemaphore public semaContract;

    // Emitted when a member is added to a group on the Semaphore contract
    event MemberAdded(uint256 indexed groupId, uint256 identityCommitment);

    event MessageAdded(uint256 parentMessageId, uint256 messageId, string messageContent);

    event ViolationAdded(uint256 messageId, address reviewer);

    // Stores the members (by group) that have been added
    // to the Semaphore contract through this contract
    mapping(uint256 => mapping(uint256 => bool)) internal groups;

    // Used for UI-friendly message reference
    Counters.Counter private _messageIdCounter;

    constructor(ISemaphore semaContractAddr) {
        semaContract = semaContractAddr;

        _setRoleAdmin(TAZ_ADMIN_ROLE, TAZ_ADMIN_ROLE);
        _setRoleAdmin(REVIEWER_ROLE, TAZ_ADMIN_ROLE);

        _grantRole(TAZ_ADMIN_ROLE, msg.sender);

        // Skip zero
        _messageIdCounter.increment();
    }

    // Exists to allow for the group admin to be updated on the Semaphore
    // contract when this contract is updated and deployed to a new address,
    // so that a new Semaphore group doesn't have to be created.
    function updateSemaphoreGroupAdmin(uint256 groupId, address newAdmin) external onlyRole(TAZ_ADMIN_ROLE) {
        semaContract.updateGroupAdmin(groupId, newAdmin);
    }

    // Checks if a member has been added to a group through this contract
    function memberExists(uint256 groupId, uint256 identityCommitment) internal view returns (bool) {
        return groups[groupId][identityCommitment];
    }

    // Adds a member to a group on the Semaphore contract, and tracks members
    // added through this contract
    function addMember(uint256 groupId, uint256 identityCommitment) external onlyRole(TAZ_ADMIN_ROLE) {
        // Check that the member has not already been added
        require(!memberExists(groupId, identityCommitment), "Member already added to group");

        semaContract.addMember(groupId, identityCommitment);

        // Set a flag to store the added status of this member
        groups[groupId][identityCommitment] = true;

        emit MemberAdded(groupId, identityCommitment);
    }

    // Verifies a proof and adds a message
    function addMessage(
        string memory messageContent,
        uint256 groupId,
        uint256 merkleTreeRoot,
        bytes32 signal,
        uint256 nullifierHash,
        uint256 externalNullifier,
        uint256[8] calldata proof) external returns (uint256) {
        uint256 messageId = _messageIdCounter.current();

        // Verify proof with Sempahore contract
        semaContract.verifyProof(groupId, merkleTreeRoot, signal, nullifierHash, externalNullifier, proof);

        // Increment for next use
        _messageIdCounter.increment();

        emit MessageAdded(0, messageId, messageContent);

        return messageId;
    }

    // Verifies a proof and replies to an existing message
    function replyToMessage(
        uint256 parentMessageId,
        string memory messageContent,
        uint256 groupId,
        uint256 merkleTreeRoot,
        bytes32 signal,
        uint256 nullifierHash,
        uint256 externalNullifier,
        uint256[8] calldata proof) external returns (uint256) {
        uint256 messageId = _messageIdCounter.current();

        // Require a valid parentMessageId
        require(parentMessageId > 0, "Invalid ID for parent message");

        // Verify proof with Sempahore contract
        semaContract.verifyProof(groupId, merkleTreeRoot, signal, nullifierHash, externalNullifier, proof);

        // Increment for next use
        _messageIdCounter.increment();

        emit MessageAdded(parentMessageId, _messageIdCounter.current(), messageContent);

        return messageId;
    }

    function addAdmins(address[] calldata admins) external onlyRole(TAZ_ADMIN_ROLE) {
        for(uint256 i = 0; i < admins.length; ++i) {
            grantRole(TAZ_ADMIN_ROLE, admins[i]);
        }
    }

    function removeAdmins(address[] calldata admins) external onlyRole(TAZ_ADMIN_ROLE) {
        for(uint256 i = 0; i < admins.length; ++i) {
            revokeRole(TAZ_ADMIN_ROLE, admins[i]);
        }
    }

    function addReviewers(address[] calldata reviewers) external onlyRole(TAZ_ADMIN_ROLE) {
        for(uint256 i = 0; i < reviewers.length; ++i) {
            grantRole(REVIEWER_ROLE, reviewers[i]);
        }
    }

    function removeReviewers(address[] calldata reviewers) external onlyRole(TAZ_ADMIN_ROLE) {
        for(uint256 i = 0; i < reviewers.length; ++i) {
            revokeRole(REVIEWER_ROLE, reviewers[i]);
        }
    }

    function addViolation(uint256 messageId) external onlyRole(REVIEWER_ROLE) {
        emit ViolationAdded(messageId, msg.sender);
    }
}
