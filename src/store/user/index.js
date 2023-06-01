import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";

// Actions
// Example of action
export const fetchAllUsers = (payload)=> async dispatch =>{
    try {
        return await axios.get('http://localhost:8081/users')
    }catch (e) {
        console.log(e,'e')
    }
}


// Slice
const userSlice = createSlice({
    name: 'user',
    initialState: {
        // Example of state
        user: {
            name: 'User'
        },
        modal: {
            show: false,
            type: null,
            title: null
        }
    },
    reducers: {
        setShowModal: (state,action) =>{
            state.modal = action.payload
        }
    },
});

export const { setShowModal } = userSlice.actions
export default userSlice.reducer