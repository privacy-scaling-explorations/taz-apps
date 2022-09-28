import ProcessingModalView from './View'

const ProcessingModal = ({ isOpen, closeModal, steps, fact }) => {
  return <ProcessingModalView isOpen={isOpen} closeModal={closeModal} steps={steps} fact={fact} />
}

export default ProcessingModal
