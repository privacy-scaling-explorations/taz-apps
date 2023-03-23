import NextImage from "next/image"
import NextLink from "next/link"
import { createClient } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { requestSignedZuzaluUUIDUrl, useFetchParticipant, useSemaphoreSignatureProof } from "@pcd/passport-interface"
import axios from "axios"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { usePassportModalContext } from "../../context/PassportModalContext"
import PassportModal from "../PassportModal"
import getUserSession from "../../hooks/getUserSession"

const supabase = createBrowserSupabaseClient()

const Header = () => {
    const { openPassportModal, setOpenPassportModal } = usePassportModalContext()
    const [session, setSession] = useState<any>(null)
    const [uuid, setUuid] = useState<string | undefined>()
    const [pcdStr, setPcdStr] = useState("")
    const [participentData, setParticipentData] = useState<any>()
    const userObj = getUserSession()

    const PASSPORT_URL = "https://zupass.eth.limo/"
    const PASSPORT_SERVER_URL = "https://api.pcd-passport.com/"

    function requestProofFromPassport(proofUrl: string) {
        const popupUrl = `/popup?proofUrl=${encodeURIComponent(proofUrl)}`
        window.open(popupUrl, "_blank", "width=360,height=480,top=100,popup")
    }

    function requestSignedZuID() {
        const proofUrl = requestSignedZuzaluUUIDUrl(PASSPORT_URL, `${window.location.origin}/popup`)
        requestProofFromPassport(proofUrl)
    }

    // Listen for PCDs coming back from the Passport popup
    useEffect(() => {
        async function receiveMessage(ev: MessageEvent<any>) {
            if (!ev.data.encodedPcd) return
            console.log("Received message", ev.data)
            setPcdStr(ev.data.encodedPcd)
        }
        window.addEventListener("message", receiveMessage, false)
    }, [])

    // Request a Zuzalu UUID-revealing proof from Passport
    const { signatureProof, signatureProofValid } = useSemaphoreSignatureProof(pcdStr)

    // Extract UUID, the signed message of the returned PCD
    useEffect(() => {
        if (signatureProofValid && signatureProof) {
            const userUuid = signatureProof.claim.signedMessage
            console.log("USER UUID", userUuid)
            setUuid(userUuid)
        }
    }, [signatureProofValid, signatureProof])

    // Finally, once we have the UUID, fetch the participant data from Passport.
    const { participant, error, loading } = useFetchParticipant(PASSPORT_SERVER_URL, uuid)

    const loginProof = async () => {
        try {
            console.log("log my proof", participant)
            const response = await axios({
                method: "post",
                url: "https://6926-2806-107e-13-7a7d-ecfe-ae4f-9f24-c3d8.ngrok.io/api/passport-user-login/",
                data: participant,
                headers: {
                    "Content-Type": "application/json"
                }
            })

            console.log("req response", response)
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            window.location.reload
        } catch (error1) {
            console.error(error1)
        }
    }

    useEffect(() => {
        if (participant) {
            console.log("PARTICIPANT", participant)
            setParticipentData(participant)
            // TODO: Login Flow
            loginProof()
        }
    }, [])
    // Finally, once we have the UUID, fetch the participant data from Passport.

    return (
        <div className="flex p-5 justify-between w-full m-auto z-10 bg-zulalu-darkBase items-center">
            <div className="flex relative overflow-hidden gap-5 items-center">
                <NextLink href={"/"}>
                    <div className="flex cursor-pointer gap-2 items-center justify-center ">
                        <NextImage src={"/logo.png"} objectFit="contain" width="200px" height="50px" />
                    </div>
                </NextLink>

                {session && session.user && (
                    <li className="flex gap-5 items-center text-white">
                        <h1>Passport Connected</h1>
                    </li>
                )}
            </div>
            <ul className="flex gap-5 items-center text-white">
                {/* <li>About</li> */}
                <NextLink href={"/events"}>
                    <li className="cursor-pointer">Schedule</li>
                </NextLink>
                {/* <li>FAQ</li> */}
                {session && session.user ? (
                    <li>
                        <NextLink href="/myprofile">My Profile</NextLink>
                    </li>
                ) : (
                    <li>
                        <button
                            className="bg-zulalu-primary text-white py-[8px] px-[16px] rounded-[8px]"
                            onClick={requestSignedZuID}
                        >
                            Connect Passport
                        </button>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Header
