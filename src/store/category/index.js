import {createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {catchErrors} from "../../utils";

// Actions
// Example of action
export const createCategory = (payload) => async dispatch => {
    try {
        return await axios.post('http://localhost:8081/categories', payload)
    } catch (e) {
       catchErrors(e)
    }
}

export const fetchCategories = (payload) => async dispatch => {
    try {
        return await axios.get('http://localhost:8081/categories')
    } catch (e) {
        catchErrors(e)
    }
}

export const deleteCategory = (payload) => async dispatch => {
    try {
        console.log(payload,'payload')
        return await axios.delete(`http://localhost:8081/categories/${payload.id}`)
    } catch (e) {
        catchErrors(e)
    }
}


// Slice
const slice = createSlice({
    name: 'category',
    initialState: {
        // Example of state
        user: {
            name: 'User'
        },
    },
    reducers: {
        loginSuccess: (state, action) => {
            // Example of Reducer
            // state.user = action.payload;
        },
    },
});

const {loginSuccess} = slice.actions
export default slice.reducer