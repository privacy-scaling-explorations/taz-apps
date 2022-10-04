import React, { useState } from "react"
import AccordionUI from "./AccordionUI"

const Accordion = () => {
    const [Index, setIndex] = useState(1)

    const data = [
        {
            id: 1,
            question: "What happened when I joined the Semaphore Devon VI group?",
            answer: (
                <p>
                    <span className="text-brand-h3 text-black">&bull; </span>You don't have a password.
                    <br />
                    <span className="text-brand-h3 text-black">&bull; </span> The QR you received is your ID. It acts
                    kind of like a username and password in-one except that you are anon when you use it, you can’t
                    change it, and you have to upload a picture of it to connect.
                    <br />
                    <span className="text-brand-h3 text-black">&bull; </span> Your browser will remember your ID unless
                    you disconnet it.
                </p>
            )
        },
        {
            id: 2,
            question: "What is a Semaphore ID?",
            answer: (
                <p>
                    Semaphore IDs allow users to generate zero-knowledge proofs and send signals anonymously. A
                    Semaphore ID represents a user in a group and is made up of two secret values (trapdoor and
                    nullifier) and one public value (identity commitment).
                    <br />
                    <br /> The Poseidon hash of the identity nullifier and trapdoor is called the identity secret, and
                    its hash is the identity commitment. An identity commitment, like an Ethereum address, is a public
                    value used in Semaphore groups to represent the identity of a group member. The secret values are
                    like Ethereum private keys and are used to authenticate signals.
                </p>
            )
        },
        {
            id: 3,
            question: "How does Semaphore provide privacy?",
            answer: (
                <p>
                    Semaphore uses zero-knowledge proofs to prove a signal or message was sent from a member of a group
                    without revealing who that member was. The identity of the member remains secret because the zk
                    proof only shows the message was validly signed, but never reveals who it was signed by.
                    <br />
                    <br />
                    Users remain anonymous because signals and identities are not associated in any way.
                </p>
            )
        },
        {
            id: 4,
            question: "What’s an anonymity set?",
            answer: (
                <p>
                    In the context of the TAZ app, an anonymity set is a group containing members that are
                    indistinguishable from each other. Since ZK proofs break the provable links between actions and
                    identities, a bigger anonymity set creates more anonymity for the entire group. The anonymity set
                    for the TAZ app is made up of Devcon VI attendees because only attendees were allowed to join the
                    Semaphore group.
                </p>
            )
        },
        {
            id: 5,
            question: "Why does it take a long time to post?",
            answer: (
                <p>
                    Posting begins with generating a client-side zero knowledge proof containing the poster’s signal or
                    message. To preserve anonymity, the proof is sent to a third-party account on the backend, which
                    then submits an Ethereum transaction with the proof.
                    <br />
                    <br />
                    Proof generation takes only a few seconds, but the time required for the proof to be confirmed by
                    the network and verified by the smart contract depends on the blockchain.
                </p>
            )
        },
        {
            id: 6,
            question: "Why are you using a centralized backend?",
            answer: (
                <p>
                    A zero-knowledge proof must be sent to the Ethereum network, but if users generating the proofs used
                    their own Ethereum address to send the transaction, it would be possible to link their address to
                    their proof, making it no longer anonymous.
                    <br />
                    <br />A third-party account is used to send proofs on-chain without linking the proofs to any user’s
                    Ethereum address – preserving anonymity.
                </p>
            )
        },
        {
            id: 7,
            question: "How secure is my Semaphore ID on the TAZ app?",
            answer: (
                <p>
                    Your Semaphore ID will be generated and saved locally in your device. Once your Semaphore ID is
                    created, its secret values are saved in your browser’s local storage where they can also be exported
                    to your device as a QR code.
                    <br />
                    <br />
                    Please note the Devcon VI TAZ applications are an experiment. Your Semaphore ID is not encrypted and
                    we are taking minimal security precautions.
                </p>
            )
        }
    ]

    return (
        <div className="flex w-full flex-col justify-center items-center h-auto">
            {data.map((data) => {
                return (
                    <div className="flex w-full flex-col border-t-2 border-brand-blue">
                        <AccordionUI
                            title={data.question}
                            Id={data.id}
                            children={data.answer}
                            Index={Index}
                            setIndex={setIndex}
                        ></AccordionUI>
                    </div>
                )
            })}
        </div>
    )
}
export default Accordion
