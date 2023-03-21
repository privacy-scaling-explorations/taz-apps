import { usePassportModalContext } from "../../context/PassportModalContext"
import PassportModal from "../PassportModal"
import { getUserOnID } from "../../hooks/getUserOnID"

const MainSection = () => {
    const { openPassportModal, setOpenPassportModal } = usePassportModalContext()
    const  userObj  = getUserOnID()
    console.log("user object", userObj)
    return (
        <div className="flex min-h-[90vh] h-full w-full relative">
            <PassportModal openPassportModal={openPassportModal} setOpenPassportModal={setOpenPassportModal} />
            <div className="z-[10] bg-gradient-linear absolute top-0 h-full w-full bg-opacity-80 transform scale-x-[-1]" />
            <div className="bg-mountains absolute top-0 w-full h-full bg-no-repeat bg-cover bg-center" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[660px] z-[11] bg-zulaluVector bg-contain bg-no-repeat" />
            <div className="z-[11] flex w-full px-[72px] py-[180px]">
                <div className="flex w-[700px] flex-col gap-5">
                    <h1 className="text-[18px] md:text-[24px] text-blue md:mb-5 md:text-gray-900 ">
                        March 25 to May 25, 2023
                    </h1>
                    <h1 className="text-[30px] md:text-[60px] md:mb-10">
                        A first-of-its-kind pop-up city community in Montenegro
                    </h1>
                    <h1 className="text-[18px] md:text-[24px] md:w-[80%]">
                        Join 200 core residents for healthy living, co-working and learning through co-created events on
                        synthetic biology, ZK, public goods, longevity, and network states.
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default MainSection
