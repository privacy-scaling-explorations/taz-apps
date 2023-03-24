import NextImage from "next/image"
import NextLink from "next/link"
import { useEffect, useState } from "react"
import { requestSignedZuzaluUUIDUrl, useFetchParticipant, useSemaphoreSignatureProof } from "@pcd/passport-interface"
import axios from "axios"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { usePassportModalContext } from "../../context/PassportModalContext"
import getUserSession from "../../hooks/getUserSession"

const supabase = createBrowserSupabaseClient()

const Header = () => {
    const { openPassportModal, setOpenPassportModal } = usePassportModalContext()
    const [session, setSession] = useState<any>(null)
    const [uuid, setUuid] = useState<string | undefined>()
    const [pcdStr, setPcdStr] = useState("")
    const [participentData, setParticipentData] = useState<any>()
    const userObj = getUserSession()
    const [navbar, setNavbar] = useState(false)

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
            window.location.reload
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

    useEffect(() => {
        ;(async () => {
            const userSession = await supabase.auth.getUser()
            console.log("user object", userSession)
            setSession(userSession)
        })()
    }, [])

    return (
        <div className="relative flex p-5 justify-between w-full m-auto z-10 bg-zulalu-darkBase items-center">
            <div className="flex relative overflow-hidden gap-5 items-center">
                <NextLink href={"/"}>
                    <div className="flex cursor-pointer gap-2 items-center justify-center">
                        <NextImage src={"/logo.svg"} objectFit="contain" width="50px" height="50px" />
                        <h1 className="hidden md:block uppercase tracking-[5px] text-[25px] text-white font-cinzel font-bold">
                            ZULALU
                        </h1>
                        {session && session.data.user ? (
                            <li>
                                <NextLink href="/myprofile">
                                    <a className="font-openSans text-zulalu-lightBase text-lg leading-7 uppercase">
                                        My Profile
                                    </a>
                                </NextLink>
                            </li>
                        ) : (
                            <li className="md:hidden">
                                <button
                                    className="bg-zulalu-primary text-white py-[8px] px-[16px] rounded-[8px] font-openSans text-lg leading-7 uppercase"
                                    onClick={requestSignedZuID}
                                >
                                    Connect Passport
                                </button>
                            </li>
                        )}
                    </div>
                </NextLink>

                {session && session.user && (
                    <li className="flex gap-5 items-center text-white">
                        <h1>Passport Connected</h1>
                    </li>
                )}
            </div>
            {/* Add the burger menu button */}
            <div className="md:hidden">
                <button
                    className="p-2 text-white rounded-md outline-none focus:border-gray-400 focus:border"
                    onClick={() => setNavbar(!navbar)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            {/* Add the responsive dropdown menu */}
            <div
                className={`${
                    navbar ? "block" : "hidden"
                } md:hidden absolute left-0 top-full mt-0 bg-zulalu-darkBase p-4 w-full flex flex-row items-start px-4 py-8 space-x-2`}
            >
                <ul className="list-none flex flex-col gap-4 text-f8fffe text-lg uppercase font-normal">
                    <NextLink href={"/events"}>
                        <li className="cursor-pointer" style={{ width: "51px", height: "25px", color: "#F8FFFE" }}>
                            Program
                        </li>
                    </NextLink>
                </ul>
            </div>

            {/* desktop menu */}
            <div className="hidden md:flex space-x-8 items-center">
                <NextLink href="/events">
                    <a
                        className="font-openSans font-normal text-[18px] leading-[25px] cursor-pointer mr-4"
                        style={{ width: "51px", height: "25px", color: "#F8FFFE" }}
                    >
                        Program
                    </a>
                </NextLink>
                {session && session.data.user ? (
                    <NextLink href="/myprofile">
                        <a className="font-openSans text-zulalu-lightBase text-lg leading-7 uppercase cursor-pointer">
                            My Profile
                        </a>
                    </NextLink>
                ) : (
                    <button
                        className="bg-zulalu-primary text-white py-[8px] px-[16px] rounded-[8px] font-openSans text-lg leading-7 uppercase"
                        onClick={requestSignedZuID}
                    >
                        Connect Passport
                    </button>
                )}
            </div>
        </div>
    )
}

export default Header
