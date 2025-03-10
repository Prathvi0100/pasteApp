import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/Slice/pasteSlice';

const ViewPaste = () => {
  const {id}=useParams();
  const allPastes=useSelector((state)=>state.paste.pastes);
  const paste=allPastes.filter((p)=>p._id===id)[0];
  console.log(paste);
  
  return (
    <div>
      <div className='flex flex-row gap-7'>
        <input
          className='p-1 rounded-2xl mt-2 w-[66%] pl-4'
          type="text"
          placeholder='Enter title here'
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <textarea
          className='rounded-2xl mt-2 min-w-[500px] p-4'
          value={paste.content}
          placeholder='Enter Content Here'
          onChange={(e) => setValue(e.target.value)}
          rows={20}
          disabled
        />
      </div>
    </div>

  )
}

export default ViewPaste