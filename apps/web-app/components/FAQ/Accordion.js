import React, { useState } from 'react'
import AccordionUI from './AccordionUI'

const Accordion = () => {
  const [Index, setIndex] = useState(1)

  const data = [
    {
      id: 1,
      question: 'What is a Semaphore ID?',
      answer:
        'Semaphore IDs contain 3 parts: Trapdoor and Nullifier to avoid fraud and Commitment to interact publicly.'
    },
    {
      id: 2,
      question: 'How am I anonymous?',
      answer:
        'Semaphore IDs contain 3 parts: Trapdoor and Nullifier to avoid fraud and Commitment to interact publicly.'
    },
    {
      id: 3,
      question: 'Why does it take a long time to post?',
      answer:
        'Semaphore IDs contain 3 parts: Trapdoor and Nullifier to avoid fraud and Commitment to interact publicly.'
    },
    {
      id: 4,
      question: 'Why are you using a centralized backend?',
      answer:
        'Semaphore IDs contain 3 parts: Trapdoor and Nullifier to avoid fraud and Commitment to interact publicly.'
    }
  ]

  return (
    <div className="flex w-full flex-col justify-center items-center h-auto">
      {data.map((data) => {
        return (
          <div className="flex w-full flex-col border-t-2 border-brand-blue">
            <AccordionUI
              title={data.question}
              Id={data.id}
              children={data.answer}
              Index={Index}
              setIndex={setIndex}
            ></AccordionUI>
          </div>
        )
      })}
    </div>
  )
}
export default Accordion
