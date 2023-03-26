import Head from "next/head"
import MainSection from "../../components/MainSection"
import Events from "../../components/Events"
import NextImage from "next/image"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState, useContext } from "react"
import { requestSignedZuzaluUUIDUrl, useFetchParticipant, useSemaphoreSignatureProof } from "@pcd/passport-interface"
import axios from "axios"
import { useUserAuthenticationContext } from "../../context/UserAuthenticationContext"

import BaseTemplate from "../Base"
import { EventsDTO } from "../../types"

type Props = {
    events: EventsDTO[]
}

const HomeTemplate = ({ events }: Props) => {
    const { isAuth } = useUserAuthenticationContext()
    const [uuid, setUuid] = useState<string | undefined>()
    const [pcdStr, setPcdStr] = useState("")
    const [participentData, setParticipentData] = useState<any>()
    const [navbar, setNavbar] = useState(false)
    const router = useRouter()

    const PASSPORT_URL = "https://zupass.eth.limo/"
    const PASSPORT_SERVER_URL = "https://api.pcd-passport.com/"
    const URL_PASSPORT_API = process.env.URL_PASSPORT_API_URL

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
                url: `${URL_PASSPORT_API}/api/passport-user-login/`,
                data: participant1,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log("req response", response)
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            router.push("/").then(() => {
                router.reload()
            })
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
        <BaseTemplate>
            <Head>
                <title>Zuzalu - home</title>
                <meta property="og:title" content="Zuzalu" key="title" />
            </Head>

            <div className="flex flex-col min-h-[100vh] bg-[#EEEEF0] p-5 gap-10">
                <MainSection />
                {!isAuth && (
                    <div className="flex flex-col items-center px-[32px] gap-[8px] bg-white rounded-[16px]">
                        <div className="flex flex-col md:flex-row justify-center items-center p-[16px] gap-[24px]">
                            <p className="font-[600] text-[18px] w-[310px] h-[50px] md:w-auto md:h-auto">
                                Get access to tickets and build your schedule!
                            </p>
                            <button
                                className="flex flex-row justify-center items-center py-[8px] w-[310px] md:w-[416px] h-[40px] px-[16px] gap-[8px] bg-[#1C2928] rounded-[8px]"
                                onClick={requestSignedZuID}
                            >
                                <NextImage src={"/passport-vector.svg"} width={16} height={16} />
                                <p className="font-[600] text-[16px] text-[#F8FFFE]">Connect Passport</p>
                            </button>
                            <NextLink href="/full-program">
                                <button className="flex flex-row justify-center items-center py-[8px] px-[16px] w-[310px] md:w-[416px] h-[40px] gap-[8px] bg-[#1C2928] rounded-[8px]">
                                    <NextImage src={"/calendar-vector.svg"} width={16} height={16} />
                                    <p className="font-[600] text-[16px] text-[#F8FFFE]">Full Program</p>
                                </button>
                            </NextLink>
                        </div>
                    </div>
                )}
                <Events events={events} />
            </div>
        </BaseTemplate>
    )
}

export default HomeTemplate
