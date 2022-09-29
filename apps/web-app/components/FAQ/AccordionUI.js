import React from 'react'
import DropDownArrow from '../ArrowNavigators/DropDownArrow'
import CollapseArrow from '../ArrowNavigators/CollapseArrow'

const AccordionUI = ({ title, children, Id, Index, setIndex }) => {
  const handleSetIndex = (Id) => (Index === Id ? setIndex(0) : setIndex(Id))

  return (
    <>
      <div
        onClick={() => handleSetIndex(Id)}
        className="flex w-full justify-between cursor-pointer mx-auto h-auto justify-between items-center px-4 py-5 mt-2 bg-white"
      >
        <div className="flex group cursor-pointer">
          <div className="text-brand-brown mr-4">{title}</div>
        </div>
        <div className="flex items-center">
          {Index !== Id ? <DropDownArrow className="w-6 h-6" /> : <CollapseArrow className="w-6 h-6" />}
        </div>
      </div>
      {Index === Id && (
        <div className="flex w-full text-brand-brown text-brand-info opacity-[70%] h-auto px-4 pb-6 ">{children}</div>
      )}
    </>
  )
}

export default AccordionUI
