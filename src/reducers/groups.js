import {combineReducers} from 'redux'
import {FETCH_GROUP_ITEMS_SUCCESS} from '../constants/ActionTypes'

const initialState = {
    byId: {}
}

const groupItems = (state = initialState.byId, action) => {

    switch (action.type) {
        case FETCH_GROUP_ITEMS_SUCCESS:
            return {
                ...state,
                ...action.groups
            }
        default:
            return state
    }
}

const groups = (state = initialState, action) => {

    switch (action.type) {
        default:
            return {
                byId: groupItems(state.byId, action)
            }
    }
}


export default groups