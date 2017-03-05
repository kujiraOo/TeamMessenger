import fetch from 'isomorphic-fetch'
import {requestOperation, responseFromServer, responseToRequest, checkStatus} from './helper'

/*function requestIssues(userId, groupId) {
	return {
		type: 'REQUEST_ISSUES',
		payload: {
			userId,
			groupId
		}
	}
} //request an array of issues available to the user
function retrievedIssues(issueList) {
	return {
		type: 'ISSUES_RETRIEVED',
		payload: {
			issueList
		}
	}
}*/ //recieved issue lists
export function fetchIssues(userId) {
	return (dispatch) => {
		let req = requestOperation('ISSUES', {userId})
		dispatch(req)
		return fetch('http://localhost:3000/api/issues', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authorization': userId.toString()
			}})
		.then(res => {
			dispatch(responseFromServer(req, res.status))
			checkStatus(res, req)
			return res.json()
		})
		.then(json => dispatch(responseToRequest(req, json.body)))
		.catch(err => console.log(err))
	}
}
/*function requestDetailedIssue(id) {
	return {
		type: 'REQUEST_ISSUE_DETAIL',
		payload: {
			id
		}
	}
}*/
/*function receivedDetailedIssue(data) {
	return {
		type: 'RECEIEVE_ISSUE_DETAIL',
		payload: {
			data
		}
	}
}*/
export function fetchIssueDetail(userId, id) {
	return (dispatch) => {
		let req = requestOperation('ISSUE_DETAIL', {userId, id})
		dispatch(req)
		return fetch(`http://localhost:3000/api/issues/${id}`, {
			header: {
				'Content-Type' : 'application/json',
				'authorization' : userId.toString()
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
	//issues creation actions
/*function postIssue(issue) {
	return {
		type: 'CREATE_ISSUE',
		payload: {
		 	issue
		}
	}
}*/
export function postIssue(userId, entity) {
	return (dispatch) => {
		let req = requestOperation('CREATE_ISSUE', {userId, entity})
		dispatch(req)
		return fetch('http://localhost:3000/api/issues', {
			method: 'POST',
			header: {
				'Content-Type': 'application/json',
				'authorization' : userId.toString
			},
			body: JSON.stringify({issue: entity})
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
	//issue modification actions
/*function modifyIssue(id, modifiedIssue) {
	return {
		type: 'MODIFY_ISSUE',
		payload: {
			id: id,
			data: modifiedIssue
		}
	}
}*/
export function modifyIssue(userId, id, entity) {
	return (dispatch) => {
		let req = requestOperation('MODIFY_ISSUE', {userId, entity, id})
		dispatch(req)
		return fetch(`http://localhost:3000/api/issues/${id}`, {
			method: 'PUT',
			header: {
				'Content-Type' : 'application/json',
				'authorization' : userId.toString()
			},
			body: JSON.stringify({issue: entity})
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
	//update issue status actions (based on modify issue)
/*function handleIssue(userId, id) {
	return {
		type: 'HANDLE_ISSUE',
		payload: {
			userId,
			id
		}
	}
}*///handleIssue
export function handleIssue(userId, id) {
	return (dispatch) => {
		let req = requestOperation('HANDLE_ISSUE', {userId, id})
		dispatch(req)
		return fetch(`http://localhost:3000/api/issues/${id}`, {
			method: 'PUT',
			header: {
				'Content-Type' : 'application/json',
				'authorization' : userId.toString()
			},
			body: {"status" : "HANDLED"}
		})
		.then((res)=>{
			dispatch(responseFromServer(req, res.status))
			checkStatus(res, req)
			return res.json()
		})
		.then((json)=> {dispatch(responseToRequest(req, json.body))})
		.catch(err => console.log(err))
	}
} //handleIssue
	//delete issue
/*function deleteIssue(userId, id) {
	return {
		type: 'DELETE_ISSUE',
		payload: {
			userId,
			id
		}
	}
}*/

export function deleteIssue(userId, id) {
	return (dispatch) => {
		let req = requestOperation('DELETE_ISSUE', {userId, id})
		dispatch(req)
		return fetch(`http://localhost:3000/api/issues/${id}`, {
			method: 'DELETE',
			header: {
				'Content-Type' : 'application/json',
				'authorization' : userId.toString
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
