import NextImage from "next/image"
import NextLink from "next/link"
import BaseTemplate from "../Base"

const MyProfilePage = () => (
    <BaseTemplate>
        <div className="flex flex-col bg-[#EEEEF0] px-[24px] py-[24px] gap-[16px]">
            <div className="flex justify-between p-5 bg-white w-full rounded-[8px] flex-wrap">
                <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
                    <div className="flex w-auto gap-2 px-2 py-1 text-[16px] items-center">
                        <NextImage src={"/user-icon-5.svg"} alt="calendar" width={24} height={24} />
                        <p className="font-bold">Samuel</p>
                    </div>
                    <div className="flex w-auto gap-2 px-2 py-1 text-[16px] items-center">
                        <NextImage src={"/vector-location.svg"} alt="location" width={24} height={24} />
                        <p>Ho Chi Minh City</p>
                    </div>
                    <div className="flex w-auto gap-2 px-2 py-1 text-[16px] items-center">
                        <NextImage src={"/vector-computer.svg"} alt="location" width={24} height={24} />
                        <p>Ethereum Foundation</p>
                    </div>
                </div>
                <div className="flex justify-center items-center w-full md:w-auto">
                    <button className="text-[#F8FFFE] bg-[#35655F] rounded-[8px] flex flex-row justify-center items-center py-[8px] px-[16px] flex flex-row gap-[8px] w-full md:w-auto">
                        <NextImage src={"/pencil.svg"} width={13} height={12} />
                        <p>EDIT</p>
                    </button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between h-[100vh]">
                <div className="p-5 flex flex-col items-start bg-white rounded-[8px] w-full md:w-4/6 gap-10">
                                        <div className="flex justify-between w-full">
                        <div className="flex items-center gap-10">
                            <h1 className="font-semibold text-[40px]">My Sessions</h1>
                            <button className="flex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px] h-[40px]">
                                CREATE SESSION
                            </button>
                        </div>
                        <div className="flex items-center">
                            <button className="bg-white border border-primary text-zulalu-primary font-[600] py-[8px] px-[16px] gap-[8px] text-[16px] rounded-[8px] flex flex-row justify-center items-center">
                                <p>ALL MY SESSIONS</p>
                                <NextImage src={"/arrow-down.svg"} width={8} height={4} />
                            </button>
                        </div>
                    </div>

                    {/* This data is mocked */}
                    <div className="flex flex-col gap-2 justify-between w-full">
                        <div className="flex py-[8px] px-[16px] rounded-[8px] items-center gap-10 bg-black w-full text-white">
                            <h1>MARCH 25</h1>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col justify-center w-full gap-5 px-2">
                                <div className="flex flex-row items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <NextLink href={`/event/2/session/2`}>
                                            <h3 className="text-lg text-[#424242] font-[600] text-[24px] border-b border-[#52B5A4] cursor-pointer">
                                                Welcome Ceremony
                                            </h3>
                                        </NextLink>
                                        <NextImage
                                            className="text-[#91A8A7] cursor-pointer"
                                            src={"/vector-bookmark2.svg"}
                                            alt="vector-bookmark"
                                            width={24}
                                            height={24}
                                            // onClick={() => handleClickFavorite()}
                                        />
                                    </div>
                                    <button className="text-[#F8FFFE] h-[30px] bg-[#35655F] rounded-[8px] flex flex-row justify-center items-center py-[8px] px-[16px] flex flex-row gap-[8px]">
                                        <p>RSVP</p>
                                    </button>
                                </div>
                                <div className="w-full flex flex-row gap-[32px] justify-between items-center">
                                    <div className="flex flex-row items-start gap-[8px]">
                                        <div className="flex flex-row items-center bg-[#E4EAEA] py-[4px] px-[8px] gap-[8px] text-sm rounded-[4px]">
                                            <NextImage
                                                src={"/user-icon-6.svg"}
                                                alt="user-icon-6"
                                                width={24}
                                                height={24}
                                            />
                                            <p className="text-[#1C2928] font-[400] text-[16px]">
                                                Organizer: <span className="font-[600] capitalize">Other</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-end gap-[32px] text-sm">
                                        <div className="flex flex-row items-center gap-[8px]">
                                            <NextImage
                                                src={"/vector-clock.svg"}
                                                alt="vector-clock"
                                                width={16}
                                                height={16}
                                            />
                                            <p className="text-[#708E8C] text-[18px]">12-1:30p</p>
                                        </div>
                                        <div className="flex flex-row items-center gap-[8px] border-b border-[#708E8C] text-[#708E8C]">
                                            <NextImage
                                                src={"/vector-location.svg"}
                                                alt="location"
                                                width={15}
                                                height={15}
                                            />
                                            <p className="text-[18px]">Kiki’s Restaurant Outside</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center w-full gap-5 px-2">
                                <div className="flex flex-row items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <NextLink href={`/event/2/session/2`}>
                                            <h3 className="text-lg text-[#424242] font-[600] text-[24px] border-b border-[#52B5A4] cursor-pointer">
                                                Welcome Ceremony
                                            </h3>
                                        </NextLink>
                                        <NextImage
                                            className="text-[#91A8A7] cursor-pointer"
                                            src={"/vector-bookmark2.svg"}
                                            alt="vector-bookmark"
                                            width={24}
                                            height={24}
                                            // onClick={() => handleClickFavorite()}
                                        />
                                    </div>
                                    <button className="text-[#F8FFFE] h-[30px] bg-[#35655F] rounded-[8px] flex flex-row justify-center items-center py-[8px] px-[16px] flex flex-row gap-[8px]">
                                        <p>RSVP</p>
                                    </button>
                                </div>
                                <div className="w-full flex flex-row gap-[32px] justify-between items-center">
                                    <div className="flex flex-row items-start gap-[8px]">
                                        <div className="flex flex-row items-center bg-[#E4EAEA] py-[4px] px-[8px] gap-[8px] text-sm rounded-[4px]">
                                            <NextImage
                                                src={"/user-icon-6.svg"}
                                                alt="user-icon-6"
                                                width={24}
                                                height={24}
                                            />
                                            <p className="text-[#1C2928] font-[400] text-[16px]">
                                                Organizer: <span className="font-[600] capitalize">Other</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-end gap-[32px] text-sm">
                                        <div className="flex flex-row items-center gap-[8px]">
                                            <NextImage
                                                src={"/vector-clock.svg"}
                                                alt="vector-clock"
                                                width={16}
                                                height={16}
                                            />
                                            <p className="text-[#708E8C] text-[18px]">12-1:30p</p>
                                        </div>
                                        <div className="flex flex-row items-center gap-[8px] border-b border-[#708E8C] text-[#708E8C]">
                                            <NextImage
                                                src={"/vector-location.svg"}
                                                alt="location"
                                                width={15}
                                                height={15}
                                            />
                                            <p className="text-[18px]">Kiki’s Restaurant Outside</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* It ends Here */}

                </div>
                <div className="flex flex-col pl-5 w-full md:w-2/6 gap-10 mt-10 md:mt-0">
                                        <div className="flex flex-col p-5 gap-5 bg-white rounded-[8px]">
                        <h1 className="text-[24px] font-semibold">My Sessions</h1>
                        <div className="flex gap-1 flex-col">
                            <h1 className="capitalize">My Sessions</h1>
                            <h1 className="capitalize">My Sessions</h1>
                            <h1 className="capitalize">My Sessions</h1>
                            <h1 className="capitalize">My Sessions</h1>
                        </div>
                    </div>

                    <div className="flex flex-col p-5 gap-5 bg-white rounded-[8px]">
                        <h1 className="text-[24px] font-semibold">My Tickets</h1>
                        <div className="flex gap-1 flex-col">
                            <div className="flex items-center gap-1">
                                <NextImage src={"/vector-ticket-black.svg"} width={14} height={12} />
                                <h1 className="capitalize">My Sessions</h1>
                            </div>
                            <div className="flex items-center gap-1">
                                <NextImage src={"/vector-ticket-black.svg"} width={14} height={12} />
                                <h1 className="capitalize">My Sessions</h1>
                            </div>
                            <div className="flex items-center gap-1">
                                <NextImage src={"/vector-ticket-black.svg"} width={14} height={12} />
                                <h1 className="capitalize">My Sessions</h1>
                            </div>
                            <div className="flex items-center gap-1">
                                <NextImage src={"/vector-ticket-black.svg"} width={14} height={12} />
                                <h1 className="capitalize">My Sessions</h1>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </BaseTemplate>
)

export default MyProfilePage
