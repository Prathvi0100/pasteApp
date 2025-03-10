import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/Slice/pasteSlice';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);


    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => 
                p._id === pasteId
             );
            setTitle(paste.title);
            setValue(paste.content);
        }
    }, [pasteId])


    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(34),
            createdAt: new Date().toISOString()
        }
        if (pasteId) {
            //updating content to paste
            dispatch(updateToPastes(paste));
        } else {
            //creating content to paste
            dispatch(addToPastes(paste));
        }

        //after creation or updation of paste value clear title and content
        setValue('');
        setTitle('');
        setSearchParams({});
    }

    return (
        <div>
            <div className='flex flex-row gap-7 place-content-between'>
                <input
                    className='rounded-2xl p-2 w-[70%] pl-4'
                    type="text"
                    placeholder='Enter Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />

                <button
                    onClick={createPaste}
                    className='rounded-2xl p-2  pr-4'>
                    {
                        pasteId ? "Update Paste" : "Create Paste"
                    }
                </button>
            </div>

            <textarea
                className='rounded-2xl mt-2 min-w-[500px] p-4'
                value={value}
                placeholder='Enter Content Here'
                onChange={(e) => setValue(e.target.value)}
                rows={20}
            />
        </div>
    )
}

export default Home 