import 'whatwg-fetch'
import {requestOperation, responseFromServer, respondToRequest} from 'helper'
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
		fetch(`./api/tasks`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authorization': userId.toString()
			}})
		.then(res => {dispatch(responseFromServer(req, res.status));
			return res.json})
		.then(json => dispatch(responseToRequest(req, json)))
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
export function fetchTaskDetail(taskId, userId) {
	return (dispatch) => {
		let req = requestOperation('TASK_DETAIL', {taskId, userId})
		dispatch(req)
		fetch(`./api/tasks/${taskId}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authorization': userId.toString()
			}}
		})
		.then((res)=>{
			dispatch(responseFromServer(req, res.status));
			return res.json})
		.then((json)=> {dispatch(responseToRequest(req, json))})
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
export function postTask(userId, task) {
	return (dispatch) => {
		let req = requestOperation('POST_TASK', {userId, task})
		dispatch(req)
		fetch('./api/tasks', {
			method: 'POST',
			header: {
				'Content-Type': 'application/json',
				'authorization' : userId
			},
			body: JSON.Stringify(task)
		})
		.then(res => {
			dispatch(responseFromServer(req, res.status))
			return res.json
		})
		.then(json => dispatch(responseToRequest(req, json)))
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
export function modifyTask(userId, taskId, task) {
	return (dispatch) => {
		let req = requestOperation('MODIFY_TASK', {userId, taskId, change: task})
		dispatch(req);
		fetch(`./api/tasks/${taskId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'authorization': userId.toString()
			},
			body: JSON.Stringify(task)
		})
		.then((res) => {dispatch(responseFromServer(req, res.status)); return res.json})
		.then((json) => {dispatch(responseToRequest(req, json))})
		.catch((error) => console.log('Error while putting modified task to server: ' + error))
	}
}
export function completeTask(userId, taskId) {
	return (dispatch) => {
		let req = requestOperation('COMPLETE_TASK', {userId, taskId})
		dispatch(req);
		fetch(`./api/tasks/${taskId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'authorization': userId.toString()
			},
			body: JSON.Stringify({"status" : "DONE"})
		})
		.then((res) => {dispatch(responseFromServer(req, res.status)); return res.json})
		.then((json) => {dispatch(responseToRequest(req, json))})
		.catch((error) => console.log('Error while putting completed task to server: ' + error))
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
function deleteTask(taskId, userId) {
	return (dispatch) => {
		let req = requestOperation('DELETE_TASK', {userId, taskId})
		dispatch(deleteTask(taskId))
		fetch(`./api/tasks/${taskId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'authorization': userId.toString()
			}
		})
		.then((res) => {dispatch(responseFromServer(req, res.status))}) //reducer will use this code to deal with task appropriately
		.catch((error) => console.log(`Error while requesting task ${taskId} to server: ` + error))
	}
}