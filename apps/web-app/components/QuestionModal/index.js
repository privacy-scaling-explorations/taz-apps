import QuestionModalView from "./View"

// TODO: Change to Event Modal and Add some Event Data
const QuestionModal = ({
    isOpen,
    closeModal,
    handleQuestionChange,
    handleSubmit,
    newEvent,
    setNewEvent,
    addTag,
    removeTag,
    addOrganizer,
    removeOrganizer
}) => (
    <QuestionModalView
        isOpen={isOpen}
        closeModal={closeModal}
        handleQuestionChange={handleQuestionChange}
        handleSubmit={handleSubmit}
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        addTag={addTag}
        removeTag={removeTag}
        addOrganizer={addOrganizer}
        removeOrganizer={removeOrganizer}
    />
)

export default QuestionModal
