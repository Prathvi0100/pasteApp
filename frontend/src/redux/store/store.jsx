import {configureStore} from '@reduxjs/toolkit'
import {pasteSlice}  from'../Slice/pasteSlice'

export const store=configureStore({
    reducer:{
        paste:pasteSlice.reducer,
    }
})