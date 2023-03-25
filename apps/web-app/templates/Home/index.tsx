import Head from "next/head"
import MainSection from "../../components/MainSection"
import Events from "../../components/Events"

import BaseTemplate from "../Base"
import { EventsDTO } from "../../types"

type Props = {
    events: EventsDTO[]
}

const HomeTemplate = ({ events }: Props) => (
    <BaseTemplate>
        <Head>
            <title>Home</title>
            <meta property="og:title" content="My new title" key="title" />
        </Head>

        <div className="flex flex-col min-h-[100vh] bg-[#EEEEF0] p-5 gap-10">
            <MainSection />
            <Events events={events} />
        </div>
    </BaseTemplate>
)

export default HomeTemplate
