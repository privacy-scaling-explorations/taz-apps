import Image from "next/image"
import { requestSignedZuzaluUUIDUrl, useFetchParticipant, useSemaphoreSignatureProof } from "@pcd/passport-interface"
import getUserSession from "../../hooks/getUserSession"
import { getUserOnID } from "../../hooks/getUserOnID"
import WhiteGlobeVector from "./WhiteGlobeVector"

const MainSection = () => (
    <div className="flex md:flex-row flex-col h-full w-full relative bg-white rounded-[18px]">
        <div className="z-[11] flex w-full px-[72px] py-[180px]">
            <div className="flex w-full flex-col gap-5">
                <h1 className="font-semibold text-[30px] md:text-[60px] md:mb-10">
                    Zuzalu is a first-of-its-kind pop-up city community in{" "}
                    <span className="relative z-10 inline-block px-2">
                        <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-green-200"></span>
                        <span className="relative z-10">Montenegro.</span>
                    </span>{" "}
                </h1>
                <h1 className="font-normal text-[18px] md:text-[24px] w-[auto] md:w-[600px] leading-[25px] md:leading-[25px]">
                    Join 200 core residents brought together by a shared desire to learn, create, live longer and
                    healthier lives, and build self-sustaining communities.
                </h1>
            </div>
        </div>
        <div className="flex z-[10] w-full h-full border border-black relative">
            <div
                className="absolute"
                style={{
                    width: "544.69px",
                    height: "488px",
                    left: "0px",
                    top: "31px",
                    background: "rgba(212, 249, 232, 0.9)",
                    filter: "blur(150px)"
                }}
            ></div>
            <div
                className="absolute"
                style={{
                    width: "478px",
                    height: "379px",
                    left: "0px",
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
                    left: "0px",
                    top: "72px"
                }}
            />
            {/* tower image */}
            <div
                className="absolute"
                style={{
                    width: "476px",
                    height: "436px",
                    left: "100px",
                    top: "147px",
                    background: 'url("image49.png")'
                }}
            ></div>
        </div>
    </div>
)

export default MainSection
