import QuestionModalView from './View'

const QuestionModal = ({ isOpen, closeModal, handleQuestionChange, handleSubmit }) => (
  <QuestionModalView
    isOpen={isOpen}
    closeModal={closeModal}
    handleQuestionChange={handleQuestionChange}
    handleSubmit={handleSubmit}
  />
)

export default QuestionModal
