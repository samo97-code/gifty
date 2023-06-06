import {createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {catchErrors} from "../../utils";

// Actions
// Example of action
export const createCategory = (payload) => async dispatch => {
    try {
        return await axios.post('https://gifty-json-server.vercel.app/categories', payload)
    } catch (e) {
       catchErrors(e)
    }
}

export const fetchCategories = (payload) => async dispatch => {
    try {
        return await axios.get('https://gifty-json-server.vercel.app/categories')
    } catch (e) {
        catchErrors(e)
    }
}

export const fetchCategoryById = (payload) => async dispatch => {
    try {
        return await axios.get(`http://localhost:8081/categories/${payload.id}`)
    } catch (e) {
        catchErrors(e)
    }
}

export const updateCategory = (payload) => async dispatch => {
    try {
        return await axios.put(`http://localhost:8081/categories/${payload.id}`,payload)
    } catch (e) {
        catchErrors(e)
    }
}

export const deleteCategory = (payload) => async dispatch => {
    try {
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