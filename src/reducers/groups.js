import {combineReducers} from 'redux'
import {UPDATE_GROUPS, SET_GROUPS_BY_NAME_FILTER, SELECT_GROUP_DETAILS} from '../constants/ActionTypes'

const initialState = {
    byId: {},
    groupsByNameFilter: '',
    selectedGroupDetails: null
}

const groupItems = (state = initialState.byId, action) => {

    switch (action.type) {
        case UPDATE_GROUPS:
            return {
                ...state,
                ...action.groups
            }
        default:
            return state
    }
}

function groupsByNameFilter(state = initialState.groupsByNameFilter, action) {

    switch (action.type) {
        case SET_GROUPS_BY_NAME_FILTER:
            return action.filterValue
        default:
            return state
    }
}

function selectGroupDetails(state = state.selectedGroupDetails, action) {
    switch (action.type) {
        case SELECT_GROUP_DETAILS:
            return action.groupId
        default:
            return state
    }
}

function groups (state = initialState, action) {

    switch (action.type) {
        default:
            return {
                byId: groupItems(state.byId, action),
                groupsByNameFilter: groupsByNameFilter(state.groupsByNameFilter, action),
                selectedGroupDetails: selectGroupDetails(state.selectedGroupDetails, action)
            }
    }
}

export default groups