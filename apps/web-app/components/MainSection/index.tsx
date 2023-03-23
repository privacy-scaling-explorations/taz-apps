import { requestSignedZuzaluUUIDUrl, useFetchParticipant, useSemaphoreSignatureProof } from "@pcd/passport-interface"
import { usePassportModalContext } from "../../context/PassportModalContext"
import PassportModal from "../PassportModal"
import { getUserOnID } from "../../hooks/getUserOnID"
import Image from "next/image"
import WhiteGlobeVector from "./WhiteGlobeVector"

const MainSection = () => {
    const { openPassportModal, setOpenPassportModal } = usePassportModalContext()
    const userObj = getUserOnID()
    console.log("user object", userObj)

    const PASSPORT_URL = "https://zupass.eth.limo/"

    function requestProofFromPassport(proofUrl: string) {
        const popupUrl = `/popup?proofUrl=${encodeURIComponent(proofUrl)}`
        window.open(popupUrl, "_blank", "width=360,height=480,top=100,popup")
    }

    function requestSignedZuID() {
        const proofUrl = requestSignedZuzaluUUIDUrl(PASSPORT_URL, `${window.location.origin}/popup`)
        requestProofFromPassport(proofUrl)
    }
    return (
        <div className="flex flex-col min-h-[100vh] bg-[#EEEEF0] p-5 gap-10 z-10">
            <div className="intro flex min-h-[90vh] h-full w-full relative ">
                {/* <button onClick={requestSignedZuID}> Passport </button> */}
                <div
                    className="absolute top-0 h-full w-full bg-no-repeat"
                    style={{ background: "#FFFFFF", opacity: 0.8, borderRadius: "16px" }}
                />
                <div className="absolute right-0 bottom-40 w-[950px] h-[660px] z-3">
                    {/* bunch of images */}

                    {/* green gradient circle */}
                    <div
                        className="absolute"
                        style={{
                            width: "544.69px",
                            height: "488px",
                            left: "251.53px",
                            top: "31px",
                            background: "rgba(212, 249, 232, 0.9)",
                            filter: "blur(150px)"
                        }}
                    ></div>
                    {/* yellow gradient circle */}
                    <div
                        className="absolute"
                        style={{
                            width: "478px",
                            height: "379px",
                            left: "218px",
                            top: "220px",
                            background: "rgba(247, 222, 55, 0.9)",
                            filter: "blur(150px)"
                        }}
                    ></div>
                    {/* svg image */}
                    <WhiteGlobeVector
                        className="absolute"
                        style={{
                            width: "536.07px",
                            height: "508.6px",
                            left: "265.25px",
                            top: "72px"
                        }}
                    />
                    {/* tower image */}
                    <div
                        className="absolute"
                        style={{
                            width: "476px",
                            height: "436px",
                            left: "369px",
                            top: "147px",
                            background: 'url("image49.png")'
                        }}
                    ></div>
                </div>
                <div className="z-[11] flex w-full px-[72px] py-[180px]">
                    <div className="flex w-[700px] flex-col gap-5">
                        <h1 className="font-semibold text-[30px] md:text-[60px] md:mb-10">
                            Zuzalu is a first-of-its-kind pop-up city community in{" "}
                            <span className="relative z-10 inline-block px-2">
                                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-green-200"></span>
                                <span className="relative z-10">Montenegro.</span>
                            </span>{" "}
                        </h1>
                        <h1 className="font-normal text-[18px] md:text-[24px] w-[auto] md:w-[600px] leading-[25px] md:leading-[25px]">
                            Join 200 core residents brought together by a shared desire to learn, create, live longer
                            and healthier lives, and build self-sustaining communities.
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainSection
