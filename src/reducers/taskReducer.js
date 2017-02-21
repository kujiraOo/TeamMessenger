import {combineReducers} from 'redux'
import '../actions/index.js'
import {updateObject, createReducer} from './helper'

function startFetching(state = {isFetching: false}, action) {
	return updateObject(state, {isFetching: true})
}
function receiveServerStatus(state = {isFetching: true, fetchstatus: 0}, action) {
	const {response} = action.payload
	return updateObject(state, {isFetching: false, fetchstatus: response})
}
function makePatchTaskById(detailed) {
	return (state, action) => {
		const {id} = action.payload
		return updateObject(state, {
			[id] : {...action.payload, detailed}
		})
	}
}
/*function _patchTaskById(state, action, detailed) { //function in charge of adding tasks, modifying tasks, or complete a task
	//if the server denies our operation this would not have been called (no RECEIVE_REQUEST_XXX) dispatched
	const {id} = action.payload
	return updateObject(state, {
		[id] : {...action.payload, detailed}
	})
}*/
function addTasksById(state, action) {
	//state = {}, action.payload = []
	let {payload} = action
	let newState = updateObject(state, {});
	let patchTaskById = makePatchTaskById(false);
	payload.forEach((task) => {patchTaskById(state, {payload: task})})
}
function deleteTaskById(state, action) {
	let copyOfState = updateObject(state, {});
	if (delete copyOfState[action.payload.id]) return copyOfState;
	else {
		console.log('Error while deleting task');
		return state
	}
}
function deleteTaskAllIds(state, action) {
	let index = state.indexOf(action.request.taskId);
	if (index == -1) return state;
	let newState = state.map((elem) => {return elem});
	newState.splice(index, 1);
	return newState;
}
function addTaskAllIds(state, action) {
	//add the task id in the allId field
	let newState = state.map((id) => {return id});
	return [...newState, action.payload.id]
}

const byId = createReducer({}, { //other fetching controls (s)
	'RECEIVE_REQUEST_TASKS': addTasksById,
	'REQUEST_TASK_DETAIL': startFetching,
	'SERVER_RESPONSE_TO_REQUEST_TASK_DETAIL': receiveServerStatus,
	'RECEIVE_REQUEST_TASK_DETAIL': makePatchTaskById(true),
	'RECEIVE_POST_TASK': makePatchTaskById(true),
	'RECEIVE_MODIFY_TASK': makePatchTaskById(true),
	'RECEIVE_COMPLETE_TASK': makePatchTaskById(true),
	'RECEIVE_REQUEST_DELETE_TASK' : deleteTaskById
})
const allIds = createReducer([], {
	'RECEIVE_REQUEST_TASKS': addTaskAllIds,
	'RECEIVE_REQUEST_DELETE_TASK' : deleteTaskById
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