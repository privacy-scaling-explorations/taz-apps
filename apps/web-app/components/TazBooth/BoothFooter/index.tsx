import React from "react"

import BoothLogo from "../BoothLogo"
import ArtBunnyBooth from "../../svgElements/ArtBunnyBooth"

const BoothFooter = () => (
    <div className="flex justify-between h-1/3 px-20 items-center bg-brand-black text-brand-beige">
        <BoothLogo />
        <div className="text-brand-beige px-20">
            <h1 className="text-2xl font-extrabold mb-8">Co-created, anonymous faces</h1>
            <p className="text-lg">
                People are anonymously contributing to 4 active canvases above 👆 Check out the gallery of completed
                canvases in the app.
            </p>
        </div>
        <div className="scale-x-flip">
            <ArtBunnyBooth className="h-40 w-40 fill-current stroke-current text-brand-beige animate-bounce" />
        </div>
        <div className="text-brand-beige px-20">
            <h1 className="text-2xl font-extrabold mb-8">To participate, grab an invite!</h1>
            <p className="text-lg">
                Generate a Semaphore identity so that you can collaborate anonymously. Your ID comes with 1 chance to
                vote for your favorite canvas.
            </p>
        </div>
    </div>
)

export default BoothFooter
