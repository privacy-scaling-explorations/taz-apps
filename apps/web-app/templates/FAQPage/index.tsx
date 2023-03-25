import React, { Fragment, useState } from "react"
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react"
import BaseTemplate from "../Base"

import { logistics, health, participation } from "../../data/faqQuestionsAnswers"

const FAQPage = () => {
    const [participationAcc, setParticipationAcc] = useState(1)
    const [healthAcc, setHealthAcc] = useState(1)
    const [logisticsAcc, setLogisticsAcc] = useState(1)

    const handleOpenParticipation = (value: number) => {
        setParticipationAcc(participationAcc === value ? 0 : value)
    }
    const handleOpenHealth = (value: number) => {
        setHealthAcc(healthAcc === value ? 0 : value)
    }

    const handleOpenLogistics = (value: number) => {
        setLogisticsAcc(logisticsAcc === value ? 0 : value)
    }

    return (
        <BaseTemplate>
            <Fragment>
                <div className="flex flex-col border border-black p-5 bg-[#EEEEF0] gap-5 w-full h-full">
                    <div className="flex gap-5 flex-col p-5 md:p-10 bg-white rounded-[16px]">
                        <h1 className="font-[600] text-[40px]">FAQ</h1>
                        <div className="shadow shadow-md flex flex-col flex bg-[#F8FAFA] rounded-[16px]">
                            <h1 className="text-[32px] mb-5 p-5 font-[600]">Logistics</h1>
                            {logistics.map((item, index) => (
                                <Accordion
                                    key={index}
                                    open={logisticsAcc === index}
                                    onResize={undefined}
                                    onResizeCapture={undefined}
                                    className="bg-white p-2 md:px-5"
                                >
                                    <AccordionHeader
                                        className="border-b-[#52B5A4]"
                                        onClick={() => handleOpenLogistics(index)}
                                        onResize={undefined}
                                        onResizeCapture={undefined}
                                    >
                                        <div className="w-full justify-start text-start items-start flex">
                                            {item.question}
                                        </div>
                                    </AccordionHeader>
                                    <AccordionBody>{logisticsAcc === index && <div>{item.answer}</div>}</AccordionBody>
                                </Accordion>
                            ))}
                        </div>

                        <div className="shadow shadow-md flex flex-col flex bg-[#F8FAFA] rounded-[16px]">
                            <h1 className="font-[600] text-[40px] p-5">Participation</h1>
                            {participation.map((item, index) => (
                                <Accordion
                                    key={index}
                                    open={participationAcc === index}
                                    onResize={undefined}
                                    onResizeCapture={undefined}
                                    className="bg-white p-2 md:px-5"
                                >
                                    <AccordionHeader
                                        onClick={() => handleOpenParticipation(index)}
                                        onResize={undefined}
                                        onResizeCapture={undefined}
                                        className="border-b-[#52B5A4]"
                                    >
                                        <div className="w-full justify-start text-start items-start flex">
                                            {item.question}
                                        </div>
                                    </AccordionHeader>
                                    <AccordionBody>
                                        {participationAcc === index && <div>{item.answer}</div>}
                                    </AccordionBody>
                                </Accordion>
                            ))}
                        </div>

                        <div className="shadow shadow-md flex flex-col flex bg-[#F8FAFA] rounded-[16px]">
                            <h1 className="font-[600] text-[40px] p-5">Health</h1>
                            {health.map((item, index) => (
                                <Accordion
                                    key={index}
                                    open={healthAcc === index}
                                    onResize={undefined}
                                    onResizeCapture={undefined}
                                    className="bg-white p-2 md:px-5"
                                >
                                    <AccordionHeader
                                        onClick={() => handleOpenHealth(index)}
                                        onResize={undefined}
                                        className="border-b-[#52B5A4]"
                                        onResizeCapture={undefined}
                                    >
                                        <div className="w-full justify-start text-start items-start flex">
                                            {item.question}
                                        </div>
                                    </AccordionHeader>
                                    <AccordionBody>{healthAcc === index && <div>{item.answer}</div>}</AccordionBody>
                                </Accordion>
                            ))}
                        </div>
                    </div>
                </div>
            </Fragment>
        </BaseTemplate>
    )
}
export default FAQPage
