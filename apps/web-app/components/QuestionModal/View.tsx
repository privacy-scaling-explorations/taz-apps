import "react-datepicker/dist/react-datepicker.css"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useRef, useState, useEffect } from "react"
import DatePicker from "react-datepicker"
import axios from "axios"
import { UserDTO } from "../../types"

export default function QuestionModalView({
    isOpen,
    closeModal,
    handleSubmit,
    newEvent,
    setNewEvent,
    addTag,
    removeTag,
    addOrganizer,
    removeOrganizer,
    isUpdateEvent = false
}) {
    const questionTextRef = useRef(null)

    const [tag, setTag] = useState("")
    const [organizer, setOrganizer] = useState("")
    const [rerender, setRerender] = useState(true)

    const [suggestions, setSuggestions] = useState<UserDTO[]>([])
    const [display, setDisplay] = useState(false)
    const wraperRef = useRef(null)

    const handleAddTag = (tag) => {
        addTag(tag)
        setTag("")
    }

    const handleRemoveTag = (tag) => {
        removeTag(tag)
        setRerender(!rerender)
    }

    const handleAddOrganizer = async (organizer) => {
        addOrganizer(organizer)
        setOrganizer("")
        setDisplay(false)
    }

    const handleRemoveOrganizer = (idx: number) => {
        removeOrganizer(idx)
        setRerender(!rerender)
    }

    const handleClickOutside = (event) => {
        const { current: wrap } = wraperRef
        if (wrap && !wrap.contains(event.target)) {
            setDisplay(false)
        }
    }

    const fetchUsers = async () => {
        await axios
            .get("/api/fetchUsers")
            .then((res) => {
                setSuggestions(res.data)
            })
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        fetchUsers()
    }, [])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const checkIfAnyOtherSuggestion =
        suggestions
            .filter((item) => !newEvent.organizers.includes(item.userName))
            .filter(({ userName }) => userName.toLowerCase().indexOf(organizer.toLowerCase()) > -1).length !== 0

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" initialFocus={questionTextRef} className="relative z-40 " onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0  h-full">
                    <div className="flex h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-10/12 h-[100%] max-w-md transform overflow-scroll rounded-lg border-brand-blue border-2 bg-white text-left align-middle shadow-xl transition-all">
                                <div className="p-4 mb-1 bg-brand-beige border-b-2 border-brand-blue">
                                    <button
                                        type="button"
                                        className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-beige2"
                                        onClick={closeModal}
                                    >
                                        <svg
                                            className="mr-2"
                                            width="18"
                                            height="17"
                                            viewBox="0 0 18 17"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                transform="translate(5,5)"
                                                d="M7.25467 1.49196C7.55767 1.20954 7.57439 0.73496 7.29194 0.431952C7.00957 0.128937 6.53497 0.112242 6.23197 0.394655L4.03739 2.44007L1.99196 0.24548C1.70954 -0.0575276 1.23496 -0.0742224 0.931952 0.20819C0.628937 0.490603 0.612242 0.96518 0.894655 1.2682L2.94007 3.46277L0.74548 5.50824C0.442472 5.79062 0.425778 6.26522 0.70819 6.56822C0.990603 6.87122 1.46518 6.88794 1.7682 6.60549L3.96277 4.56009L6.00824 6.75467C6.29062 7.05767 6.76522 7.07439 7.06822 6.79194C7.37122 6.50957 7.38794 6.03497 7.10549 5.73197L5.06009 3.53739L7.25467 1.49196Z"
                                                fill="#435C6C"
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M0.75 8.5C0.75 3.94365 4.44365 0.25 9 0.25C13.5563 0.25 17.25 3.94365 17.25 8.5C17.25 13.0563 13.5563 16.75 9 16.75C4.44365 16.75 0.75 13.0563 0.75 8.5ZM9 15.25C5.27208 15.25 2.25 12.228 2.25 8.5C2.25 4.77208 5.27208 1.75 9 1.75C12.728 1.75 15.75 4.77208 15.75 8.5C15.75 12.228 12.728 15.25 9 15.25Z"
                                                fill="#435C6C"
                                            />
                                        </svg>
                                        cancel
                                    </button>
                                </div>
                                <div className="p-4">
                                    <Dialog.Title as="h3" className="text-brand-brown mb-8">
                                        {isUpdateEvent ? "Edit Event" : "Create New Event"}
                                    </Dialog.Title>
                                    <div className="flex flex-col">
                                        <div className="flex flex-col gap-1 my-1 w-full">
                                            <label htmlFor="name">Event Name</label>
                                            <input
                                                className="border border-2 p-1"
                                                type="text"
                                                id="name"
                                                placeholder="event name"
                                                value={newEvent.name}
                                                onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex flex-col md:flex-row justify-start gap-4 my-2">
                                            <div className="flex flex-col w-full">
                                                <label>Event Start</label>
                                                <DatePicker
                                                    className="border border-2 p-1 w-full"
                                                    selected={newEvent.startDate}
                                                    onChange={(date) => setNewEvent({ ...newEvent, startDate: date })}
                                                />
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <label htmlFor="startTime">Time</label>
                                                <input
                                                    className="border border-2 p-1"
                                                    type="time"
                                                    id="startTime"
                                                    name="startTime"
                                                    value={newEvent.startTime}
                                                    onChange={(e) =>
                                                        setNewEvent({ ...newEvent, startTime: e.target.value })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col md:flex-row justify-start gap-4 my-2">
                                            <div className="flex flex-col w-full">
                                                <label>Event End</label>
                                                <DatePicker
                                                    className="border border-2 p-1 w-full"
                                                    selected={newEvent.endDate}
                                                    onChange={(date) => setNewEvent({ ...newEvent, endDate: date })}
                                                />
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <label htmlFor="endTime">Time</label>
                                                <input
                                                    className="border border-2 p-1"
                                                    type="time"
                                                    id="endTime"
                                                    name="endTime"
                                                    value={newEvent.endTime}
                                                    onChange={(e) =>
                                                        setNewEvent({ ...newEvent, endTime: e.target.value })
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1 my-2">
                                            <label htmlFor="tags">Location</label>
                                            <input
                                                className="border border-2 p-1"
                                                type="text"
                                                value={newEvent.location}
                                                id="location"
                                                placeholder="location"
                                                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1 my-2 w-full">
                                            <label htmlFor="tags">Organizers</label>
                                            <div className="flex flex-col relative" ref={wraperRef}>
                                                <div className="flex flex-row gap-4">
                                                    <input
                                                        id="organizers"
                                                        type="text"
                                                        className="border border-2 p-1 w-full"
                                                        placeholder="add organizer"
                                                        value={organizer}
                                                        onChange={(e) => setOrganizer(e.target.value)}
                                                        onClick={() => setDisplay(true)}
                                                    />
                                                </div>
                                                {display && (
                                                    <div className="border border-t-transparent bg-white flex flex-col absolute top-[35px] w-full z-10">
                                                        {checkIfAnyOtherSuggestion ? (
                                                            suggestions
                                                                .filter(
                                                                    (item) =>
                                                                        !newEvent.organizers.includes(item.userName)
                                                                )
                                                                .filter(
                                                                    ({ userName }) =>
                                                                        userName
                                                                            .toLowerCase()
                                                                            .indexOf(organizer.toLowerCase()) > -1
                                                                )
                                                                .map((user, index) => (
                                                                    <div
                                                                        key={index}
                                                                        onClick={() =>
                                                                            handleAddOrganizer(user.userName)
                                                                        }
                                                                        className="flex h-[50px] items-center px-2 uppercase hover:bg-black hover:text-white cursor-pointer transition duration-300 ease-in-out"
                                                                    >
                                                                        <span>{user.userName}</span>
                                                                    </div>
                                                                ))
                                                        ) : (
                                                            <div className="flex h-[50px] items-center px-2 uppercase hover:bg-black hover:text-white cursor-pointer transition duration-300 ease-in-out">
                                                                <span>No user found</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            <ul className="flex flex-row items-start gap-2">
                                                {newEvent.organizers.map((item, index) => (
                                                    <li
                                                        key={index}
                                                        className="relative mx-1 bg-gray-200 p-1 rounded text-sm"
                                                    >
                                                        {item}
                                                        <button
                                                            className="absolute top-0"
                                                            onClick={() => handleRemoveOrganizer(index)}
                                                        >
                                                            x
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="flex flex-col gap-1 my-2 w-full">
                                            <label htmlFor="tags">Tags</label>

                                            <div className="flex flex-row gap-4">
                                                <input
                                                    id="tags"
                                                    type="text"
                                                    className="border border-2 p-1 w-full"
                                                    placeholder="add tag"
                                                    value={tag}
                                                    onChange={(e) => setTag(e.target.value)}
                                                />

                                                <button
                                                    className="bg-black text-white rounded border border-2 py-1 px-2"
                                                    onClick={() => handleAddTag(tag)}
                                                >
                                                    Add
                                                </button>
                                            </div>
                                            <ul className="flex flex-row items-start">
                                                {newEvent.tags.map((tag, index) => (
                                                    <li key={index} className="mx-1 bg-gray-200 p-1 rounded text-sm">
                                                        {tag} <button onClick={() => handleRemoveTag(tag)}>X</button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="my-2">
                                            <label htmlFor="info">Additional Information</label>
                                            <textarea
                                                className="border border-2 p-1 w-full"
                                                placeholder="Additional info"
                                                name="info"
                                                id="info"
                                                rows={5}
                                                value={newEvent.info}
                                                onChange={(e) => setNewEvent({ ...newEvent, info: e.target.value })}
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-full border border-transparent bg-brand-black px-12 py-1 text-sm font-medium text-brand-beige hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-beige focus-visible:ring-offset-2"
                                            onClick={handleSubmit}
                                        >
                                            {isUpdateEvent ? "Update Event" : "Create Event"}
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
