import {UPDATE_USERS, SET_USERS_BY_NAME_FILTER, SELECT_USER_DETAILS} from '../constants/ActionTypes'

const initialState = {
    byId: {},
    usersByNameFilter: '',
    selectedUserDetails: null
}

function updateUsers(currentUsers, receivedUsers) {
    const updatedUsers = {}
    Object.values(receivedUsers).forEach(receivedUser => {
        const currentUser = currentUsers[receivedUser.id]
        const updatedUser = {...currentUser, ...receivedUser}
        updatedUsers[receivedUser.id] = updatedUser
    })
    return updatedUsers
}

const byId = (state = initialState.byId, action) => {

    switch (action.type) {
        case UPDATE_USERS:
            return {
                ...state,
                ...updateUsers(state, action.users)
            }
        default:
            return state
    }
}

function usersByNameFilter(state = initialState.usersByNameFilter, action) {

    switch (action.type) {
        case SET_USERS_BY_NAME_FILTER:
            return action.filterValue
        default:
            return state
    }
}

function selectUserDetails(state = state.selectedUserDetails, action) {

    switch (action.type) {
        case SELECT_USER_DETAILS:
            return action.userId
        default:
            return state
    }
}

function users (state = initialState, action) {

    switch (action.type) {
        default:
            return {
                byId: byId(state.byId, action),
                usersByNameFilter: usersByNameFilter(state.usersByNameFilter, action),
                selectedUserDetails: selectUserDetails(state.selectedUserDetails, action)
            }
    }
}

export default users