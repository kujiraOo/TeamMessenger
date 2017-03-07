import {combineReducers} from 'redux'
import '../actions/index.js'
import {
    createReducer,
    makePatchEntityById,
    addEntitiesById,
    deleteEntityById,
    deleteEntityAllIds,
    addEntityAllIds,
    startFetching,
    receiveServerStatus,
    addEntitiesAllIds
} from './helper'
import {
    FETCH_TASK_SUCCESS,
    FETCH_TASK_FAILURE,
    FETCH_TASK_REQUEST,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILURE,
    FETCH_TASKS_REQUEST,
    RECEIVE_TASKS
} from '../constants/ActionTypes'


const byId = createReducer({}, { //other fetching controls (s)
    [RECEIVE_TASKS]: function (state, action) {
        return {...state, ...action.tasks}
    },
    'REQUEST_TASK_DETAIL': startFetching,
    'SERVER_RESPONSE_TO_REQUEST_TASK_DETAIL': receiveServerStatus,
    'RECEIVE_REQUEST_TASK_DETAIL': makePatchEntityById(true),
    'RECEIVE_REQUEST_POST_TASK': makePatchEntityById(true), //beware this one
    'RECEIVE_REQUEST_MODIFY_TASK': makePatchEntityById(true),
    'RECEIVE_REQUEST_COMPLETE_TASK': makePatchEntityById(true),
    'RECEIVE_REQUEST_DELETE_TASK': deleteEntityById
})
const allIds = createReducer([], {
    'RECEIVE_REQUEST_TASKS': addEntitiesAllIds,
    'RECEIVE_REQUEST_POST_TASK': addEntityAllIds,
    'RECEIVE_REQUEST_DELETE_TASK': deleteEntityAllIds
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
    'REQUEST_DELETE_TASK': startFetching,
    'SERVER_RESPONSE_TO_REQUEST_DELETE_TASK': receiveServerStatus
})
const workspace = combineReducers({fetch, creation, modification, deletion})
const tasks = combineReducers({byId, workspace})
export default tasks