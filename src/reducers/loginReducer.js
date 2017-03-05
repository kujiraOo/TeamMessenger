import '../actions/index.js'
import {updateObject, updateItemInArray, createReducer} from './helper'

function startFetching(authenticationState, action) {
	return updateObject(authenticationState, {isFetching: true, responseFromServer: 0,	loggedin: false})
}
function recieveServerStatus(authenticationState, action) {
	return updateObject(authenticationState, {isFetching: false, responseFromServer: action.payload.response, loggedin: action.payload.response == 200})
}
function recieveServerData(authenticationState, action) {
	return updateObject(authenticationState, action.payload)
}

const authentication = createReducer({}, {
	'REQUEST_AUTHENTICATION_INFO' : startFetching,
	'SERVER_RESPONSE_TO_REQUEST_AUTHENTICATION_INFO' : recieveServerStatus,
	'RECEIVE_REQUEST_AUTHENTICATION_INFO' : recieveServerData
})

export default authentication