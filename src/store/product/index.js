import {createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {catchErrors} from "../../utils";

// Actions
// Example of action
export const createProduct = (payload) => async dispatch => {
    try {
        return await axios.post('http://localhost:8081/products', payload)
    } catch (e) {
        catchErrors(e)
    }
}

export const fetchProducts = (payload) => async dispatch => {
    try {
        return await axios.get('http://localhost:8081/products')
    } catch (e) {
        catchErrors(e)
    }
}

export const fetchProductById = (payload) => async dispatch => {
    try {
        return await axios.get(`http://localhost:8081/products/${payload.id}`)
    } catch (e) {
        catchErrors(e)
    }
}

export const updateProduct= (payload) => async dispatch => {
    try {
        return await axios.put(`http://localhost:8081/products/${payload.id}`,payload)
    } catch (e) {
        catchErrors(e)
    }
}

export const deleteProduct = (payload) => async dispatch => {
    try {
        return await axios.delete(`http://localhost:8081/products/${payload.id}`)
    } catch (e) {
        catchErrors(e)
    }
}


// Slice
const slice = createSlice({
    name: 'product',
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