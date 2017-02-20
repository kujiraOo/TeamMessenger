import 'whatwg-fetch'
import {requestOperation, responseFromServer, responseToRequest} from './helper'

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
export function fetchIssues(userId, groupId) {
	return (dispatch) => {
		let req = requestOperation('ISSUES', {userId, groupId})
		dispatch(req)
		fetch('.api/issues', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authorization': userId.toString()
			}})
		.then(res => {
			dispatch(responseFromServer(req, res.status))
			return res.json
		})
		.then(json => dispatch(responseToRequest(req, json)))
		.catch(err => console.log(err))
	}
}
/*function requestDetailedIssue(issueId) {
	return {
		type: 'REQUEST_ISSUE_DETAIL',
		payload: {
			issueId
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
export function fetchIssueDetail(issueId, userId) {
	return (dispatch) => {
		let req = requestOperation('ISSUE_DETAIL', {userId, issueId})
		dispatch(req)
		fetch(`./api/issues/${issueId}`, {
			header: {
				'Content-Type' : 'application/json',
				'authorization' : userId.toString()
			}
		})
		.then((res) => {dispatch(responseFromServer(req, res.status))})
		.then(json => {dispatch(responseToRequest(req, json))})
		.catch(err => {console.log(`Error while fetching issue ${issueId}`)})
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
export function postIssue(userId, issue) {
	return (dispatch) => {
		let req = requestOperation('CREATE_ISSUE', {userId, issue})
		dispatch(req)
		fetch('./api/issues', {
			method: 'POST',
			header: {
				'Content-Type': 'application/json',
				'authorization' : userId.toString
			},
			body: JSON.Stringify(issue)
		})
		.then((res) => {dispatch(responseFromServer(req, res.status)); return res.json})
		.then((json) => {dispatch(responseToRequest(req, json))})
		.catch(err => {console.log(`Error while posting new issue to server`)})
	}
}
	//issue modification actions
/*function modifyIssue(issueId, modifiedIssue) {
	return {
		type: 'MODIFY_ISSUE',
		payload: {
			id: issueId,
			data: modifiedIssue
		}
	}
}*/
export function modifyIssue(userId, issueId, issue) {
	return (dispatch) => {
		let req = requestOperation('MODIFY_ISSUE', {userId, change: issue, issueId})
		dispatch(req)
		fetch(`./api/issues/${issueId}`, {
			method: 'PUT',
			header: {
				'Content-Type' : 'application/json',
				'authorization' : userId.toString()
			},
			body: JSON.Stringify(issue)
		})
		.then((res) => {dispatch(responseFromServer(req, res.status)); return res.json})
		.then(json => dispatch(responseToRequest(req, json)))
		.catch(err => console.log(`Error while trying to modify issue ${issueId} to server`))
	}
}
	//update issue status actions (based on modify issue)
/*function handleIssue(userId, issueId) {
	return {
		type: 'HANDLE_ISSUE',
		payload: {
			userId,
			issueId
		}
	}
}*///handleIssue
export function handleIssue(userId, issueId) {
	return (dispatch) => {
		let req = requestOperation('HANDLE_ISSUE', {userId, issueId})
		dispatch(req)
		fetch(`./api/issues/${issueId}`, {
			method: 'PUT',
			header: {
				'Content-Type' : 'application/json',
				'authorization' : userId.toString()
			},
			body: {"status" : "HANDLED"}
		})
		.then((res) => {dispatch(responseFromServer(req, res.status)); return res.json})
		.then(json => dispatch(responseToRequest(req, json)))
		.catch(err => console.log(`Error while trying to handle issue ${issueId} to server`))
	}
} //handleIssue
	//delete issue
/*function deleteIssue(userId, issueId) {
	return {
		type: 'DELETE_ISSUE',
		payload: {
			userId,
			issueId
		}
	}
}*/

export function deleteIssue(userId, issueId) {
	return (dispatch) => {
		let req = requestOperation('DELETE_ISSUE', {userId, issueId})
		dispatch(req)
		fetch(`./api/issues/${issueId}`, {
			method: 'DELETE',
			header: {
				'Content-Type' : 'application/json',
				'authorization' : userId.toString
			}
		})
		.then(res => {dispatch(responseFromServer(req, res.status))})
		.catch(err => console.log(`Error trying to delete issue ${issueId}`))
	}
}
