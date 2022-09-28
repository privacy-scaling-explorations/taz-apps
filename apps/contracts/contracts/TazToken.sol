//SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

interface ISemaphore {
    function verifyProof(
        uint256 groupId,
        uint256 merkleTreeRoot,
        bytes32 signal,
        uint256 nullifierHash,
        uint256 externalNullifier,
        uint256[8] calldata proof
    ) external;
}

contract TazToken is ERC721, ERC721URIStorage, AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant TAZ_ADMIN_ROLE = keccak256("TAZ_ADMIN_ROLE");
    bytes32 public constant REVIEWER_ROLE = keccak256("REVIEWER_ROLE");
    bytes32 public constant START_STOPPER_ROLE = keccak256("START_STOPPER_ROLE");

    // Stores the address of the Semaphore contract used for verifications
    ISemaphore public semaContract;

    event NewToken(uint256 tokenId, string uri);

    event VoteAdded(uint256 tokenId);

    event ViolationAdded(uint256 tokenId, address reviewer);

    Counters.Counter private _tokenIdCounter;

    bool private _mintingActive;
    bool private _votingActive;

    // Constant used for voting so that each identity gets only one vote
    uint256 private constant _EXTERNAL_NULLIFIER_FOR_VOTING = 115101;

    constructor(ISemaphore semaContractAddr) ERC721("TazToken", "TAZ") {
        semaContract = semaContractAddr;

        _setRoleAdmin(TAZ_ADMIN_ROLE, TAZ_ADMIN_ROLE);
        _setRoleAdmin(REVIEWER_ROLE, TAZ_ADMIN_ROLE);
        _setRoleAdmin(START_STOPPER_ROLE, TAZ_ADMIN_ROLE);

        _grantRole(TAZ_ADMIN_ROLE, msg.sender);

        _mintingActive = true;
        _votingActive = false;

        // Skip zero
        _tokenIdCounter.increment();
    }

    // Verifies a proof, and on success mints a non-fungible token
    function safeMint(
        address to,
        string memory uri,
        uint256 groupId,
        uint256 merkleTreeRoot,
        bytes32 signal,
        uint256 nullifierHash,
        uint256 externalNullifier,
        uint256[8] calldata proof) public onlyRole(TAZ_ADMIN_ROLE) returns (uint256){
        uint256 tokenId = _tokenIdCounter.current();

        require(_mintingActive, "Minting not active");

        // Verify proof with Sempahore contract
        semaContract.verifyProof(groupId, merkleTreeRoot, signal, nullifierHash, externalNullifier, proof);

        // Increment for next use
        _tokenIdCounter.increment();

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        emit NewToken(tokenId, uri);

        return tokenId;
    }

    function vote(
        uint256 tokenId,
        uint256 groupId,
        uint256 merkleTreeRoot,
        bytes32 signal,
        uint256 nullifierHash,
        uint256[8] calldata proof) external {

        require(_votingActive, "Voting not active");

        // Verify proof with Sempahore contract
        semaContract.verifyProof(groupId, merkleTreeRoot, signal, nullifierHash, _EXTERNAL_NULLIFIER_FOR_VOTING, proof);

        emit VoteAdded(tokenId);
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

    function addStartStoppers(address[] calldata startStoppers) external onlyRole(TAZ_ADMIN_ROLE) {
        for(uint256 i = 0; i < startStoppers.length; ++i) {
            grantRole(START_STOPPER_ROLE, startStoppers[i]);
        }
    }

    function removeStartStoppers(address[] calldata startStoppers) external onlyRole(TAZ_ADMIN_ROLE) {
        for(uint256 i = 0; i < startStoppers.length; ++i) {
            revokeRole(START_STOPPER_ROLE, startStoppers[i]);
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

    function startMinting() external onlyRole(START_STOPPER_ROLE) {
        _mintingActive = true;
    }

    function stopMinting() external onlyRole(START_STOPPER_ROLE) {
        _mintingActive = false;
    }

    function startVoting() external onlyRole(START_STOPPER_ROLE) {
        _votingActive = true;
    }

    function stopVoting() external onlyRole(START_STOPPER_ROLE) {
        _votingActive = false;
    }

    function addViolation(uint256 tokenId) external onlyRole(REVIEWER_ROLE) {
        emit ViolationAdded(tokenId, msg.sender);
    }

    // The following functions are overrides required by Solidity

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
