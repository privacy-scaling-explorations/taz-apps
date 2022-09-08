const { task } = require("hardhat/config");
const { Subgraph } = require('@semaphore-protocol/subgraph');
const { Identity } = require("@semaphore-protocol/identity");
const { Group } = require("@semaphore-protocol/group");
const { generateProof } = require('@semaphore-protocol/proof');
const { packToSolidityProof } = require('@semaphore-protocol/proof');

task("createProof", "create a proof")
    .addParam("identitySeed", "String used for identity creation", "", types.string) 
    .addParam("groupId", "Semaphore Group ID", 0, types.int)    
    .addParam("signal", "Signal for proof", "Select Signal", types.string)
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({ identitySeed, groupId, signal, logs }, { ethers }) => {
        
        const proofElements = {
            identity: null,
            identityCommitment: null,
            group: null,
            groupId: null,
            members: null,
            signal: null,
            signalBytes32: null,
            nullifierHash: null,
            externalNullifier: null,
            solidityProof: null
        }

        proofElements.identity = new Identity(identitySeed)
        proofElements.identityCommitment = proofElements.identity.generateCommitment()

        proofElements.groupId = groupId.toString()
        proofElements.group = new Group(16)   
        proofElements.group.addMember(proofElements.identityCommitment)
        proofElements.members = proofElements.group.members

        // proofElements.groupId = groupId.toString()
        // proofElements.group = new Group(16)        
        // const subgraph = new Subgraph('goerli')
        // const { members } = await subgraph.getGroup(proofElements.groupId, { members: true })
        // proofElements.group.addMembers(members)
        // proofElements.members = proofElements.group.members

        proofElements.externalNullifier = Math.round(Math.random() * 10000000)
        proofElements.signal = signal
        const fullProof = await generateProof(proofElements.identity, proofElements.group, proofElements.externalNullifier, proofElements.signal, {
            zkeyFilePath: "static/semaphore.zkey",
            wasmFilePath: "static/semaphore.wasm"
        });
        proofElements.nullifierHash = fullProof.publicSignals.nullifierHash
        proofElements.solidityProof = packToSolidityProof(fullProof.proof)
        proofElements.signalBytes32 = ethers.utils.formatBytes32String(proofElements.signal)      
        
        logs && console.log("LOG | proofElements", proofElements) 
          
        return proofElements
    });
