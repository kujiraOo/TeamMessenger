import '../actions/index.js'
import {updateObject, createReducer} from './helper'
import {FETCH_AUTH_REQUEST, FETCH_AUTH_SUCCESS, FETCH_AUTH_FAILURE, RECEIVE_AUTH} from '../constants/ActionTypes'

function startFetching(authenticationState, action) {
    return updateObject(authenticationState, {isFetching: true, responseFromServer: 0, loggedin: false})
}
function recieveServerStatus(authenticationState, action) {
    const {statusCode} = action
    const loggedin = statusCode === 200
    return updateObject(authenticationState, {isFetching: false, responseFromServer: statusCode, loggedin})
}
function recieveServerData(authenticationState, action) {
    return {...authenticationState, loggedInUserId: action.loggedInUserId}
}

const authentication = createReducer({}, {
    [FETCH_AUTH_REQUEST]: startFetching,
    [FETCH_AUTH_SUCCESS]: recieveServerStatus,
    [FETCH_AUTH_FAILURE]: recieveServerStatus,
    [RECEIVE_AUTH]: recieveServerData
})

export default authentication