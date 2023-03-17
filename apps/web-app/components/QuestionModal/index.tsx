import QuestionModalView from "./View"

// TODO: Change to Event Modal and Add some Event Data
const QuestionModal = ({
    isOpen,
    closeModal,
    handleSubmit,
    newEvent,
    setNewEvent,
    addTag,
    removeTag,
    addOrganizer,
    removeOrganizer,
    isUpdateEvent
}) => (
    <QuestionModalView
        isOpen={isOpen}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        addTag={addTag}
        removeTag={removeTag}
        addOrganizer={addOrganizer}
        removeOrganizer={removeOrganizer}
        isUpdateEvent={isUpdateEvent}
    />
)

export default QuestionModal
