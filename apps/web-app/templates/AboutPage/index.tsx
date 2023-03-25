import React from "react"

import BaseTemplate from "../Base"

const AboutPage = () => (
    <BaseTemplate>
        <div className="flex flex-col w-full h-full bg-[#EEEEF0] p-5 gap-10">
            <div className="w-full h-full flex flex-col py-10 md:py-20 px-[28px] overflow-hidden  md:pr-0 pr-4 bg-white rounded-[16px] gap-10 relative">
                <h1 className="text-[32px] md:text-[52px] font-[600] w-full md:w-[700px] pl-0 md:pl-10 z-[10]">
                    Zuzalu is a first-of-its-kind pop-up city community in
                    <span className="relative z-10 inline-block px-2">
                        <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-green-200" />
                        <span className="relative z-10">Montenegro,</span>
                    </span>{" "}
                    from March 25 to May 25, 2023.
                </h1>

                <div className="pl-0 md:pl-10 w-full flex flex-col gap-5 z-[10]">
                    <h1 className="text-[16px] w-full md:w-[500px]">
                        There will be about 200 core residents brought together by a shared desire to learn, create,
                        live longer and healthier lives, and build self-sustaining communities.
                    </h1>
                    <h1 className="text-[16px] w-full md:w-[500px]">
                        Zuzalu will also host a variety of events on topics like synthetic biology, technology for
                        privacy, public goods, longevity, governance and more.
                    </h1>
                </div>
                <div className="hidden md:w-full md:w-[100px] h-[2px] flex bg-[#52B5A4] mt-[60px] mb-[60px]" />
                <div className="flex flex-col gap-5 pl-0 md:pl-10 z-[10]">
                    <h1 className="font-[600] text-[52px]">Join us!</h1>
                    <div className="flex flex-col text-[16px] gap-1">
                        <h1>There are many ways to participate in Zuzalu.</h1>
                        <h1>
                            You{" "}
                            <span className="text-zulalu-primary underline">
                                can attend an event, apply to be a resident
                            </span>
                        </h1>
                        <h1>
                            or
                            <a href="https://airtable.com/shrRZrZbozPE2g6HH" target="_blank" rel="noopener noreferrer">
                                <span className="text-zulalu-primary underline">
                                    {" "}
                                    apply for a short-term visitor pass.
                                </span>
                            </a>
                        </h1>
                    </div>
                </div>
                <div className="z-[7] p-5 my-[100px] relative flex md:absolute w-full right-0 top-0 md:top-[200px] lg:w-3/6 h-[500px] w-full flex justify-center items-center">
                    <div className="absolute z-[10]  bottom-0 border border-black w-[550px] h-[300px] bg-eventbg2 filter blur-[150px] z-[1]" />
                    <div className="absolute z-[9]  border border-black w-[500px] h-[379px] bg-eventbg1 filter blur-[150px] z-[1]" />

                    <div className="top-0 absolute z-[20] w-full h-full bg-contain bg-center bg-no-repeat bg-[url('/vector.png')]" />
                    <div className="top-0 absolute z-[21] w-full h-full bg-contain bg-center bg-no-repeat bg-[url('/49.png')]" />
                </div>
                <div className="flex flex-row w-full gap-3 w-full justify-center relative z-[10]">
                    <div className="flex w-full justify-center items-center md:items-end flex-col lg:pr-[300px] pr-5">
                        <div className="flex items-end relative flex-row h-full gap-5 w-full md:w-[600px]">
                            <div className="bg-bgGradientAboutPage w-[28px] h-[28px] rounded-full absolute top-[15px] left-[-12px]" />
                            <div className="h-[90%] w-[4px] bg-[#52B5A4]" />
                            <div className="flex flex-col max-w-full w-full">
                                <h1 className="text-[24px] font-[600] md:text-[40px]">Learn</h1>
                                <h1 className="w-full md:w-[500px] mb-10">
                                    Zuzalu will be full of opportunities to learn, from themed events to informal
                                    reading groups - think of it like a campus with a 10% course load, where you can
                                    walk around and have a fascinating conversation with anyone.
                                </h1>
                            </div>
                        </div>
                        <div className="flex items-end relative flex-row h-full gap-5 w-full md:w-[600px]">
                            <div className="bg-bgGradientAboutPage w-[28px] h-[28px] rounded-full absolute top-[15px] left-[-12px]" />
                            <div className="h-full w-[4px] bg-[#52B5A4]" />
                            <div className="flex flex-col max-w-full w-full">
                                <h1 className="text-[24px] font-[600] md:text-[40px]">Be Healthy</h1>
                                <h1 className="w-full md:w-[500px] mb-10">
                                    Easily keep a healthy lifestyle by default, with healthy food available,
                                    accountability buddies for healthy habits, group workouts and biohacking trials and
                                    experimentation.
                                </h1>
                            </div>
                        </div>
                        <div className="flex items-end relative flex-row h-full gap-5 w-full md:w-[600px]">
                            <div className="bg-bgGradientAboutPage w-[28px] h-[28px] rounded-full absolute top-[15px] left-[-12px]" />
                            <div className="h-full w-[4px] bg-[#52B5A4]" />
                            <div className="flex flex-col max-w-full w-full">
                                <h1 className="text-[24px] font-[600] md:text-[40px]">Reimagine Aging</h1>
                                <h1 className="w-full md:w-[500px] mb-10">
                                    Advances in aging research are being translated into medicine, in clinical trials.
                                    We will dive into biotech to bring aging under medical control, and into medical
                                    innovation jurisdictions to enable better regulatory pathways for innovating in
                                    longevity therapeutics.
                                </h1>
                            </div>
                        </div>
                        <div className="flex items-end relative flex-row h-full gap-5 w-full md:w-[600px]">
                            <div className="bg-bgGradientAboutPage w-[28px] h-[28px] rounded-full absolute top-[15px] left-[-12px]" />
                            <div className="h-full w-[4px] bg-[#52B5A4]" />
                            <div className="flex flex-col max-w-full w-full">
                                <h1 className="text-[24px] font-[600] md:text-[40px]">Hack</h1>
                                <h1 className="w-full md:w-[500px] mb-10">
                                    We’re creating a meta-hackathon while at Zuzalu. Help us imagine, build and test
                                    tools and infrastructure that optimize for community members to collaborate and
                                    self-organize.
                                </h1>
                            </div>
                        </div>
                        <div className="flex items-end relative flex-row h-full gap-5 w-full md:w-[600px]">
                            <div className="bg-bgGradientAboutPage w-[28px] h-[28px] rounded-full absolute top-[15px] left-[-12px]" />
                            <div className="h-full w-[4px] bg-[#52B5A4]" />
                            <div className="flex flex-col max-w-full w-full">
                                <h1 className="text-[24px] font-[600] md:text-[40px]">Build Community</h1>
                                <h1 className="w-full md:w-[500px] mb-10">
                                    At Zuzalu we hope you feel ownership of what you’re helping create and help build
                                    the city you’d love to live in. We encourage attendees to take responsibility for
                                    their experience and the experience of others, and foster a spirit of
                                    interdependence within the community, to the extent that you are comfortable with.
                                </h1>
                            </div>
                        </div>
                        <div className="flex items-start relative flex-row h-full gap-5 w-full md:w-[600px]">
                            <div className="bg-bgGradientAboutPage w-[28px] h-[28px] rounded-full absolute top-[15px] left-[-12px]" />
                            <div className="h-[40px] w-[4px] bg-[#52B5A4]" />
                            <div className="flex flex-col max-w-full w-full">
                                <h1 className="text-[24px] font-[600] md:text-[40px]">Staying safe at Zuzalu</h1>
                                <h1 className="w-full md:w-[500px]">
                                    Staying safe and respecting consent are important values in our community. We want
                                    to ensure that everyone feels comfortable and secure. To achieve this, we ask that
                                    everyone follows some simple guidelines →
                                </h1>
                                <ul className="flex flex-col w-full md:w-[400px] md:pr-0 pr-5 my-5 gap-5 list-disc ml-10">
                                    <li>
                                        Always ask for consent before engaging in any physical contact or taking photos
                                    </li>
                                    <li>Be mindful of personal boundaries and respect the wishes of others</li>
                                    <li>If you see or experience anything that makes you feel uncomfortable,</li>
                                    <li>
                                        If you see or experience anything that makes you feel uncomfortable, please
                                        speak up and report it to support@zuzalu.org immediately
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BaseTemplate>
)

export default AboutPage
