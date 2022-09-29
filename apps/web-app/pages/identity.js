import { useState, useEffect } from 'react'

import QRCode from 'qrcode'
import Link from 'next/link'
import UserIdentity from '../components/GenerateIdentity'
import BackTAZ from '../components/ArrowNavigators/BackTAZ'

export default function GenerateIdentityPage() {
  const [identity, setIdentity] = useState()
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    const identityKey = window.localStorage.getItem('identity')
    setIdentity(identityKey)
    const opts = {
      type: 'image/jpeg',
      color: {
        dark: '#1E1E1E',
        light: '#EAE1DA'
      }
    }
    QRCode.toDataURL(identityKey, opts).then((response) => {
      setImageUrl(response)
    })
  })

  return (
    <div className="h-[920px] flex flex-col  justify-start bg-brand-blue ">
      <div className="flex flex-col items-start justify-center w-full px-20 mt-20">
        {' '}
        <Link href="/experiences-page">
          <div className="flex max-full max-h-[32px] bg-black pr-2  mb-10 text-xl text-brand-beige2 cursor-pointer shadow-[2.0px_3.0px_3.0px_rgba(0,0,0,0.38)] flex-end">
            <BackTAZ />
            <h1>TAZ</h1>
          </div>
        </Link>
        <div className="flex flex-col w-full items-center mt-[100px]">
          <img src={imageUrl} alt="img" className="mb-7 rounded-xl" />

          <p className="text-[#EAE1DA] text-opacity-70 text-[12px] mt-[100px]">
            Take a screen shot of this Qr code to save it.
          </p>
        </div>
        {/* <Link href="/">
          <button className="border-2 border-brand-gray2 bg-brand-gray2 text-brand-beige p-2 text-[20px] rounded-2xl mt-20">
            <div className="flex items-center">
              <span>Go back Menu</span>
            </div>
          </button>
        </Link> */}
      </div>
    </div>
  )
}
