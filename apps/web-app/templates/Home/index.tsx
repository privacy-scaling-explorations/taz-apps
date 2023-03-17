import Head from "next/head"
import MainSection from "../../components/MainSection"

import BaseTemplate from "../Base"

const HomeTemplate = () => (
    <BaseTemplate>
        <Head>
            <title>Home</title>
            <meta property="og:title" content="My new title" key="title" />
        </Head>
        <div className="flex flex-col w-full">
            <MainSection />
        </div>
    </BaseTemplate>
)

export default HomeTemplate
