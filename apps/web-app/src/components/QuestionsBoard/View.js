import Button from '../Button'
import Link from 'next/link'

const QuestionsBoardComponent = ({ questions, clearIdentity }) => {
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
          <p className="text-2xl text-brand-gray">Q&amp;A</p>
          <Link href="/ask-question-page">
            <div>
              <Button text="Ask a question" />
            </div>
          </Link>
        </div>

        {questions.map((question) => (
          <Link
            href={'/answers-board-page/' + question.messageId}
            key={question.id}
          >
            <div className="flex w-full flex-row items-center border-b-[1px] border-brand-gray p-3 cursor-pointer">
              <p className="text-brand-gray leading-5 w-[100%]">
                {question.messageContent}
              </p>
              <svg
                className="w-7 ml-10"
                width="7"
                height="11"
                viewBox="0 0 7 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.53446 5.50005L0.853516 1.78755L1.905 0.727051L6.63744 5.50005L1.905 10.2731L0.853516 9.21255L4.53446 5.50005Z"
                  fill="black"
                  fillOpacity="0.4"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-center  flex-col m-6 text-brand-2xs text-brand-gray">
        <button className="mb-3 text-lg" onClick={clearIdentity}>
          Logout
        </button>
        {/* &#8220;who am I?&#8221;&nbsp;&ndash;&nbsp; */}
        <a href="" className="underline mt-3">
          @PrivacyScaling
        </a>
      </div>
    </div>
  )
}

export default QuestionsBoardComponent
