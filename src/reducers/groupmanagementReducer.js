import {combineReducers} from 'redux'
import '../actions/index.js'
import {createReducer, makePatchEntityById, addEntitiesById, deleteEntityById, deleteEntityAllIds, addEntityAllIds, startFetching, receiveServerStatus, addEntitiesAllIds} from './helper'

const byId = createReducer({}, { //other fetching controls (s)
	'RECEIVE_REQUEST_GROUPS': addEntitiessById,
	'REQUEST_GROUP_DETAIL': startFetching,
	'SERVER_RESPONSE_TO_REQUEST_GROUP_DETAIL': receiveServerStatus,
	'RECEIVE_REQUEST_GROUP_DETAIL': makePatchEntityById(true),
	'RECEIVE_REQUEST_POST_GROUP': makePatchEntityById(true),
	'RECEIVE_REQUEST_MODIFY_GROUP': makePatchEntityById(true),
	'RECEIVE_REQUEST_COMPLETE_GROUP': makePatchEntityById(true),
	'RECEIVE_REQUEST_DELETE_GROUP' : deleteEntityAllId
})
const allIds = createReducer([], {
	'RECEIVE_REQUEST_GROUPS': addEntitiesAllIds,
	'RECEIVE_REQUEST_POST_GROUP': addEntityAllIds,
	'RECEIVE_REQUEST_DELETE_GROUP' : deleteEntityAllIds
})
const fetch = createReducer({}, {
	'REQUEST_GROUPS': startFetching,
	'SERVER_RESPONSE_TO_REQUEST_GROUPS': receiveServerStatus
})
const creation = createReducer({}, {
	'REQUEST_POST_GROUP': startFetching,
	'SERVER_RESPONSE_TO_REQUEST_POST_GROUP': receiveServerStatus
})
const modification = createReducer({}, {
	'REQUEST_MODIFY_GROUP': startFetching,
	'SERVER_RESPONSE_TO_REQUEST_MODIFY_GROUP': receiveServerStatus,
	'REQUEST_COMPLETE_GROUP': startFetching,
	'SERVER_RESPONSE_TO_REQUEST_COMPLETE_GROUP': receiveServerStatus
})
const deletion = createReducer({}, {
	'REQUEST_DELETE_GROUP' : startFetching,
	'SERVER_RESPONSE_TO_REQUEST_DELETE_GROUP' : receiveServerStatus
})
const workspace = combineReducers({fetch, creation, modification, deletion})
const groups = combineReducers({byId, allIds, workspace})
export default groups