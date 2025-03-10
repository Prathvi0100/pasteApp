import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/Slice/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Paste = () => {
  //for fetching data from state we use useSelector((state)=>state.counter.value)
  const pastes = useSelector((state) => state.paste.pastes);
  console.log(pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()))

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div>
      <input
        className='rounded-2xl mt-3 p-2 min-w-[500px]'
        type="search "
        placeholder='Search Here'
        value={searchTerm}
        onChange={(e) => { setSearchTerm(e.target.value) }}
      />

      <div className='flex flex-col gap-5 mt-5'>
        {
          filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className='border rounded-xl' key={paste?._id}>
                <div>
                  {paste.title}
                </div>
                <div className='mb-1'>
                  {paste.content}
                </div>
                <div className='flex flex-row gap-4 m-2 place-content-evenly'>
                  <button>
                    <Link to={`/pastes/${paste?._id}`}>View</Link>
                  </button>
                  <button>
                    <Link to={`/?pasteId=${paste?._id}`}>Edit</Link>
                  </button>
                  <button>Share</button>
                  <button onClick={() =>
                    handleDelete(paste?._id)
                  }>Delete</button>
                  <button onClick={() => {
                    navigator.clipboard.writeText(paste?.content)
                    toast.success("Copied to Clipboard")
                  }
                  }>Copy</button>
                </div>
                <div>
                  {paste.createdAt}
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Paste