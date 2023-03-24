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
    const [navbar, setNavbar] = useState(false)
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
                url: "https://911d-183-88-82-230.ap.ngrok.io/api/passport-user-login/",
                data: participant1,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log("req response", response)
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            router.push("/").then(() => {
                router.reload();
            });
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
    console.log(isAuth)

    return (
        <div className="relative px-[24px] flex flex-row h-[112px] justify-between w-full z-10 bg-zulalu-darkBase items-center">
            <div className="flex relative overflow-hidden gap-5 items-center">
                <NextLink href={"/"}>
                    <div className="hidden md:flex cursor-pointer gap-2 items-center justify-center ">
                        <NextImage src={"/logo.png"} objectFit="contain" width="200px" height="50px" />
                    </div>
                </NextLink>
                <NextLink href={"/"}>
                    <div className="md:hidden flex cursor-pointer gap-2 items-center justify-center ">
                        <NextImage src={"/logo-small.png"} objectFit="contain" width="50px" height="50px" />
                    </div>
                </NextLink>

                {isAuth && (
                    <div className="flex gap-2 text-[#B1F9CA] justify-center items-center text-white text-[18px] text-center">
                        <div className="w-[8px] h-[8px] bg-[#B1F9CA] rounded-full" />
                        <h1 className="text-[#B1F9CA] text-[18px] font-[400]">Passport Connected</h1>
                    </div>
                )}
            </div>
            <div className="md:hidden">
                <button
                    className="p-2 text-white rounded-md outline-none focus:border-gray-400 focus:border"
                    onClick={() => setNavbar(!navbar)}
                >
                    {navbar ? (
                        <NextImage src={"/close.png"} width={32} height={32} />
                    ) : (
                        <NextImage src={"/hamburger.png"} width={22} height={18} />
                    )}
                </button>
            </div>
            {/* Add the responsive dropdown menu */}
            <div
                className={`${
                    navbar ? "block" : "hidden"
                } md:hidden absolute left-0 top-full mt-0 bg-zulalu-darkBase w-full flex flex-row items-start pt-[16px] pb-[32px] gap-[8px] px-[32px] space-x-2`}
            >
                <ul className="flex flex-col pt-[16px] pb-[32px] w-full gap-[32px] text-f8fffe text-lg uppercase">
                    <NextLink href={"/events"}>
                        <li className="cursor-pointer text-[#F8FFFE] text-[18px] font-[400]">Program</li>
                    </NextLink>
                    <NextLink href={"/myprofile"}>
                        <li className="cursor-pointer text-[#F8FFFE] text-[18px] font-[400]">My Profile</li>
                    </NextLink>
                    {!isAuth && (<a 
                        href="https://airtable.com/shrRZrZbozPE2g6HH"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    <li className="cursor-pointer font-[400] text-[18px] text-[#F8FFFE]">Apply Now</li>
                </a>)}
                </ul>
            </div>
            <ul className="hidden md:flex flex-row gap-5 items-center text-white">
                <NextLink href={"/events"}>
                    <li className="cursor-pointer font-[400] text-[18px] text-[#F8FFFE]">Program</li>
                </NextLink>
                {!isAuth && (<a 
                        href="https://airtable.com/shrRZrZbozPE2g6HH"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    <li className="cursor-pointer font-[400] text-[18px] text-[#F8FFFE]">Apply Now</li>
                </a>)}
                {isAuth ? (
                    <li className="font-[400] text-[18px] text-[#F8FFFE]">
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
