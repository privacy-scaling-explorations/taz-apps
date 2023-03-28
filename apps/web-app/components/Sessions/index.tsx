import NextImage from "next/image"
import NextLink from "next/link"
import moment from "moment"
import ParticipateButton from "../ParticipateButton"
import FavoriteButton from "../FavoriteButton"
import { SessionsDTO, EventsDTO } from "../../types"
import { useUserAuthenticationContext } from "../../context/UserAuthenticationContext"

type Props = {
    event: EventsDTO
    sessions: SessionsDTO[]
}
const Sessions = ({ event, sessions }: Props) => {
    const { userInfo } = useUserAuthenticationContext()

    return (
        <div className="w-full flex flex-col items-start py-[2px] gap-[16px] rounded-[16px]">
            {sessions.map((item, index) => (
                <div className="w-full" key={index}>
                    <div className="bg-[#1C2928] w-full flex flex-row items-center rounded-[8px]">
                        <p className="text-white py-[8px] px-[16px]">
                            {item.startDate &&
                            item.startTime &&
                            moment.utc(`${item.startDate}T${item.startTime}`).isValid()
                                ? moment.utc(`${item.startDate}T${item.startTime}`).format("h A [|] dddd, MMMM Do")
                                : "\u00A0"}
                        </p>
                    </div>

                    <div className="w-full pl-5 md:pl-0 flex gap-2 flex-row md:flex-col items-start">
                        <div className="flex md:hidden mt-6">
                            <FavoriteButton session={item} isMiniButton={true} />
                        </div>
                        <div className="w-full flex flex-col items-start gap-[32px] bg-[#FCFFFE]] p-[16px]">
                            <div className="w-full flex flex-row justify-between items-center gap-[67px]]">
                                <div className="flex flex-row items-center gap-[16px]">
                                    <NextLink href={`/event/${item.event_id}/session/${item.id}`}>
                                        <h3 className="text-lg text-[#424242] font-[600] text-[24px] border-b border-[#52B5A4] cursor-pointer">
                                            {item.name}
                                        </h3>
                                    </NextLink>

                                    <div className="hidden md:flex">
                                        <FavoriteButton session={item} isMiniButton={true} />
                                    </div>
                                </div>
                                <div className="hidden md:flex">
                                    <ParticipateButton session={item} isTallButton={false} />
                                </div>
                            </div>
                            <div className="w-full flex flex-col md:flex-row gap-[32px] justify-between md:items-center items-start">
                                <div className="hidden md:flex flex-row items-start gap-[8px]">
                                    {item.team_members?.map((organizer: any, key: any) => (
                                        <div
                                            className="flex flex-row items-center bg-[#E4EAEA] py-[4px] px-[8px] gap-[8px] text-sm rounded-[4px]"
                                            key={key}
                                        >
                                            {organizer.role === "Speaker" && (
                                                <NextImage
                                                    src={"/user-icon-6.svg"}
                                                    alt="user-icon-6"
                                                    width={24}
                                                    height={24}
                                                />
                                            )}
                                            {organizer.role === "Organizer" && (
                                                <NextImage
                                                    src={"/user-icon-4.svg"}
                                                    alt="user-icon-6"
                                                    width={24}
                                                    height={24}
                                                />
                                            )}
                                            {organizer.role === "Facilitator" && (
                                                <NextImage
                                                    src={"/user-icon-5.svg"}
                                                    alt="user-icon-5"
                                                    width={24}
                                                    height={24}
                                                />
                                            )}
                                            <p className="text-[#1C2928] font-[400] text-[16px]">
                                                {organizer.role}:{" "}
                                                <span className="font-[600] capitalize">{organizer.name}</span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col md:flex-row w-full md:w-auto justify-between items-start md:items-end gap-3 md:gap-[32px] text-sm">
                                    <div className="flex flex-row items-center gap-[8px]">
                                        <NextImage
                                            src={"/vector-calendar.svg"}
                                            alt="vector-clock"
                                            width={16}
                                            height={16}
                                        />
                                        <p className="text-[#708E8C] text-[18px]">
                                            {item.startDate && moment(`${item.startDate}T00:00:00Z`).isValid()
                                                ? moment(`${item.startDate}T${item.startTime}`).format("dddd, MMMM Do")
                                                : "\u00A0"}
                                        </p>
                                    </div>
                                    <div className="flex flex-row items-center gap-[8px]">
                                        <NextImage
                                            src={"/vector-clock.svg"}
                                            alt="vector-clock"
                                            width={16}
                                            height={16}
                                        />
                                        <p className="text-[#708E8C] text-[18px]">{item.startTime}</p>
                                    </div>
                                    <div className="flex flex-row items-center gap-[8px] border-b border-[#708E8C] text-[#708E8C]">
                                        <NextImage src={"/vector-location.svg"} alt="location" width={15} height={15} />
                                        <p className="text-[18px]">{item.location}</p>
                                    </div>
                                </div>
                                <div className="flex md:hidden flex-col items-start gap-[8px]">
                                    {item.team_members?.map((organizer: any, key: any) => (
                                        <div
                                            className="flex flex-row items-center bg-[#E4EAEA] py-[4px] px-[8px] gap-[8px] text-sm rounded-[4px]"
                                            key={key}
                                        >
                                            {organizer.role === "Speaker" && (
                                                <NextImage
                                                    src={"/user-icon-6.svg"}
                                                    alt="user-icon-6"
                                                    width={24}
                                                    height={24}
                                                />
                                            )}
                                            {organizer.role === "Organizer" && (
                                                <NextImage
                                                    src={"/user-icon-4.svg"}
                                                    alt="user-icon-6"
                                                    width={24}
                                                    height={24}
                                                />
                                            )}
                                            {organizer.role === "Facilitator" && (
                                                <NextImage
                                                    src={"/user-icon-5.svg"}
                                                    alt="user-icon-5"
                                                    width={24}
                                                    height={24}
                                                />
                                            )}
                                            <p className="text-[#1C2928] font-[400] text-[16px]">
                                                {organizer.role}:{" "}
                                                <span className="font-[600] capitalize">{organizer.name}</span>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex md:hidden w-full">
                                    <ParticipateButton session={item} isTallButton={false} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default Sessions
