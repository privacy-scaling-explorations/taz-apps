import Link from "next/link"
import { useEffect, useState } from "react"
import BackTAZ from "../../components/ArrowNavigators/BackTAZ"
import SelectorArrow from "../../components/ArrowNavigators/SelectorArrow"
import Footer from "../../components/Footer"
import BackToTopArrow from "../../components/svgElements/BackToTopArrow"
import Ellipse from "../../components/svgElements/Ellipse"
import RedCircle from "../../components/svgElements/RedCircle"
import YellowCircle from "../../components/svgElements/YellowCircle"

const { FACT_ROTATION_INTERVAL } = require("../../config/goerli.json")
const { FACTS } = require("../../data/facts.json")
const feedback = require("../../data/feedback.json")

export default function Feedback() {
    const [fact, setFact] = useState(FACTS[Math.floor(Math.random() * FACTS.length)])
    const [showTopBtn, setShowTopBtn] = useState(false)

    const rotateFact = () => {
        setFact(FACTS[FACTS.indexOf(fact) + 1 === FACTS.length ? 0 : FACTS.indexOf(fact) + 1])
    }

    useEffect(() => {
        // Set up scroll listening for scroll to top button
        const windowHeight = window.outerHeight

        window.addEventListener("scroll", () => {
            if (window.scrollY > windowHeight) {
                setShowTopBtn(true)
            } else {
                setShowTopBtn(false)
            }
        })
    }, [])

    useEffect(() => {
        setTimeout(rotateFact, FACT_ROTATION_INTERVAL)
    }, [fact])

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <div className="min-h-[700px] relative overflow-hidden h-auto flex flex-col">
            <div className="fixed top-[25%] -left-[14%]">
                <YellowCircle />
            </div>
            <div className="fixed top-[62%] right-[-35%]">
                <Ellipse color="#435C6C" />
            </div>
            <div className="fixed top-[70%] left-[2%]">
                <RedCircle />
            </div>

            {showTopBtn && (
                <div className="fixed bottom-[15%] left-2 z-20 flex justify-end">
                    <button onClick={goToTop}>
                        <BackToTopArrow />
                    </button>
                </div>
            )}

            <div className="z-10 ">
                <Link href="/experiences-page">
                    <div className="flex max-w-[76px] max-h-[32px] bg-black ml-8 mt-8 mb-7 px-1 text-xl text-brand-beige2 cursor-pointer shadow-[2.0px_3.0px_3.0px_rgba(0,0,0,0.38)]">
                        <BackTAZ />
                        <h1>TAZ</h1>
                    </div>
                </Link>
                <div className="px-6 pb-4">
                    <div className="flex flex-col w-full pt-5 pb-2">
                        <h2 className="ml-2 text-2xl leading-5 font-extrabold">TELL US WHAT YOU THINK</h2>
                    </div>
                    <p className="ml-2 text-brand-info text-brand-blue">...</p>
                </div>
            </div>

            {feedback.map(({ topic, questions }) => (
                <div className="relative flex flex-col items-center overflow-hidden mx-6 my-3 rounded-md border-2 border-brand-blue shadow-xl bg-white">
                    <div className="flex w-full justify-between bg-black text-15px text-brand-beige p-3">
                        <div>💡</div>
                        <div>{topic}</div>
                        <div></div>
                    </div>

                    {questions.map(({ id, question }) => (
                        <Link href={`/feedback/${id}`}>
                            <div className="flex w-full flex-row items-center border-brand-blue border-b-[1px] p-4 cursor-pointer">
                                <p className="text-brand-brown opacity-[85%] text-sm leading-5 w-[100%]">{question}</p>
                                <SelectorArrow />
                            </div>
                        </Link>
                    ))}
                </div>
            ))}
            <div className="flex w-full relative justify-center bg-black pb-3 pt-9 mt-10">
                <Footer />
            </div>
        </div>
    )
}
