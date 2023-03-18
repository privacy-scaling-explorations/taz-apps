import NextImage from "next/image"
import { usePassportModalContext } from "../../context/PassportModalContext"

const Header = () => {
    const { setOpenPassportModal } = usePassportModalContext()
    return (
        <div className="flex p-5 justify-between w-full m-auto z-10 bg-zulalu-darkBase items-center">
            <div className="flex relative overflow-hidden gap-5 items-center">
                <div className="flex gap-1">
                    <NextImage src={"/zulalu-logo-header.png"} objectFit="contain" width="25px" height="25px" />
                    <h1 className="uppercase tracking-[5px] text-[20px] text-zulalu-primary">ZULALU</h1>
                </div>
                <button className="bg-zulalu-primary text-white py-[8px] px-[16px] rounded-[8px]">Buy a badge</button>
            </div>
            <ul className="flex gap-5 items-center text-white">
                <li>About</li>
                <li>Schedule</li>
                <li>FAQ</li>
                <li>
                    <button
                        className="bg-zulalu-primary text-white py-[8px] px-[16px] rounded-[8px]"
                        onClick={() => setOpenPassportModal(true)}
                    >
                        Connect Passport
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Header
