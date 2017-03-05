import fetch from 'isomorphic-fetch'
import {requestOperation, responseFromServer, responseToRequest, checkStatus} from './helper'

export function fetchTasks(userId) { //thunk to call api to fetch task list
	return (dispatch) => {
		let req = requestOperation('TASKS', {userId})
		dispatch(req);
		return fetch('../tasks', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authorization': userId
			}})
		.then(res => {
			dispatch(responseFromServer(req, res.status))
			checkStatus(res, req)
			return res.json()})
		.then(json => dispatch(responseToRequest(req, json)))
		.catch(err => console.log(err))
	}
}

export function fetchTaskDetail(id, userId) {
	return (dispatch) => {
		let req = requestOperation('TASK_DETAIL', {id, userId})
		dispatch(req)
		return fetch(`../tasks/${id}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authorization': userId
			}
		})
		.then((res)=>{
			dispatch(responseFromServer(req, res.status))
			checkStatus(res, req)
			return res.json()
		})
		.then((json)=> {dispatch(responseToRequest(req, json))})
		.catch(err => console.log(err))
	}
}

export function postTask(userId, entity) {
	return (dispatch) => {
		let req = requestOperation('POST_TASK', {userId, entity})
		dispatch(req)
		return fetch('../tasks', {
			method: 'POST',
			header: {
				'Content-Type': 'application/json',
				'authorization' : userId
			},
			body: JSON.stringify({task: entity})
		})
		.then((res)=>{
			dispatch(responseFromServer(req, res.status))
			checkStatus(res, req)
			return res.json()
		})
		.then((json)=> {dispatch(responseToRequest(req, json))})
		.catch(err => console.log(err))
	}
} 
export function modifyTask(userId, id, entity) {
	return (dispatch) => {
		let req = requestOperation('MODIFY_TASK', {userId, id, entity})
		dispatch(req);
		return fetch(`../tasks/${id}`, {
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
		.then((json) => {dispatch(responseToRequest(req, json))})
		.catch((error) => console.log(error.message))
	}
}
export function completeTask(userId, id) {
	return (dispatch) => {
		let req = requestOperation('COMPLETE_TASK', {userId, id})
		dispatch(req);
		return fetch(`../tasks/${id}`, {
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
		.then((json) => {dispatch(responseToRequest(req, json))})
		.catch((error) => console.log(error))
	}
}

export function deleteTask(userId, id) {
	return (dispatch) => {
		let req = requestOperation('DELETE_TASK', {userId, id})
		dispatch(req)
		return fetch(`../tasks/${id}`, {
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