import NextImage from "next/image"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { requestSignedZuzaluUUIDUrl, useFetchParticipant, useSemaphoreSignatureProof } from "@pcd/passport-interface"
import axios from "axios"
import { useUserAuthenticationContext } from "../../context/UserAuthenticationContext"

const Header = () => {
    const { isAuth } = useUserAuthenticationContext()
    const [uuid, setUuid] = useState<string | undefined>()
    const [pcdStr, setPcdStr] = useState("")
    const [participentData, setParticipentData] = useState<any>()
    const router = useRouter()

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

    const loginProof = async (participant1: any) => {
        try {
            console.log("log my proof", participant1)
            const response = await axios({
                method: "post",
                url: "https://taz-zulalu-web-app.vercel.app/api/passport-user-login/",
                data: participant1,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log("req response", response)
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            router.push("/")
        } catch (error1) {
            console.error(error1)
        }
    }

    useEffect(() => {
        console.log("pp", participant)
        if (participant) {
            console.log("PARTICIPANT", participant)
            setParticipentData(participant)
            // TODO: Login Flow

            loginProof(participant)
        }
    }, [participant])

    return (
        <div className="flex p-5 justify-between w-full m-auto z-10 bg-zulalu-darkBase items-center">
            <div className="flex relative overflow-hidden gap-5 items-center">
                <NextLink href={"/"}>
                    <div className="flex cursor-pointer gap-2 items-center justify-center ">
                        <NextImage src={"/logo.png"} objectFit="contain" width="200px" height="50px" />
                    </div>
                </NextLink>

                {isAuth && (
                    <div className="flex gap-2 text-[#B1F9CA] justify-center items-center text-white text-[18px]">
                        <div className="w-[8px] h-[8px] bg-[#B1F9CA] rounded-full" />
                        <h1>Passport Connected</h1>
                    </div>
                )}
            </div>
            <ul className="flex gap-5 items-center text-white">
                <NextLink href={"/events"}>
                    <li className="cursor-pointer">Schedule</li>
                </NextLink>
                {isAuth ? (
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
