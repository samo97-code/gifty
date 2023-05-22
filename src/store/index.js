import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import user from './user/index'
import category from './category/index'

const reducer = combineReducers({
    user,
    category
})

const store = configureStore({
    reducer,
})
export default store;