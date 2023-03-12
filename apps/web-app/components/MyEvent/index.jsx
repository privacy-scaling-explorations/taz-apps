import Link from "next/link"
import BackTAZ from "../../components/ArrowNavigators/BackTAZ"

const MyEvents = () => (
    <div className="mx-6 my-8">
        <Link href="/experiences-page">
            <div className="flex max-w-[76px] max-h-[32px] bg-black mb-7 px-1 text-xl text-brand-beige2 cursor-pointer shadow-[2.0px_3.0px_3.0px_rgba(0,0,0,0.38)]">
                <BackTAZ />
                <h1>TAZ</h1>
            </div>
        </Link>
        <div>
            <h2 className="relative inline-block bg-black mb-12 text-4xl text-brand-beige2">YOUR EVENTS</h2>
        </div>
        <div className="flex flex-col gap-4 py-20">
            <div className="flex-grow text-brand-brown p-4 min-w-[200px] min-h-[100%] relative divide-y overflow-y-auto border-2 border-brand-blue rounded-md bg-white drop-shadow-lg">
                <h1>Past Events</h1>
                <div className="grid grid-cols-6 py-5 gap-5">
                    <div className="h-[150px] flex flex-col justify-between">
                        <div className="flex flex-col items-center justify-center w-full h-full gap-4 ring-2 ring-brand-black rounded-t-md">
                            <h1>ETH TOKYO</h1>
                            <h1>March 12th</h1>
                        </div>
                        <div>
                            <button className="w-full bg-brand-yellow ring-2 rounded-b-md ring-brand-black py-3 px-4 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25">
                                Go to event
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-grow text-brand-brown p-4 min-w-[200px] min-h-[100%] relative divide-y overflow-y-auto border-2 border-brand-blue rounded-md bg-white drop-shadow-lg">
                <h1>Attending Events</h1>
                <div className="grid grid-cols-6 py-5 gap-5 justify-center">
                    <div className="h-[150px] flex flex-col justify-between">
                        <div className="flex flex-col items-center justify-center w-full h-full gap-4 ring-2 ring-brand-black rounded-t-md">
                            <h1>ETH TOKYO</h1>
                            <h1>March 12th</h1>
                        </div>
                        <div>
                            <button className="w-full bg-brand-yellow ring-2 rounded-b-md ring-brand-black py-3 px-4 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25">
                                Go to event
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-grow text-brand-brown p-4 min-w-[200px] min-h-[100%] relative divide-y overflow-y-auto border-2 border-brand-blue rounded-md bg-white drop-shadow-lg">
                <h1>Favorites Events</h1>
                <div className="grid grid-cols-6 py-5 gap-5">
                    <div className="h-[150px] flex flex-col justify-between">
                        <div className="flex flex-col items-center justify-center w-full h-full gap-4 ring-2 ring-brand-black rounded-t-md">
                            <h1>ETH TOKYO</h1>
                            <h1>March 12th</h1>
                        </div>
                        <div>
                            <button className="w-full bg-brand-yellow ring-2 rounded-b-md ring-brand-black py-3 px-4 drop-shadow text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25">
                                Go to event
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default MyEvents
