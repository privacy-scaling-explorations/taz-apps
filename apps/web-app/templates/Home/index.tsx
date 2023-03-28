import Head from "next/head"
import NextImage from "next/image"
import NextLink from "next/link"
import Events from "../../components/Events"
import MainSection from "../../components/MainSection"
import { useUserAuthenticationContext } from "../../context/UserAuthenticationContext"
import { useUserPassportContext } from "../../context/UserPassportContext"

import BaseTemplate from "../Base"
import { EventsDTO } from "../../types"

type Props = {
    events: EventsDTO[]
}

const HomeTemplate = ({ events }: Props) => {
    const { isAuth } = useUserAuthenticationContext()
    const { requestSignedZuID } = useUserPassportContext()

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
