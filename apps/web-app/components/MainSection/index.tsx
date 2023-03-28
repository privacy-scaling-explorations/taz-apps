const MainSection = () => (
    <div className="flex flex-col bg-[#EEEEF0]">
        <div className="overflow-hidden w-full h-full flex justify-between lg:flex-row flex-col py-5  px-[28px] md:px-[48px] bg-white rounded-[16px] gap-[100px] lg:gap-10">
            <div className="flex md:w-3/6 w-full flex-col gap-5">
                <h1 className="font-semibold text-[32px] md:text-[52px] md:mb-10">
                    Zuzalu is a first-of-its-kind pop-up city community in{" "}
                    <span className="relative z-10 inline-block px-2">
                        <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-green-200"></span>
                        <span className="relative z-[10]">Montenegro.</span>
                    </span>{" "}
                </h1>
                <h1 className="font-normal text-[16px] md:text-[18px] w-[auto] md:w-[600px] leading-[25px] md:leading-[25px]">
                    Join 200 core residents brought together by a shared desire to learn, create, live longer and
                    healthier lives, and build self-sustaining communities.
                </h1>
            </div>
            <div className="p-5 relative w-full lg:w-3/6 h-[500px] w-full flex justify-center items-center">
                <div className="absolute z-[10]  bottom-0 border border-black w-[550px] h-[300px] bg-eventbg2 filter blur-[150px] z-[1]" />
                <div className="absolute z-[9]  border border-black w-[500px] h-[379px] bg-eventbg1 filter blur-[150px] z-[1]" />

                <div className="top-0 absolute z-[11] w-full h-full bg-contain bg-center bg-no-repeat bg-[url('/vector.png')]" />
                <div className="top-0 absolute z-[12] w-full h-full bg-contain bg-center bg-no-repeat bg-[url('/49.png')]" />
            </div>
        </div>
    </div>
)

export default MainSection
