const Header = () => {
  return (
    <div className="mt-4 mb-[70px] flex items-end justify-between px-2">
      <div className="-rotate-90 transform -ml-6 text-xl tracking-wide text-brand-brown">
        <h1>TEMP_RARY</h1>
        <h1 className="bg-brand-black px-1 text-brand-beige2">AN_NYMOUS</h1>
        <h1>Z_NE</h1>
      </div>
      <div className="flex flex-col items-end -mb-6">
        <p className="text-brand-sm tracking-widest text-brand-gray60">
          DEVCON&mdash;BOGOTA
        </p>
        <p className="font-year text-brand-4xl font-bold text-brand-black">
          2022
        </p>
      </div>
    </div>
  )
}

export default Header
