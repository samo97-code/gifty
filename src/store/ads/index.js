import {createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import {catchErrors} from "../../utils";

// Actions
// Example of action
export const createAds = (payload) => async dispatch => {
    try {
        return await axios.post('http://localhost:8081/ads', payload)
    } catch (e) {
        catchErrors(e)
    }
}

export const fetchAds = (payload) => async dispatch => {
    try {
        let url = `http://localhost:8081/ads?`

        if (payload?.paginate) url += `${payload.paginate}`

        return await axios.get(url)
    } catch (e) {
        catchErrors(e)
    }
}

export const fetchAdsById = (payload) => async dispatch => {
    try {
        return await axios.get(`http://localhost:8081/ads/${payload.id}`)
    } catch (e) {
        catchErrors(e)
    }
}

export const updateAds = (payload) => async dispatch => {
    try {
        return await axios.put(`http://localhost:8081/ads/${payload.id}`,payload)
    } catch (e) {
        catchErrors(e)
    }
}

export const deleteAds = (payload) => async dispatch => {
    try {
        return await axios.delete(`http://localhost:8081/ads/${payload.id}`)
    } catch (e) {
        catchErrors(e)
    }
}


// Slice
const slice = createSlice({
    name: 'ads',
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