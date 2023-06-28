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
        let url = `http://localhost:8081/products?`

        if (payload?.paginate) url += `${payload.paginate}`
        if (payload?.name) url += `&title_like=${payload.name}`
        if (payload?.brand) url += `&brand_like=${payload.brand}`
        if (payload?.model) url += `&model_like=${payload.model}`
        if (payload?.sortBy) {
            url += `&${payload.sortBy}`
        }else  url += `&_sort=updated_at&_order=desc`


        if (payload?.categories) {
            let str = ''
            payload.categories.forEach((item)=>{
                url += `&category.name=${item}`
            })
            url += str
        }

        if (payload?.statuses) {
            let str = ''
            payload.statuses.forEach((item)=>{
                str += `&status.name=${item}`
            })
            url += str
        }

        if (payload?.date){
            const start = `${payload.date}-01-01`
            const end = `${payload.date}-12-31`
            url += `&order_date_gte=${start}&order_date_lte=${end}`
        }

        if (payload?.dateRanges?.length){
            url += `&order_date_gte=${payload.dateRanges[0]}&order_date_lte=${payload.dateRanges[1]}`
        }

        if (payload?.ne){
            url += `&status.name_ne=${payload.ne}`
        }

        return await axios.get(url)
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