type Props = {
    steps: number
}

const ModalSteps = ({ steps }: Props) => (
    <div className="flex justify-start gap-3 w-full my-10">
        <div
            className={`w-[10px] bg-zulalu-primary h-[10px] rounded-full ${
                steps >= 1 ? "bg-zulalu-primary" : "bg-[#D3DDDC]"
            }`}
        />
        <div
            className={`w-[10px] bg-zulalu-primary h-[10px] rounded-full ${
                steps >= 2 ? "bg-zulalu-primary" : "bg-[#D3DDDC]"
            }`}
        />
        <div
            className={`w-[10px] bg-zulalu-primary h-[10px] rounded-full ${
                steps >= 3 ? "bg-zulalu-primary" : "bg-[#D3DDDC]"
            }`}
        />
        <div
            className={`w-[10px] bg-zulalu-primary h-[10px] rounded-full ${
                steps >= 4 ? "bg-zulalu-primary" : "bg-[#D3DDDC]"
            }`}
        />
    </div>
)

export default ModalSteps
