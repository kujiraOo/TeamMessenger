import fetch from 'isomorphic-fetch'
import {requestOperation, responseFromServer, responseToRequest, checkStatus} from './helper'
//tasks related actions
	//task retrieval actions
/*function requestTasks(userId) { //actually we dont need this shit
	return {
		type: 'REQUEST_TASKS',
		payload: {
			userId
		}
	}
}*/
/*function retrievedTasks(tasklist) { //action fired when server responded with task list for the user
	return {
		type: 'RECEIVE_TASKS',
		payload: tasklist
	}
}*/
export function fetchTasks(userId) { //thunk to call api to fetch task list
	return (dispatch) => {
		let req = requestOperation('TASKS', {userId})
		dispatch(req);
		return fetch('http://localhost:3000/api/tasks', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authorization': userId.toString()
			}})
		.then(res => {
			dispatch(responseFromServer(req, res.status))
			checkStatus(res, req)
			return res.json()})
		.then(json => dispatch(responseToRequest(req, json.body)))
		.catch(err => console.log(err))
	}
}
/*function requestTaskDetail(taskId) { //when the user click on a task more details of it should be retrieved
	return {
		type: 'REQUEST_TASK_DETAIL',
		payload: {
			taskId
		}
	}
}*/
/*function recievedTaskDetail(data) { //action fired when detailed info has been retrieved
	return {
		type: 'RECEIVE_TASK_DETAIL',
		payload: data
	}
}*/
export function fetchTaskDetail(id, userId) {
	return (dispatch) => {
		let req = requestOperation('TASK_DETAIL', {id, userId})
		dispatch(req)
		return fetch(`http://localhost:3000/api/tasks/${id}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authorization': userId.toString()
			}
		})
		.then((res)=>{
			dispatch(responseFromServer(req, res.status))
			checkStatus(res, req)
			return res.json()
		})
		.then((json)=> {dispatch(responseToRequest(req, json.body))})
		.catch(err => console.log(err))
	}
}
//task posting actions
/*function postTask(data) {
	return {
		type: 'POST_TASK',
		payload: data
	}
}*/ //action called to notify that a task is posted. 
export function postTask(userId, entity) {
	return (dispatch) => {
		let req = requestOperation('POST_TASK', {userId, entity})
		dispatch(req)
		return fetch('http://localhost:3000/api/tasks', {
			method: 'POST',
			header: {
				'Content-Type': 'application/json',
				'authorization' : userId.toString()
			},
			body: JSON.stringify({task: entity})
		})
		.then((res)=>{
			dispatch(responseFromServer(req, res.status))
			checkStatus(res, req)
			return res.json()
		})
		.then((json)=> {dispatch(responseToRequest(req, json.body))})
		.catch(err => console.log(err))
	}
} //thunk to actually post the task to server
	//task modification
/*function modifyTask(taskId, modifiedTask) {
	return {
		type: 'MODIFY_TASK',
		payload: {
			id: taskId,
			modifiedTask
		}
	}
} //action called to modify a task
*/
export function modifyTask(userId, id, entity) {
	return (dispatch) => {
		let req = requestOperation('MODIFY_TASK', {userId, id, entity})
		dispatch(req);
		return fetch(`http://localhost:3000/api/tasks/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'authorization': userId.toString()
			},
			body: JSON.stringify({task: entity})
		})
		.then((res) => {
			dispatch(responseFromServer(req, res.status))
			checkStatus(res, req)
			return res.json()	
		})
		.then((json) => {dispatch(responseToRequest(req, json.body))})
		.catch((error) => console.log(error.message))
	}
}
export function completeTask(userId, id) {
	return (dispatch) => {
		let req = requestOperation('COMPLETE_TASK', {userId, id})
		dispatch(req);
		return fetch(`http://localhost:3000/api/tasks/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'authorization': userId.toString()
			},
			body: JSON.stringify({"status" : "DONE"})
		})
		.then((res) => {
			dispatch(responseFromServer(req, res.status))
			checkStatus(res, req)
			return res.json()	})
		.then((json) => {dispatch(responseToRequest(req, json.body))})
		.catch((error) => console.log(error))
	}
}

	//delete task
/*function deleteTask(taskId) {
	return {
		type: 'DELETE_TASK',
		payload: {
			taskId
		}
	}
}*/
export function deleteTask(userId, id) {
	return (dispatch) => {
		let req = requestOperation('DELETE_TASK', {userId, id})
		dispatch(req)
		return fetch(`http://localhost:3000/api/tasks/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'authorization': userId.toString()
			}
		})
		.then((res) => {
			dispatch(responseFromServer(req, res.status))
			checkStatus(res, req)
			}) 
		.then(()=> dispatch(responseToRequest(req)))
		.catch((error) => console.log(error.message))
	}
}