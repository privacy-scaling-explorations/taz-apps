import Link from "next/link"

import BlueCircle from "../svgElements/BlueCircle"
import YellowCircle from "../svgElements/YellowCircle"
import ShadowBunny from "../svgElements/ShadowBunny"
import Ellipse from "../svgElements/Ellipse"
import SelectorArrow from "../ArrowNavigators/SelectorArrow"
import Footer from "../Footer"
import SignInModal from "../SigInModal"

function ExperiencesListComponent({
    clearIdentity,
    urlIdentity,
    initiateSignInModal,
    signInModal,
    closeSignInModal,
    userLoggedIn,
    userSignOut,
    checkSession
}) {
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    console.log("sign in modal", initiateSignInModal, signInModal, closeSignInModal)

    return (
        // <div>
        <div className="grid">
            <div className="fixed top-[15%] left-[-15%]">
                <BlueCircle />
            </div>
            <div className="fixed top-[35%] right-[-10%]">
                <YellowCircle />
            </div>
            <div className="fixed top-[38%] right-[2%]">
                <ShadowBunny />
            </div>
            <div className="fixed top-[75%] left-[-5%]">
                <Ellipse color="#BD5141" />
            </div>
            <SignInModal isOpen={signInModal} closeModal={closeSignInModal} checkSession={checkSession} />
            <div className="z-10 col-start-1 row-start-1 text-brand-brown">
                <div class="flex justify-between justify-center items-center">
                    <div className="mx-6 my-8">
                        <div>
                            <h1 className="relative inline-block bg-black ml-3 mb-12 px-1 text-xl text-brand-beige2">
                                TAZ
                            </h1>
                        </div>
                        <div>
                            <h2 className="relative inline-block bg-black ml-3 mb-2 px-1 text-4xl text-brand-beige2">
                                BE ANONYMOUS
                            </h2>
                        </div>
                        <div>
                            <h2 className="relative inline-block bg-black ml-3 mb-12 px-1 text-4xl text-brand-beige2">
                                {" "}
                                BE YOURSELF
                            </h2>
                        </div>
                    </div>
                    <button
                        className="h-15  bg-brand-yellow text-brand-body text-black px-10 py-6 rounded-full mx-6"
                        onClick={initiateSignInModal}
                    >
                        Connect
                    </button>
                </div>

                {/* <div className="relative flex flex-col items-center overflow-hidden mx-6 my-8 rounded-md border-2 border-brand-blue shadow-xl bg-white mb-8">
                    <div className="flex w-full justify-between border-b-2 border-brand-blue bg-brand-orange p-3">
                        <div>😎</div>
                        <div className="text-brand-beige text-15px">IMPORTANT: Save your ID</div>
                        <div></div>
                    </div>
                    <Link href="/identity">
                        <div className="flex w-full flex-row items-center py-3 px-4 cursor-pointer">
                            <div className="w-[90%]">
                                <p className="py-2 text-brand-h3 font-bold">Your Semaphore ID</p>
                                <p className="text-brand-info opacity-[70%]">
                                    Take a screenshot of your ID so that you can upload it when connecting to apps
                                </p>
                            </div>
                            <SelectorArrow />
                        </div>
                    </Link>
                </div> */}

                {!userLoggedIn ? (
                    <div className="relative flex flex-col items-center overflow-hidden mx-6 my-8 rounded-md border-2 border-brand-blue shadow-xl bg-white mb-8">
                        <div className="flex w-full justify-between border-b-2 border-brand-blue bg-brand-beige2 p-3">
                            <div>✌️</div>
                            <div className="text-brand-blue text-15px">Checkout the events at Zuzalu</div>
                            <div></div>
                        </div>
                        <Link href="events">
                            <div className="flex w-full flex-row items-center border-b-2 border-brand-blue py-3 px-4 cursor-pointer">
                                <div className="w-[90%]">
                                    <p className="py-2 text-brand-h3 font-bold">Events</p>
                                    <p className="text-brand-info opacity-[70%]">Check out events</p>
                                </div>
                                <SelectorArrow />
                            </div>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="relative flex flex-col items-center overflow-hidden mx-6 my-8 rounded-md border-2 border-brand-blue shadow-xl bg-white mb-8">
                            <div className="flex w-full justify-between border-b-2 border-brand-blue bg-brand-beige2 p-3">
                                <div className="text-brand-blue text-15px">Check your Profile</div>
                            </div>
                            {/* <div
                  className="flex w-full flex-row items-center border-b-2 border-brand-blue py-3 px-4 cursor-pointer hover:bg-gray-200"
                  onClick={createSemaphoreID}
              >
                  <div className="w-[90%]">
                      <p className="py-2 text-brand-h3 font-bold">Create My ID</p>
                      <p className="text-brand-info opacity-[70%]">Create your temporary semaphore id</p>
                  </div>
                  <SelectorArrow />
              </div> */}
                            <Link href="myprofile">
                                <div className="flex w-full flex-row items-center border-b-2 border-brand-blue py-3 px-4 cursor-pointer hover:bg-gray-200">
                                    <div className="w-[90%]">
                                        <p className="py-2 text-brand-h3 font-bold">My Profile</p>
                                        <p className="text-brand-info opacity-[70%]">Check out your profile</p>
                                    </div>
                                    <SelectorArrow />
                                </div>
                            </Link>
                        </div>
                        <div className="relative flex flex-col items-center overflow-hidden mx-6 my-8 rounded-md border-2 border-brand-blue shadow-xl bg-white mb-8">
                            <div className="flex w-full justify-between border-b-2 border-brand-blue bg-brand-beige2 p-3">
                                <div>✌️</div>
                                <div className="text-brand-blue text-15px">Checkout the events at Zuzalu</div>
                                <div></div>
                            </div>
                            <Link href="events">
                                <div className="flex w-full flex-row items-center border-b-2 border-brand-blue py-3 px-4 cursor-pointer">
                                    <div className="w-[90%]">
                                        <p className="py-2 text-brand-h3 font-bold">Events</p>
                                        <p className="text-brand-info opacity-[70%]">Check out events</p>
                                    </div>
                                    <SelectorArrow />
                                </div>
                            </Link>
                        </div>
                        <div className=" relative flex flex-col items-center overflow-hidden mx-6 my-8 rounded-md border-2 border-brand-blue shadow-xl bg-white mb-16">
                            <div className="flex w-full justify-between border-b-2 border-brand-blue bg-brand-beige2 p-3">
                                <div>🌍</div>
                                <div className="text-15px text-brand-blue">Take your ID with you </div>
                                <div></div>
                            </div>
                            <Link href="myevents">
                                <div className="flex w-full flex-row items-center border-b-2 border-brand-blue py-3 px-4 cursor-pointer">
                                    <div className="w-[90%]">
                                        <p className="py-2 text-brand-h3 font-bold">My Events</p>
                                        <p className="text-brand-info opacity-[70%]">
                                            Check out past/on going/favorite events
                                        </p>
                                    </div>
                                    <SelectorArrow />
                                </div>
                            </Link>
                        </div>
                    </>
                )}

                <div className="relative flex items-left flex-col bg-black text-brand-yellow pt-8 mt-12">
                    <div className="py-10 px-14 flex items-end justify-between bg-black">
                        <div className="transform -ml-6 text-xl tracking-widest text-brand-beige">
                            <h1>TEMP_RARY</h1>
                            <h1 className="bg-brand-beige px-1 text-brand-black">AN_NYMOUS</h1>
                            <h1>Z_NE</h1>
                        </div>
                    </div>

                    {/* <a
                        href="https://pse-team.notion.site/About-the-TAZ-app-1ae2793046414468b56472f43725961e"
                        target="_blank"
                        className="pl-9 pb-10 underline"
                        rel="noreferrer"
                    >
                        About this app
                    </a>
                    <a
                        href="http://semaphore.appliedzkp.org/"
                        target="_blank"
                        className="pl-9 pb-10 underline"
                        rel="noreferrer"
                    >
                        About Semaphore
                    </a>
                    <a
                        href="http://esp.ethereum.foundation/semaphore-grants"
                        target="_blank"
                        className="pl-9 pb-10 underline"
                        rel="noreferrer"
                    >
                        Semaphore Grants Round
                    </a> */}
                    <a href="https://appliedzkp.org/" target="_blank" className="pl-9 pb-12 underline" rel="noreferrer">
                        Privacy & Scaling Explorations
                    </a>
                    <button
                        className="w-[300px] ml-9 mb-4 bg-brand-yellow text-brand-body text-black px-3 py-3 rounded-full"
                        onClick={userSignOut}
                    >
                        Disconnect ID
                    </button>
                    <p className="pl-9 ml-12 mb-5 text-brand-info">
                        <span>
                            <button onClick={goToTop} className="text-brand-info underline cursor-pointer">
                                Save ID
                            </button>
                        </span>{" "}
                        before disconnecting!
                    </p>

                    <div className="flex w-full justify-center bg-black pb-3 pt-9">
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
        // </div>
    )
}

export default ExperiencesListComponent
