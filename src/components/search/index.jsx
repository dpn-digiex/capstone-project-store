'use client'
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'

import SearchPopup from '../search-popup'

const SeachComponent = () => {
  const [show, setShow] = useState(false)
  return (
    <>
      <div
        className='w-9 h-9 rounded-full flex items-center justify-center bg-[#2f3033] hover:bg-[#545454] cursor-pointer'
        onClick={() => setShow(true)}
      >
        <CiSearch size={18} />
      </div>
      {show ? <SearchPopup show={show} setShow={setShow} /> : null}
    </>
  )
}

export default SeachComponent
