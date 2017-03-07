import {get} from '../api/fetch'
import {requestOperation, responseFromServer, responseToRequest, checkStatus} from './helper'
import {
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_REQUEST,
    RECEIVE_TASKS,
    FETCH_TASKS_FAILURE,
    FETCH_TASK_FAILURE,
    FETCH_TASK_SUCCESS,
    FETCH_TASK_REQUEST
} from '../constants/ActionTypes'
import {updateUsers} from './UserActions'
import {updateGroups} from './GroupActions'
import {task as taskSchema} from '../api/schemas'
import {normalize} from 'normalizr'
import {store} from '../Root'

function getLoggedInUserId() {
    return store.getState().authentication.loggedInUserId
}

function fetchTasksSuccess(statusCode) {
    return {
        type: FETCH_TASKS_SUCCESS,
        statusCode
    }
}

function fetchTasksRequest() {
    return {
        type: FETCH_TASKS_REQUEST
    }
}

function fetchTasksFailure(statusCode) {
    return {
        type: FETCH_TASKS_FAILURE,
        statusCode
    }
}

function fetchTaskSuccess(statusCode) {
    return {
        type: FETCH_TASK_SUCCESS,
        statusCode
    }
}

function fetchTaskRequest() {
    return {
        type: FETCH_TASK_REQUEST
    }
}

function fetchTaskFailure(statusCode) {
    return {
        type: FETCH_TASK_FAILURE,
        statusCode
    }
}

function receiveTasks(tasks) {
    return {
        type: RECEIVE_TASKS,
        tasks
    }
}

export function fetchTasks() { //thunk to call api to fetch task list
    return (dispatch) => {
        dispatch(fetchTasksRequest())
        return get('/tasks', {auth: getLoggedInUserId()})
            .then(res => {
                dispatch(fetchTasksSuccess(res.status))
                return res.json()
            })
            .then(tasksData => {
                const normalizedData = normalize(tasksData, [taskSchema])
                dispatch(updateGroups(normalizedData.entities.groups))
                dispatch(updateUsers(normalizedData.entities.users))
                dispatch(receiveTasks(normalizedData.entities.tasks))
            })
            .catch(err => {
                dispatch(fetchTasksFailure(err.response.status))
            })
    }
}

export function fetchTask(taskId) { //thunk to call api to fetch task list
    return (dispatch) => {
        dispatch(fetchTaskRequest())
        return get('/tasks/' + taskId, {auth: getLoggedInUserId()})
            .then(res => {
                dispatch(fetchTaskSuccess(res.status))
                return res.json()
            })
            .then(taskData => {
                const normalizedData = normalize(taskData, taskSchema)
                dispatch(updateGroups(normalizedData.entities.groups))
                dispatch(updateUsers(normalizedData.entities.users))
                dispatch(receiveTasks(normalizedData.entities.tasks))
            })
            .catch(err => {
                dispatch(fetchTaskFailure(err.response.status))
            })
    }
}

// export function fetchTaskDetail(id, userId) {
// 	return (dispatch) => {
// 		let req = requestOperation('TASK_DETAIL', {id, userId})
// 		dispatch(req)
// 		return fetch(`../tasks/${id}`,
// 		{
// 			method: 'GET',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'authorization': userId
// 			}
// 		})
// 		.then((res)=>{
// 			dispatch(responseFromServer(req, res.status))
// 			checkStatus(res, req)
// 			return res.json()
// 		})
// 		.then((json)=> {dispatch(responseToRequest(req, json))})
// 		.catch(err => console.log(err))
// 	}
// }

// export function postTask(userId, entity) {
// 	return (dispatch) => {
// 		let req = requestOperation('POST_TASK', {userId, entity})
// 		dispatch(req)
// 		return fetch('../tasks', {
// 			method: 'POST',
// 			header: {
// 				'Content-Type': 'application/json',
// 				'authorization' : userId
// 			},
// 			body: JSON.stringify({task: entity})
// 		})
// 		.then((res)=>{
// 			dispatch(responseFromServer(req, res.status))
// 			checkStatus(res, req)
// 			return res.json()
// 		})
// 		.then((json)=> {dispatch(responseToRequest(req, json))})
// 		.catch(err => console.log(err))
// 	}
// }
// export function modifyTask(userId, id, entity) {
// 	return (dispatch) => {
// 		let req = requestOperation('MODIFY_TASK', {userId, id, entity})
// 		dispatch(req);
// 		return fetch(`../tasks/${id}`, {
// 			method: 'PUT',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'authorization': userId.toString()
// 			},
// 			body: JSON.stringify({task: entity})
// 		})
// 		.then((res) => {
// 			dispatch(responseFromServer(req, res.status))
// 			checkStatus(res, req)
// 			return res.json()
// 		})
// 		.then((json) => {dispatch(responseToRequest(req, json))})
// 		.catch((error) => console.log(error.message))
// 	}
// }
// export function completeTask(userId, id) {
// 	return (dispatch) => {
// 		let req = requestOperation('COMPLETE_TASK', {userId, id})
// 		dispatch(req);
// 		return fetch(`../tasks/${id}`, {
// 			method: 'PUT',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'authorization': userId.toString()
// 			},
// 			body: JSON.stringify({"status" : "DONE"})
// 		})
// 		.then((res) => {
// 			dispatch(responseFromServer(req, res.status))
// 			checkStatus(res, req)
// 			return res.json()	})
// 		.then((json) => {dispatch(responseToRequest(req, json))})
// 		.catch((error) => console.log(error))
// 	}
// }
//
// export function deleteTask(userId, id) {
// 	return (dispatch) => {
// 		let req = requestOperation('DELETE_TASK', {userId, id})
// 		dispatch(req)
// 		return fetch(`../tasks/${id}`, {
// 			method: 'DELETE',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'authorization': userId.toString()
// 			}
// 		})
// 		.then((res) => {
// 			dispatch(responseFromServer(req, res.status))
// 			checkStatus(res, req)
// 			})
// 		.then(()=> dispatch(responseToRequest(req)))
// 		.catch((error) => console.log(error.message))
// 	}
// }