import Header from './Header'

// Page 3 will Generate Identity and Join Group
const SaveIdentityQr = () => {
  return (
    <div className="p-4 font-sans bg-brand-beige">
      <Header />
      <svg
        className="absolute -left-2 top-[370px]"
        width="69"
        height="100"
        viewBox="0 0 69 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="18.8812" cy="50" rx="49.8812" ry="50" fill="#BD5141" />
      </svg>
      <svg
        className="absolute right-[0px] top-[642px]"
        width="121"
        height="160"
        viewBox="0 0 121 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="80.6202" cy="80" rx="80.6202" ry="80" fill="#EFAD5F" />
      </svg>
      <div className="flex flex-col items-center rounded-md px-3">
        <div className="z-10 mt-3 h-[586px] w-full py-3 px-4">
          <p className="px-3 text-xl font-bold">
            Youre in. Save this QR code to sign in anonymously to other apps.
          </p>
          <p className="mb-3 py-5 px-3 text-sm text-[#513E2E]">
            The code contains a Semaphore ID learn more...{' '}
            <a className="underline">here</a>
          </p>
          <img href="" alt="qr-code" />
          <button className="mb-8 w-full rounded-lg border-2 border-brand-gray2 bg-brand-beige2 p-2 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
            Save to Camera Roll
          </button>
        </div>
      </div>

      <div className="absolute bottom-[50px] left-0 -z-10 h-[20%] w-full bg-black"></div>
    </div>
  )
}

export default SaveIdentityQr
