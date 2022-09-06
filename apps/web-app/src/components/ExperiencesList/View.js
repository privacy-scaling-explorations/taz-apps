import Link from 'next/link'

const ExperiencesListComponent = ({ clearIdentity }) => {
  return (
    <div className="px-6 py-8 font-sans">
      <svg
        className="absolute -left-2 top-[330px] -z-1"
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

      <div>
        <p className="py-5 font-bold text-[20px]">
          Having anonymity in your apps might be easier than you think
        </p>
        <p className="mb-12 text-brand-brown2 text-[16px]">
          Bellow are some example that just do that
        </p>
      </div>
      <div className=" relative flex flex-col items-center overflow-hidden rounded-md border-2 border-gray-700 shadow-xl bg-white">
        <div className="flex w-full justify-between border-b-2 border-brand-gray bg-brand-beige2 p-3">
          <div>X</div>
          <div>TAZ App</div>
          <div></div>
        </div>

        <div className="flex w-full flex-row items-center border-b-2 border-gray-700 py-3 px-2">
          <div className="w-[90%]">
            <p className="py-2 font-bold">Art Wall</p>
            <p className="text-brand-brown opacity-[70%]">
              Protect yourself from prying eyes
            </p>
          </div>
          <p className="-mr-3">X</p>
        </div>
        <div className="flex w-full flex-row items-center border-b-2 border-gray-700 py-3 px-2">
          <div className="w-[90%]">
            <p className="py-2 font-bold">The Reputation</p>
            <p className="text-brand-brown opacity-[70%]">
              No reputation wihtout representation
            </p>
          </div>
          <p className="-mr-3">X</p>
        </div>
        <div className="flex w-full flex-row items-center border-b-2 border-gray-700 py-3 px-2">
          <div className="w-[90%]">
            <p className="py-2 font-bold">Zkitter</p>
            <p className="text-brand-brown opacity-[70%]">
              Protect yourself from prying eye
            </p>
          </div>
          <p className="-mr-3">X</p>
        </div>

        <Link href="questions-page">
          <div className="flex w-full flex-row items-center border-b-2 border-gray-700 py-3 px-2 cursor-pointer">
            <div className="w-[90%]">
              <p className="py-2 font-bold">Q&A</p>
              <p className="text-brand-brown opacity-[70%]">Anonymous Q&A</p>
            </div>
            <p className="-mr-3">X</p>
          </div>
        </Link>
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

export default ExperiencesListComponent
