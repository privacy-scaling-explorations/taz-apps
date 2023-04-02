import { useEffect, useState } from "react"
import NextImage from "next/image"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import BaseTemplate from "../Base"
import Sessions from "../../components/Sessions/CalendarPageSessions"
import { useUserAuthenticationContext } from "../../context/UserAuthenticationContext"
import CalendarSessionModal from "../../components/CalendarSessionModal"
import { EventsDTO, SessionsDTO } from "../../types"
import CreateProfileModal from "../../components/CreateProfileModal"
import EditProfileModal from "../../components/EditProfileModal"

const supabase = createBrowserSupabaseClient()

type Props = {
    events: EventsDTO[]
    sessions: SessionsDTO[]
}

const MyProfilePage = ({ events, sessions }: Props) => {
    const { userInfo, userSessions, userParticipatingSessions, userRole } = useUserAuthenticationContext()
    const [eventsOpt, setEventsOpt] = useState<string[]>([])
    const [selectedOpt, setSelectedOpt] = useState<string[]>([])
    const [tickets, setTickets] = useState<any[]>([])
    const [openAddSessionModal, setOpenAddSessionModal] = useState(false)
    const [openCreateProfileModal, setOpenCreateProfileModal] = useState(false)
    const [openEditProfileModal, setOpenEditProfileModal] = useState(false)
    const [profile, setProfile] = useState<any>()
    const [reRender, setRerender] = useState(false)

    const isOrganizer = userRole === "resident"
    async function getUserTickets() {
        try {
            console.log(userInfo!.email)
            const supabaseResponse = await supabase.from("tickets").select("*").eq("email", userInfo!.email)
            console.log("my profile", supabaseResponse)
            if (!supabaseResponse.error) {
                setTickets(supabaseResponse.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchProfile() {
        if (userInfo) {
            try {
                const response = await supabase.from("user_profiles").select().eq("user_id", userInfo!.id).single()
                if (!response.error) {
                    setProfile(response.data)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const openPDFPopup = async (apiURL: any) => {
        const response = await fetch(`/api/download-ticket?apiURL=${encodeURIComponent(apiURL)}`)
        const pdfBlob = await response.blob()
        const pdfURL = URL.createObjectURL(pdfBlob)
        window.open(pdfURL, "_blank", "resizable=yes,scrollbars=yes,width=800,height=600")
    }

    useEffect(() => {
        if (userSessions.length > 0) {
            const eventsName = userSessions.map((item) => item.events).map((event) => event.name.replace("\n", ""))
            const uniqueValues = eventsName.filter((value, index, self) => self.indexOf(value) === index)
            setEventsOpt(uniqueValues)
            getUserTickets()
        }
    }, [userSessions])

    useEffect(() => {
        fetchProfile()
    }, [userInfo, reRender])

    const handleOptionChange = (i: string) => {
        if (selectedOpt.includes(i)) {
            setSelectedOpt(selectedOpt.filter((item) => item !== i))
        } else {
            setSelectedOpt([...selectedOpt, i])
        }
    }

    const sortByDate = userSessions.sort((a, b) => (new Date(a.startDate) as any) - (new Date(b.startDate) as any))

    const filteredSessions =
        selectedOpt.length > 0
            ? sortByDate.filter((item) => selectedOpt.includes(item.events.name.replace("\n", "")))
            : sortByDate
    return (
        <BaseTemplate>
            {/* <div className="flex flex-col bg-[#EEEEF0] px-6 sm:px-12 md:px-[24px] py-6 sm:py-12 md:py-[24px] gap-4 sm:gap-8 md:gap-[16px]"> */}
            <div className="flex flex-col bg-[#EEEEF0] px-4 md:px-[24px] py-4 md:py-[24px] gap-4 md:gap-[16px]">
                <div className="hidden md:flex flex-col items-center px-[32px] gap-[8px] bg-white w-full rounded-[8px] flex-wrap">
                    <div className="flex flex-row justify-between items-center p-[16px] gap-[24px] w-full">
                        <div className="flex flex-row items-start md:items-center w-full md:w-auto mb-4 md:mb-0 space-y-4 md:space-y-0 md:space-x-4">
                            <div className="flex w-auto gap-2 px-2 py-1 text-[16px] items-center">
                                <NextImage src={"/user-icon-5.svg"} alt="calendar" width={24} height={24} />
                                <p className="font-[700] text-[18px]">{userInfo && userInfo.userName}</p>
                            </div>
                            {profile ? (
                                <>
                                    <div className="flex w-auto gap-2 px-2 py-1 items-center">
                                        <NextImage src={"/pin-map.svg"} alt="location" width={16} height={16} />
                                        <p className="text-[16px] font-[600]">{profile?.location}</p>
                                    </div>
                                    <div className="flex w-auto gap-2 px-2 py-1 text-[16px] items-center">
                                        <NextImage src={"/briefcase.svg"} alt="location" width={24} height={24} />
                                        <p className="text-[16px] font-[600]">{profile?.company}</p>
                                    </div>
                                </>
                            ) : (
                                ""
                            )}
                        </div>
                        {profile ? (
                            <button
                                onClick={() => setOpenEditProfileModal(true)}
                                className="flex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
                            >
                                <NextImage src={"/pencil.svg"} alt="edit" height={16} width={16} />
                                <p>EDIT</p>
                            </button>
                        ) : (
                            <button
                                onClick={() => setOpenCreateProfileModal(true)}
                                className="flex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px]"
                            >
                                SET UP PROFILE
                            </button>
                        )}
                    </div>
                </div>

                {profile ? (
                    <div className="flex md:hidden flex-col items-start gap-[8px] bg-white w-full rounded-[16px]">
                        <div className="flex flex-col items-start pt-[16px] px-[16px] pb-[24px] gap-[24px] w-full">
                            <div className="flex flex-col items-start justify-center w-full">
                                <div className="flex flex-row justify-between items-center gap-[24px] w-full">
                                    <div className="flex flex-row items-start gap-[8px]">
                                        <NextImage src={"/user-icon-5.svg"} alt="calendar" width={24} height={24} />
                                        <p className="font-[700] text-[18px] text-[#1C2928]">
                                            {userInfo && userInfo.userName}
                                        </p>
                                    </div>
                                    <button onClick={() => setOpenEditProfileModal(true)}>
                                        <NextImage src={"/vector-pencil.svg"} alt="pencil" height={24} width={24} />
                                    </button>
                                </div>
                                <div className="flex flex-row items-center gap-[8px] w-full">
                                    <div className="flex flex-row items-start py-[8px] px-[4px] gap-[8px]">
                                        <NextImage src={"/pin-map.svg"} alt="mappin" width={16} height={16} />
                                    </div>
                                    <p className="font-[600] text-[16px] text-[#1C2928]">{profile?.location}</p>
                                </div>
                                <div className="flex flex-row items-center gap-[8px]">
                                    <div className="flex flex-row items-start py-[8px] px-[4px] gap-[8px]">
                                        <NextImage src={"/briefcase.svg"} alt="mappin" width={16} height={16} />
                                    </div>
                                    <p className="font-[600] text-[16px] text-[#1C2928]">{profile?.company}</p>
                                </div>
                                <div className="flex flex-row items-start gap-[8px]">
                                    <div className="flex flex-row items-start py-[8px] px-[4px] gap-[8px] w-[24px] h-[24px]">
                                        <NextImage src={"/info.svg"} alt="info" width={16} height={16} />
                                    </div>
                                    <p className="font-[400] text-[16px] text-[#1C2928] w-[310px]">{profile?.bio}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setOpenCreateProfileModal(true)}
                        className="flex md:hidden flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px] w-full h-[48px]"
                    >
                        SET UP PROFILE
                    </button>
                )}
                <CreateProfileModal
                    closeModal={setOpenCreateProfileModal}
                    isOpen={openCreateProfileModal}
                    reRender={reRender}
                    setRerender={setRerender}
                />
                {profile ? (
                    <EditProfileModal
                        closeModal={setOpenEditProfileModal}
                        isOpen={openEditProfileModal}
                        userProfile={profile}
                        setRerender={setRerender}
                        reRender={reRender}
                    />
                ) : (
                    ""
                )}
                <CalendarSessionModal
                    closeModal={setOpenAddSessionModal}
                    isOpen={openAddSessionModal}
                    events={events}
                    sessions={sessions}
                />
                {profile ? (
                    <div className="flex md:hidden flex-col items-start py-[8px] px-[2px] gap-[8px]">
                        <button
                            onClick={() => setOpenAddSessionModal(true)}
                            className="flex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px] w-full h-[48px]"
                        >
                            CREATE SESSION
                        </button>
                    </div>
                ) : (
                    ""
                )}
                <div className="flex flex-col md:flex-row justify-between h-full">
                    <div className="px-[32px] pt-[16px] pb-[40px] flex flex-col items-start bg-white rounded-[8px] w-full md:w-4/6 gap-[8px]">
                        <div className="flex flex-col justify-between w-full gap-[16px]">
                            <div className="flex items-center py-[24px] px-[16px] gap-[24px]">
                                <h1 className="font-semibold text-[24px] md:text-[40px]">My Sessions</h1>
                                {profile ? (
                                    <button
                                        onClick={() => setOpenAddSessionModal(true)}
                                        className="hidden md:flex flex-row font-[600] justify-center items-center py-[8px] px-[16px] gap-[8px] bg-[#35655F] rounded-[8px] text-white text-[16px] h-[40px]"
                                    >
                                        CREATE SESSION
                                    </button>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="flex flex-col items-start p-[2px] gap-[16px]">
                                <Sessions sessions={filteredSessions} showStartDate={true} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col pl-0 md:pl-5 w-full md:w-2/6 gap-10 mt-10 md:mt-0">
                        <div className="flex flex-col p-5 gap-5 bg-white rounded-[8px]">
                            <h1 className="text-[24px] font-semibold">My Sessions</h1>
                            <div className="flex gap-2 flex-col items-start justify-center">
                                {eventsOpt &&
                                    eventsOpt.map((item, index) => (
                                        <label
                                            key={index}
                                            className="flex w-auto items-center gap-2 capitalize text-[16px] cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                name="checkbox"
                                                value="value"
                                                checked={selectedOpt.includes(item)}
                                                onChange={() => handleOptionChange(item)}
                                            />
                                            {item}
                                        </label>
                                    ))}
                            </div>
                        </div>

                        <div className="flex flex-col p-5 gap-5 bg-white rounded-[8px]">
                            <h1 className="text-[24px] font-semibold">My Tickets</h1>
                            <div className="flex gap-2 flex-col justify-center items-start">
                                {tickets &&
                                    tickets.map((item, index) => (
                                        <div key={index} className="flex items-center gap-1 cursor-pointer w-auto">
                                            <NextImage src={"/vector-ticket-black.svg"} width={14} height={12} />
                                            <a
                                                onClick={() => openPDFPopup(item.pdf_link)}
                                                className="capitalize border-b border-[#52B5A4] text-[16px]"
                                                style={{ cursor: "pointer" }}
                                            >
                                                {item.name}
                                            </a>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BaseTemplate>
    )
}

export default MyProfilePage
