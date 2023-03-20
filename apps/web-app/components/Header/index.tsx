import NextImage from "next/image"
import NextLink from "next/link"
import { usePassportModalContext } from "../../context/PassportModalContext"
import { useState } from "react"

const Header = () => {
    const { setOpenPassportModal } = usePassportModalContext()
    const [navbar, setNavbar] = useState(false)
    return (

        <div className="flex p-5 justify-between w-full m-auto z-10 bg-zulalu-darkBase items-center">
            <div className="flex relative overflow-hidden gap-5 items-center">
                <NextLink href={"/"}>
                    <div className="flex cursor-pointer gap-2 items-center justify-center ">

                        <NextImage src={"/logo.svg"} objectFit="contain" width="50px" height="50px" />
                        <h1 className="uppercase tracking-[5px] text-[25px] text-white font-cinzel font-bold">
                            ZULALU
                        </h1>
                    </div>

                </NextLink>
                <button className="bg-zulalu-primary text-white py-[8px] px-[16px] rounded-[8px]">Buy a badge</button>
                {/* only be visible when passport connected */}
                {/* <div className="flex items-center gap-2">
                    <div className="w-[8px] h-[8px] bg-[#B1F9CA] rounded-full" />
                    <h1 className="font-[18px] text-[#B1F9CA]">Passport connected</h1>
                </div> */}
            </div>
            <ul className="flex gap-5 items-center text-white">
                {/* <li>About</li> */}
                <NextLink href={"/events"}>
                    <li className="cursor-pointer">Schedule</li>
                </NextLink>
                {/* <li>FAQ</li> */}
                <li>

                    <button
                        className="p-2 text-white rounded-md outline-none focus:border-gray-400 focus:border"
                        onClick={() => setNavbar(!navbar)}
                    >
                        {navbar ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
                <div className={`hidden md:block`}>
                    <ul className="flex gap-5 items-center text-white">
                        {/* <li>About</li> */}
                        <li>Schedule</li>
                        {/* <li>FAQ</li> */}
                        <li>
                            <button
                                className="bg-zulalu-primary text-white py-[8px] px-[16px] rounded-[8px]"
                                onClick={() => setOpenPassportModal(true)}
                            >
                                Connect Passport
                            </button>
                        </li>
                        <li>
                            <NextLink href="/myprofile">My Profile</NextLink>
                        </li>
                        <li>
                            <button className="bg-zulalu-primary text-white py-[8px] px-[16px] rounded-[8px]">
                                Buy a badge
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`${navbar ? "block" : "hidden"} md:hidden bg-zulalu-darkBase w-full`}>
                <ul className="flex flex-col items-center text-white pb-5">
                    {/* <li className="my-2">About</li> */}
                    <li className="my-2">Schedule</li>
                    {/* <li className="my-2">FAQ</li> */}
                    <li className="my-2">
                        <button
                            className="bg-zulalu-primary text-white py-[8px] px-[16px] rounded-[8px] w-full"
                            onClick={() => setOpenPassportModal(true)}
                        >
                            Connect Passport
                        </button>
                    </li>
                    <li className="my-2">
                        <NextLink href="/myprofile">
                            <a className="bg-zulalu-primary text-white py-[8px] px-[16px] rounded-[8px] w-full">
                                My Profile
                            </a>
                        </NextLink>
                    </li>
                    <li className="my-2">
                        <button className="bg-zulalu-primary text-white py-[8px] px-[16px] rounded-[8px] w-full">
                            Buy a badge
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header
