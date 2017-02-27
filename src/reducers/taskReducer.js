import {combineReducers} from 'redux'
import '../actions/index.js'
import {createReducer, makePatchEntityById, addEntitiesById, deleteEntityById, deleteEntityAllIds, addEntityAllIds, startFetching, receiveServerStatus, addEntitiesAllIds} from './helper'
/*
export function startFetching(state = {isFetching: false}, action) {
	return updateObject(state, {isFetching: true})
}
export function receiveServerStatus(state = {isFetching: true, fetchstatus: 0}, action) {
	const {response} = action.payload
	return updateObject(state, {isFetching: false, fetchstatus: response})
}
export function makePatchEntityById(detailed) {
	return (state, action) => {
		const {id} = action.payload
		return updateObject(state, {
			[id] : {...action.payload, detailed}
		})
	}
}
export function addEntitysById(state, action) {
	//state = {}, action.payload = []
	let {payload} = action
	let newState = updateObject(state, {});
	let patchEntityById = makePatchEntityById(false);
	payload.forEach((task) => {patchEntityById(state, {payload: task})})
}
export function deleteEntityById(state, action) {
	let copyOfState = updateObject(state, {});
	if (delete copyOfState[action.payload.id]) return copyOfState;
	else {
		console.log('Error while deleting task');
		return state
	}
}
export function deleteEntityAllIds(state, action) {
	let index = state.indexOf(action.request.taskId);
	if (index == -1) return state;
	let newState = state.map((elem) => {return elem});
	newState.splice(index, 1);
	return newState;
}
export function addEntityAllIds(state, action) {
	//add the task id in the allId field
	let newState = state.map((id) => {return id});
	return [...newState, action.payload.id]
}
*/
const byId = createReducer({}, { //other fetching controls (s)
	'RECEIVE_REQUEST_TASKS': addEntitiesById,
	'REQUEST_TASK_DETAIL': startFetching,
	'SERVER_RESPONSE_TO_REQUEST_TASK_DETAIL': receiveServerStatus,
	'RECEIVE_REQUEST_TASK_DETAIL': makePatchEntityById(true),
	'RECEIVE_REQUEST_POST_TASK': makePatchEntityById(true), //beware this one
	'RECEIVE_REQUEST_MODIFY_TASK': makePatchEntityById(true),
	'RECEIVE_REQUEST_COMPLETE_TASK': makePatchEntityById(true),
	'RECEIVE_REQUEST_DELETE_TASK' : deleteEntityById
})
const allIds = createReducer([], {
	'RECEIVE_REQUEST_TASKS': addEntitiesAllIds,
	'RECEIVE_REQUEST_POST_TASK': addEntityAllIds,
	'RECEIVE_REQUEST_DELETE_TASK' : deleteEntityAllIds
})
const fetch = createReducer({}, {
	'REQUEST_TASKS': startFetching,
	'SERVER_RESPONSE_TO_REQUEST_TASKS': receiveServerStatus
})
const creation = createReducer({}, {
	'REQUEST_POST_TASK': startFetching,
	'SERVER_RESPONSE_TO_REQUEST_POST_TASK': receiveServerStatus
})
const modification = createReducer({}, {
	'REQUEST_MODIFY_TASK': startFetching,
	'SERVER_RESPONSE_TO_REQUEST_MODIFY_TASK': receiveServerStatus,
	'REQUEST_COMPLETE_TASK': startFetching,
	'SERVER_RESPONSE_TO_REQUEST_COMPLETE_TASK': receiveServerStatus
})
const deletion = createReducer({}, {
	'REQUEST_DELETE_TASK' : startFetching,
	'SERVER_RESPONSE_TO_REQUEST_DELETE_TASK' : receiveServerStatus
})
const workspace = combineReducers({fetch, creation, modification, deletion})
const tasks = combineReducers({byId, allIds, workspace})
export default tasks