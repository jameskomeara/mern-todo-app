import {combineReducers} from 'redux'
import itemReducer from './itemReducer.js'
import authReducer from './authReducer'
import errorReducer from './errorReducer'


// Combines all the reducers into one so that they do not all have to be exported
export default combineReducers({
    item: itemReducer,
    error: errorReducer,
    auth: authReducer

})