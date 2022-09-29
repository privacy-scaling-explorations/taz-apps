import React from 'react'
import Link from 'next/link'

import { RiArrowLeftSLine } from 'react-icons/ri'

const BackLink = ({ href, children }) => (
  <Link href={href || '/'}>
    <a className="flex items-center w-[76px] h-[32px] cursor-pointer px-2 py-1 bg-black text-xl text-brand-beige2 shadow-[2.0px_3.0px_3.0px_rgba(0,0,0,0.38)]">
      <RiArrowLeftSLine />
      {children || 'TAZ'}
    </a>
  </Link>
)

export default BackLink
