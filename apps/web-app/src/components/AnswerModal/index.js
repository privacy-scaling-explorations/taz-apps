import AnswerModalView from './View'

const AnswerModal = ({ isOpen, closeModal, handleAnswerChange, handleSubmit }) => (
  
  <AnswerModalView
    isOpen={isOpen}
    closeModal={closeModal}
    handleAnswerChange={handleAnswerChange}
    handleSubmit={handleSubmit}
  />
)

export default AnswerModal
