import NextImage from "next/image"

const Header = () => (
    <div className="flex p-5 absolute top-0 justify-between w-full m-auto z-10 items-center z-[12]">
        <div className="flex relative overflow-hidden gap-5 items-center">
            <div className="flex gap-1">
                <NextImage src={"/zulalu-logo-header.png"} objectFit="contain" width="25px" height="25px" />
                <h1 className="uppercase tracking-[5px] text-[20px] text-brand-primary">ZULALU</h1>
            </div>
            <button className="bg-brand-primary text-white py-[8px] px-[16px] rounded-[8px]">Buy a badge</button>
        </div>
        <ul className="flex gap-5 items-center">
            <li>About</li>
            <li>Schedule</li>
            <li>FAQ</li>
            <li>
                <button className="bg-brand-primary text-white py-[8px] px-[16px] rounded-[8px]">
                    Connect Passport
                </button>
            </li>
        </ul>
    </div>
)

export default Header
