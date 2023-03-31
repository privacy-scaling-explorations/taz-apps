import { useRouter } from "next/router"
import { createContext, ReactNode, useState, useContext, useEffect } from "react"
import { requestSignedZuzaluUUIDUrl, useFetchParticipant, useSemaphoreSignatureProof } from "@pcd/passport-interface"
import axios from "axios"

type UserPassportContextData = {
    requestSignedZuID: () => void
    errorPassport: boolean
    loadingPassport: {
        step: number
        text: string
    }
}

type UserPassportProviderProps = {
    children: ReactNode
}

export const UserPassportContext = createContext({} as UserPassportContextData)

export function UserPassportContextProvider({ children }: UserPassportProviderProps) {
    const [uuid, setUuid] = useState<string | undefined>()
    const [pcdStr, setPcdStr] = useState("")
    const router = useRouter()
    const [loadingPassport, setLoadingPassport] = useState({
        step: 0,
        text: ""
    })
    const [errorPassport, setErrorPassport] = useState(false)

    const PASSPORT_URL = "https://zupass.org/"
    const PASSPORT_SERVER_URL = "https://api.pcd-passport.com/"

    function requestProofFromPassport(proofUrl: string) {
        const popupUrl = `/popup?proofUrl=${encodeURIComponent(proofUrl)}`
        window.open(popupUrl, "_blank", "width=360,height=480,top=100,popup")
    }

    function requestSignedZuID() {
        setLoadingPassport({ step: 1, text: "Waiting to prove passport..." })
        const proofUrl = requestSignedZuzaluUUIDUrl(PASSPORT_URL, `${window.location.origin}/popup`)
        requestProofFromPassport(proofUrl)
    }

    // Listen for PCDs coming back from the Passport popup
    useEffect(() => {
        async function receiveMessage(ev: MessageEvent<any>) {
            if (!ev.data.encodedPcd) return
            setLoadingPassport({ step: 2, text: "Waiting response..." })
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
            setUuid(userUuid)
        }
    }, [signatureProofValid, signatureProof])

    // Finally, once we have the UUID, fetch the participant data from Passport.
    const { participant } = useFetchParticipant(PASSPORT_SERVER_URL, uuid)

    const loginProof = async (participant1: any) => {
        try {
            await axios({
                method: "post",
                url: "https://zuzalu.city/api/passport-user-login/",
                data: participant1,
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((response) => {
                    if (response.status === 200) {
                        setLoadingPassport({
                            step: 4,
                            text: "SUCCESS"
                        })

                        setTimeout(() => {
                            setLoadingPassport({
                                step: 0,
                                text: ""
                            })
                        }, 3000)
                        setErrorPassport(false)
                        router.push("/").then(() => {
                            router.reload()
                        })
                    }
                })
                .catch((error) => {
                    console.log("AXIOS CALL USER PASSPORT CONTEXT POST", error)
                    setErrorPassport(true)
                })
        } catch (error1) {
            console.error("error1", error1)
            setErrorPassport(true)
        }
    }

    useEffect(() => {
        if (participant) {
            setLoadingPassport({ step: 3, text: "Logging you in..." })
            loginProof(participant)
        }
    }, [participant])

    return (
        <UserPassportContext.Provider value={{ requestSignedZuID, loadingPassport, errorPassport }}>
            {children}
        </UserPassportContext.Provider>
    )
}

export const useUserPassportContext = () => useContext(UserPassportContext)
