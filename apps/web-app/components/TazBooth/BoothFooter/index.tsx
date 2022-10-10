import React from "react"
import Image from "next/image"
import rabitAnimation from "../../svgElements/rabbit-animation.gif"

import BoothLogo from "../BoothLogo"

const BoothFooter = () => (
    <div className="flex justify-between h-[329px] px-20 items-center bg-brand-black text-brand-beige overflow-hidden">
        <BoothLogo />
        <div className="text-brand-beige">
            <h1 className="text-2xl font-extrabold mb-8">Co-created, anonymous faces</h1>
            <p className="text-lg">
                People are anonymously contributing to 4 active canvases above 👆 Check out the gallery of completed
                canvases in the app.
            </p>
        </div>
        <div className="relative w-8/12 h-auto -bottom-8">
            <Image src={rabitAnimation} alt="Animation of rabit drawing face" />
        </div>
        <div className="text-brand-beige">
            <h1 className="text-2xl font-extrabold mb-8">To participate, grab an invite!</h1>
            <p className="text-lg">
                Generate a Semaphore identity so that you can collaborate anonymously. Your ID comes with 1 chance to
                vote for your favorite canvas.
            </p>
        </div>
    </div>
)

export default BoothFooter
