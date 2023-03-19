import NextImage from "next/image"
import NextLink from "next/link"
import { usePassportModalContext } from "../../context/PassportModalContext"

const Header = () => {
    const { setOpenPassportModal } = usePassportModalContext()
    return (
        <div className="flex p-5 justify-between w-full m-auto z-10 bg-zulalu-darkBase items-center">
            <div className="flex relative overflow-hidden gap-5 items-center">
                <div className="flex gap-2 items-center justify-center ">
                    <NextImage src={"/logo.svg"} objectFit="contain" width="50px" height="50px" />
                    <h1 className="uppercase tracking-[5px] text-[25px] text-white font-cinzel font-bold">ZULALU</h1>
                </div>
                <button className="bg-zulalu-primary text-white py-[8px] px-[16px] rounded-[8px]">Buy a badge</button>
                {/* only be visible when passport connected */}
                {/* <div className="flex items-center gap-2">
                    <div className="w-[8px] h-[8px] bg-[#B1F9CA] rounded-full" />
                    <h1 className="font-[18px] text-[#B1F9CA]">Passport connected</h1>
                </div> */}
            </div>
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
            </ul>
        </div>
    )
}

export default Header
