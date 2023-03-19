import { GetServerSideProps } from "next"

type Props = {
    session: any
}

const SessionPage = ({ session }: Props) => {
    return (
        <div className="flex flex-col items-center bg-[#EEEEF0] h-[100vh] px-[24px] py-[24px] gap-[16px]">
            <div className="flex flex-row justify-start bg-white w-full px-[32px]">
                <div className="flex fex-row items-start p-[16px] gap-[24px]">
                    <p>Program</p>
                    <p>/</p>
                    <p>Event name</p>
                    <p>/</p>
                    <p>{session.name}</p>
                </div>
            </div>
            <div className="w-full flex flex-row items-start gap-[8px]">
                <div className="flex flex-col items-start pt-[32px] px-[32px] pb-[40px] bg-white">
                    <div className="flex flex-row items-end p-[16px] gap-[24px]">
                        <p className="text-xl">{session.name}</p>
                    </div>
                    <div className="flex flex-row items-center px-[16px] gap-[24px]">
                        <div className="flex flex-row items-start justify-end gap-[32px]">
                            <div>{session.startDate}</div>
                            <div>
                                {session.startTime.slice(0, -3)}-{session.endTime.slice(0, -3)}
                            </div>
                            <div>{session.location}</div>
                        </div>
                    </div>
                    <div className="flex flex-row py-[32px] px-[16px] gap-[24px]">
                        <div>{session.info}</div>
                        <div className="flex flex-col gap-[8px]">
                            {session.organizers.map((item) => {
                                return (
                                    <div className="rounded-[4px] bg-[#E4EAEA]">
                                        <p className="py-[4px] px-[8px]">Organizer: {item}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col py-[56px] pr-[48px] pl-[16px] gap-[24px]">
                    <div className="flex flex-col gap-[8px]">
                        <h4 className="text-xl">Tags</h4>
                        <div>
                            {session.tags.map((tag) => {
                                return (
                                    <div className="bg-[#F8FFFE] rounded-[37px] py-[4px] px-[16px] flex flex-row items-center justify-center">
                                        <p>{tag}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <h4 className="text-xl">About</h4>
                        <p>Format: Live</p>
                        <p>Track: ZK</p>
                        <p>Type: Workshop</p>
                        <p>Level: Intermediate</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SessionPage

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
    try {
        const url = process.env.URL_TO_FETCH

        const response = await fetch(`${url}/api/fetchSession/${query.sessionId}`)
        const session = await response.json()

        console.log(session)

        return {
            props: { session }
        }
    } catch (error) {
        res.statusCode = 404
        console.log(error)
        return {
            props: {}
        }
    }
}
