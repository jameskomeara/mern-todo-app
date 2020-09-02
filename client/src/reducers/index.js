import {combineReducers} from 'redux'
import itemReducer from './itemReducer.js'

// Combines all the reducers into one so that they do not all have to be exported
export default combineReducers({
    item: itemReducer
})