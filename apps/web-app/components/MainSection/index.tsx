const MainSection = () => (
    <div className="flex min-h-[90vh] h-full w-full relative">
        <div className="z-[10] absolute top-0 bg-gradient-to-l from-brand-gradient1 to-brand-gradient2 h-full w-full bg-opacity-80" />
        <div className="bg-mountains absolute top-0 w-full h-full bg-no-repeat bg-cover bg-center" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[660px] z-[11] bg-zulaluVector bg-contain bg-no-repeat">
            {/* <NextImage src="/zulalu-vector.png" alt="zulaluVector" objectFit="contain" width="700px" height="700px" /> */}
        </div>
        <div className="z-[11] flex w-full px-[72px] py-[180px]">
            <div className="flex w-[700px] flex-col gap-5">
                <h1 className="text-[18px] text-brand-secondary">March 25 to May 25, 2023</h1>
                <h1 className="text-[40px]">A first-of-its-kind pop-up city community in Montenegro</h1>
                <h1 className="text-[21px]">
                    Join 200 core residents for healthy living, co-working and learning through co-created events on
                    synthetic biology, ZK, public goods, longevity, and network states.
                </h1>
            </div>
        </div>
    </div>
)

export default MainSection
