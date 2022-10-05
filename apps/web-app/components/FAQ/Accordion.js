import React, { useState } from "react"
import AccordionUI from "./AccordionUI"

const Accordion = () => {
    const [Index, setIndex] = useState(1)

    const data = [
        {
            id: 1,
            question: "How do I sign in and out of the TAZ app?",
            answer: (
                <p>
                    Use your Semaphore ID (the QR code generated in your browser). Think of your Semaphore ID like an
                    Ethereum private key. Don’t show it to anyone else and keep it safe because if you lose it, we can’t
                    get it back for you!
                    <br />
                    <br />
                    Your browser will rember your Semaphore ID, but it’s a good idea to save a screenshot of your
                    Semaphore ID QR code in case you need to log back into the TAZ app.
                </p>
            )
        },
        {
            id: 2,
            question: "Can my invite code be used more than once?",
            answer: (
                <p>
                    No. The QR code on your physical invitation card from the TAZ Community Hub can only generate a
                    Semaphore ID one time.
                </p>
            )
        },
        {
            id: 3,
            question: "Is my Semaphore ID QR code on the invitation card?",
            answer: (
                <p>
                    No. There are two different QR codes: one is the invite code (on the physical card) and the other is
                    your Semaphore ID generated locally on your browser. You scan the invite QR code to get to the TAZ
                    app and generate a Semaphore ID. The Semaphore ID QR code is used to interact with the TAZ app or
                    log back in.
                </p>
            )
        },
        {
            id: 4,
            question: "Since I’m anonymous, can I spam the app or act like a troll?",
            answer: <p>Please don’t. We can and will blacklist your content.</p>
        },
        {
            id: 5,
            question: "What’s Zkitter? ",
            answer: (
                <p>
                    Zkitter is an anon-friendly social network available to try now. You can anonymously post, chat,
                    comment, follow, etc. Like the TAZ app, Zkitter uses a Semaphore ID to allow users to stay anonymous
                    so you can take the Semaphore ID generated at Devcon and use it on Zkitter.
                </p>
            )
        },
        {
            id: 6,
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
            id: 7,
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
            id: 8,
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
            id: 9,
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
            id: 10,
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
            id: 11,
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
