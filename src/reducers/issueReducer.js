import {combineReducers} from 'redux'
import '../actions/index.js'
import {createReducer, makePatchEntityById, addEntitiesById, deleteEntityById, deleteEntityAllIds, addEntityAllIds, startFetching, receiveServerStatus, addEntitiesAllIds} from './helper'
/*
function startFetching(state = {isFetching: false}, action) {
	return updateObject(state, {isFetching: true})
}
function receiveServerStatus(state = {isFetching: true, fetchstatus: 0}, action) {
	const {response} = action.payload
	return updateObject(state, {isFetching: false, fetchstatus: response})
}*/

const byId = createReducer({}, { //other fetching controls (s)
	'RECEIVE_REQUEST_ISSUES': addEntitiesById,
	'REQUEST_ISSUE_DETAIL': startFetching,
	'SERVER_RESPONSE_TO_REQUEST_ISSUE_DETAIL': receiveServerStatus,
	'RECEIVE_REQUEST_ISSUE_DETAIL': makePatchEntityById(true),
	'RECEIVE_REQUEST_POST_ISSUE': makePatchEntityById(true),
	'RECEIVE_REQUEST_MODIFY_ISSUE': makePatchEntityById(true),
	'RECEIVE_REQUEST_COMPLETE_ISSUE': makePatchEntityById(true),
	'RECEIVE_REQUEST_DELETE_ISSUE' : deleteEntityById
})
const allIds = createReducer([], {
	'RECEIVE_REQUEST_ISSUES': addEntitiesAllIds,
	'RECEIVE_REQUEST_POST_ISSUE': addEntityAllIds,
	'RECEIVE_REQUEST_DELETE_ISSUE' : deleteEntityAllIds
})
const fetch = createReducer({}, {
	'REQUEST_ISSUES': startFetching,
	'SERVER_RESPONSE_TO_REQUEST_ISSUES': receiveServerStatus
})
const creation = createReducer({}, {
	'REQUEST_POST_ISSUE': startFetching,
	'SERVER_RESPONSE_TO_REQUEST_POST_ISSUE': receiveServerStatus
})
const modification = createReducer({}, {
	'REQUEST_MODIFY_ISSUE': startFetching,
	'SERVER_RESPONSE_TO_REQUEST_MODIFY_ISSUE': receiveServerStatus,
	'REQUEST_HANDLE_ISSUE': startFetching,
	'SERVER_RESPONSE_TO_REQUEST_HANDLE_ISSUE': receiveServerStatus
})
const deletion = createReducer({}, {
	'REQUEST_DELETE_ISSUE' : startFetching,
	'SERVER_RESPONSE_TO_REQUEST_DELETE_ISSUE' : receiveServerStatus
})
const workspace = combineReducers({fetch, creation, modification, deletion})
const issues = combineReducers({byId, allIds, workspace})
export default issues