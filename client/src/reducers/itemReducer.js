// Import what types of actions can occur from types
import {GET_ITEMS, ADD_ITEM, REMOVE_ITEM, ITEMS_LOADING} from '../actions/types'
 
// Basic state for when we are not connected to database
const intitialState = {
    items: [],
    loading: false
}


export default function(state = intitialState, action) {
    
    // This switch decides what to do when it recieves types. It will use the input to carry out a function
    switch(action.type) {
        // Fetches intitial items from database
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false
            }
        // Removes an item from the store
        case REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.payload)
                }
        // Adds an item to the store
        case ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            }
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}