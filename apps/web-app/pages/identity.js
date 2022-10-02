import { useState, useEffect } from "react"

import QRCode from "qrcode"
import Link from "next/link"
import UserIdentity from "../components/GenerateIdentity"
import BackLink from "../components/Buttons/BackLink"

export default function GenerateIdentityPage() {
    const [identity, setIdentity] = useState()
    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {
        const identityKey = window.localStorage.getItem("identity")
        setIdentity(identityKey)
        const opts = {
            type: "image/jpeg",
            color: {
                dark: "#1E1E1E",
                light: "#EAE1DA"
            }
        }
        QRCode.toDataURL(identityKey, opts).then((response) => {
            setImageUrl(response)
        })
    })

    return (
        <div className="h-[920px] flex flex-col  justify-start bg-brand-blue ">
            <div className="flex flex-col items-start justify-center w-full px-9 mt-9">
                {" "}
                <div className="mb-10">
                    <BackLink hre="/experiences-page" />
                </div>
                <div className="flex flex-col w-full items-center mt-20">
                    <img src={imageUrl} alt="img" className="mb-20 rounded-xl" />

                    <p className="text-brand-beige text-center text-opacity-70 text-brand-body px-10">
                        Take a screen shot of this Qr code to save it.
                    </p>
                </div>
            </div>
        </div>
    )
}
