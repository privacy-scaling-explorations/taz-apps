import QuestionModalView from "./View"

// TODO: Change to Event Modal and Add some Event Data
const QuestionModal = ({ isOpen, closeModal, handleQuestionChange, handleSubmit }) => (
    <QuestionModalView
        isOpen={isOpen}
        closeModal={closeModal}
        handleQuestionChange={handleQuestionChange}
        handleSubmit={handleSubmit}
    />
)

export default QuestionModal
