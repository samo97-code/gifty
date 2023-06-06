import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import user from './user/index'
import category from './category/index'
import ads from './ads/index'
import product from './product/index'

const reducer = combineReducers({
    user,
    category,
    ads,
    product
})

const store = configureStore({
    reducer,
})
export default store;