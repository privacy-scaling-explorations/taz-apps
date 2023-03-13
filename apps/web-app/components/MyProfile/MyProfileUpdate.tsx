type Props = {
    user: {
        code: string
        created_at: Date
        email: string
        id: number
        semaphoreId: string
        userName: string
    }
    setUpdateUser: (b: boolean) => void
    form: {
        email: string
        semaphoreId: string
        userName: string
    }

    setForm: (prop: { email: string; semaphoreId: string; userName: string }) => void
    handleUpdateUser: () => void
}

const MyProfileUpdate = ({ setForm, setUpdateUser, form, handleUpdateUser }: Props) => (
    <div className="flex flex-col gap-5 w-full h-full md:w-[850px] justify-center items-center">
        <div>
            <h1 className="underline">UPDATE YOUR PROFILE</h1>
        </div>
        <div className="flex flex-col gap-4 items-start">
            <h1 className="text-md">NAME:</h1>
            <input
                className="border border-[#ccc] p-2"
                value={form.userName}
                onChange={(e) => setForm({ ...form, userName: e.target.value })}
            />
        </div>
        <div className="flex flex-col gap-4 items-start">
            <h1 className="text-md">EMAIL:</h1>
            <input
                className="border border-[#ccc] p-2"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
        </div>
        <div className="flex flex-col gap-4 items-start">
            <h1 className="text-md">SEMAPHORE ID:</h1>
            <input
                className="border border-[#ccc] p-2"
                value={form.semaphoreId}
                onChange={(e) => setForm({ ...form, semaphoreId: e.target.value })}
            />
        </div>
        <div className="flex gap-4 mt-10">
            <button
                onClick={handleUpdateUser}
                className="w-[100px] bg-brand-yellow ring-2 rounded-full ring-brand-black py-2 px-4 text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
            >
                SAVE
            </button>
            <button
                onClick={() => setUpdateUser(false)}
                className="w-[100px] bg-brand-yellow ring-2 rounded-full ring-brand-black py-2 px-4 text-brand-button font-medium text-brand-black hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-opacity-25"
            >
                CANCEL
            </button>
        </div>
    </div>
)

export default MyProfileUpdate
