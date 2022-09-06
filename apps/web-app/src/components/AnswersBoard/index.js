import Button from '../Button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { TAZMESSAGE_SUBGRAPH } from '../../config/goerli.json'

const AnswerBoard = (props) => {
  const { messageId } = props

  const [answers, setAnswers] = useState([])
  const [question, setQuestion] = useState([])

  const fetchAnswers = async (messageId) => {
    // Construct query for subgraph
    const postData = {
      query: `
      {
        parentMessageAddeds: messageAddeds(
          orderBy: messageId
          first: 1
          where: {messageId: "${messageId}"}
          orderDirection: desc
        ) {
          id
          messageContent
          messageId
        }
        messageAddeds(
          orderBy: timestamp
          where: {parentMessageId: "${messageId}"}
          orderDirection: desc
        ) {
          id
          messageContent
          messageId
          parentMessageId
        }
      }
      `,
    }
    // Fetch data
    try {
      const result = await axios.post(TAZMESSAGE_SUBGRAPH, postData)
      setQuestion(result.data.data.parentMessageAddeds[0])
      setAnswers(result.data.data.messageAddeds)
    } catch (err) {
      console.log('Error fetching subgraph data: ', err)
    }
  }

  useEffect(() => {
    const doAsync = async () => {
      await fetchAnswers(messageId)
    }
    doAsync()
  }, [])

  return (
    <div className="px-6 py-8 font-sans">
      <svg
        className="absolute -left-2 top-[230px]"
        width="69"
        height="100"
        viewBox="0 0 69 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="18.8812" cy="50" rx="49.8812" ry="50" fill="#BD5141" />
      </svg>
      <svg
        className="absolute right-[0px] top-[520px]"
        width="121"
        height="160"
        viewBox="0 0 121 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="80.6202" cy="80" rx="80.6202" ry="80" fill="#EFAD5F" />
        <path
          transform="translate(-9, 0)"
          d="M5.86415 0.843262L7.73372 2.72888L3.99457 6.50008L7.73372 10.2714L5.86415 12.157L0.255371 6.50008L5.86415 0.843262Z"
          fill="#475F6F"
        />
      </svg>

      <div className="mb-[34px] flex ml-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_114_381)">
            <path
              d="M7.828 10.9999H20V12.9999H7.828L13.192 18.3639L11.778 19.7779L4 11.9999L11.778 4.22192L13.192 5.63592L7.828 10.9999Z"
              fill="#BD5141"
            />
          </g>
          <defs>
            <clipPath id="clip0_114_381">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <Link href="/">
          <span className="ml-2 text-brand-orange text-sm font-bold cursor-pointer">
            Back to apps
          </span>
        </Link>
      </div>

      <div className="index-[10] relative divide-y overflow-y-auto rounded-md border-2 border-gray-500 bg-white drop-shadow-lg">
        <div className="flex items-center justify-between py-4 px-8 bg-brand-beige">
          <Link href="/questions-page">
            <svg
              className="cursor-pointer scale-[100%]"
              width="30"
              height="31"
              viewBox="0 0 30 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.8643 0.833496C22.8956 0.833496 29.4063 7.39999 29.4063 15.5002C29.4063 23.6003 22.8956 30.1668 14.8643 30.1668C6.83295 30.1668 0.322266 23.6003 0.322266 15.5002C0.322266 7.39999 6.83295 0.833496 14.8643 0.833496ZM2.96627 15.5002C2.96627 8.87275 8.29319 3.50016 14.8643 3.50016C21.4354 3.50016 26.7623 8.87275 26.7623 15.5002C26.7623 22.1276 21.4354 27.5002 14.8643 27.5002C8.29319 27.5002 2.96627 22.1276 2.96627 15.5002Z"
                fill="#475F6F"
              />
              <path
                transform="translate(9, 9)"
                d="M5.86415 0.843262L7.73372 2.72888L3.99457 6.50008L7.73372 10.2714L5.86415 12.157L0.255371 6.50008L5.86415 0.843262Z"
                fill="#475F6F"
              />
            </svg>
          </Link>
          <Link href={'../answer-question-page/' + question?.messageId}>
            <div>
              <Button text="Answer this question" />
            </div>
          </Link>
        </div>

        <div className="flex w-full flex-row border-b-4 border-brand-gray p-3 text-brand-gray leading-5">
          {question.messageContent}
        </div>

        <div className="ml-6 mb-8 border-l-2">
          {answers.map((answer) => (
            <p className="ml-4 text-xs my-4 text-brand-gray" key={answer.id}>
              {answer.messageContent}
            </p>
          ))}
        </div>
      </div>
      <div className="flex justify-center m-6 text-brand-2xs text-brand-gray">
        &#8220;who am I?&#8221;&nbsp;&ndash;&nbsp;
        <a href="" className="underline">
          @PrivacyScaling
        </a>
      </div>
    </div>
  )
}

export default AnswerBoard
