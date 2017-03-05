import {combineReducers} from 'redux'
import '../actions/index.js'
import {createReducer, makePatchEntityById, addEntitiesById, deleteEntityAllIds, addEntityAllIds, startFetching, receiveServerStatus, addEntitiesAllIds} from './helper'
//overload deleteEntityById: We dont actually delete the user, we simply says that it is inactive.
const deleteEntityById = (state, action) => {
	//state = {}, actions = {payload: {id}}
	const {id} = action.payload
	return {...state, state[id].status = 'INACTIVE'}
}
const byId = createReducer({}, { //other fetching controls (s)
	'RECEIVE_REQUEST_USERS': addEntitiessById,
	'REQUEST_USER_DETAIL': startFetching,
	'SERVER_RESPONSE_TO_REQUEST_USER_DETAIL': receiveServerStatus,
	'RECEIVE_REQUEST_USER_DETAIL': makePatchEntityById(true),
	'RECEIVE_REQUEST_POST_USER': makePatchEntityById(true),
	'RECEIVE_REQUEST_MODIFY_USER': makePatchEntityById(true),
	'RECEIVE_REQUEST_MODIFY_USER' : makePatchEntityById(true),
	'RECEIVE_REQUEST_DELETE_USER' : deleteEntityById
})
const allIds = createReducer([], {
	'RECEIVE_REQUEST_USERS': addEntitiesAllIds,
	'RECEIVE_REQUEST_DELETE_USER' : deleteEntityAllIds, //Also the user information is no longer in the look up entry
	'RECEIVE_REQUEST_POST_USER': addEntityAllIds,
})
const fetch = createReducer({}, {
	'REQUEST_USERS': startFetching,
	'SERVER_RESPONSE_TO_REQUEST_USERS': receiveServerStatus
})
const creation = createReducer({}, {
	'REQUEST_POST_USER': startFetching,
	'SERVER_RESPONSE_TO_REQUEST_POST_USER': receiveServerStatus
})
const modification = createReducer({}, {
	'REQUEST_MODIFY_USER': startFetching,
	'SERVER_RESPONSE_TO_REQUEST_MODIFY_USER': receiveServerStatus,
	'REQUEST_COMPLETE_USER': startFetching,
	'SERVER_RESPONSE_TO_REQUEST_COMPLETE_USER': receiveServerStatus
})
const deletion = createReducer({}, {
	'REQUEST_DELETE_USER' : startFetching,
	'SERVER_RESPONSE_TO_REQUEST_DELETE_USER' : receiveServerStatus
})
const workspace = combineReducers({fetch, creation, modification, deletion})
const users = combineReducers({byId, allIds, workspace})
export default users