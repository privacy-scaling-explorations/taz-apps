type Props = {
    steps: number
}

const ModalSteps = ({ steps }: Props) => (
    <div className="flex flex-row items-center justify-center gap-5 w-full text-[12px] mb-10">
        <div
            className={`flex justify-center items-center w-[70px] h-[70px] border border-black rounded-full ${
                steps >= 1 ? "bg-green-200" : "white"
            }`}
        >
            <h1>STEP 1</h1>
        </div>
        <div
            className={`flex justify-center items-center w-[70px] h-[70px] border border-black rounded-full ${
                steps >= 2 ? "bg-green-200" : "white"
            }`}
        >
            <h1>STEP 2</h1>
        </div>
        <div
            className={`flex justify-center items-center w-[70px] h-[70px] border border-black rounded-full ${
                steps >= 3 ? "bg-green-200" : "white"
            }`}
        >
            <h1>STEP 3</h1>
        </div>
    </div>
)

export default ModalSteps
