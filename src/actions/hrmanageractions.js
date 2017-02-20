import 'whatwg-fetch'
import {requestOperation, responseFromServer, respondToRequest} from 'helper'
//group modification for hr actions
	//get groups info
/*function requestGroupsInfo() {
	return {
		type: 'REQUEST_GROUPS_INFO'
	}
}
function receivedGroupsInfo(data) {
	return {
		type: 'RECEIVE_GROUPS_INFO',
		payload: {
			data
		}
	}
}*/
export function fetchGroups(hruserid) {
	return (dispatch) => {
		let req = requestOperation('GROUPS', {hruserid})
		dispatch(req)
		fetch('.api/groups', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authorization': hruserid.toString()
			}})
		.then(res => {
			dispatch(responseFromServer(req, res.status))
			return res.json
		})
		.then(json => dispatch(respondToRequest(req, json)))
		.catch(err => console.log(err))
	}
}
	//get group detailed info
/*function requestGroupDetailedInfo(groupId) {
	return {
		type: 'REQUEST_GROUP_DETAIL',
		payload: {
			groupId
		}
	}
}
function receivedGroupDetailedInfo(data) {
	return {
		type: 'RECEIVE_GROUP_DETAIL',
		payload: {
			data
		}
	}
}*/
export function fetchGroupDetail(hruserid, groupId) {
	return (dispatch) => {
		let req = requestOperation('GROUP_DETAIL', {hruserid, groupId})
		dispatch(req)
		fetch(`.api/groups/${groupId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authorization': hruserid.toString()
			}})
		.then(res => {
			dispatch(responseFromServer(req, res.status))
			return res.json
		})
		.then(json => dispatch(respondToRequest(req, json)))
		.catch(err => console.log(err))
	}
}
	//creating new operations
/*function createGroup(groupName) {
	return {
		type: 'CREATE_GROUP',
		payload: {
			name: groupName
		}
	}
}*/

export function createGroup(hruserid, groupName) {
	return (dispatch) => {
		let req = requestOperation('CREATE_GROUP', {hruserid, groupName})
		dispatch(req)
		(dispatch(createGroup(groupInfo)))
		fetch(`./api/groups`, {
			method: 'POST',
			header: {
				'Content-Type' : 'application/json',
				'authorization' : hruserid.toString(),
				'group' : groupName
			}
		})
		.then(res => {
			dispatch(responseFromServer(req, res.status))
			return res.json
		})
		.then(json => dispatch(respondToRequest(req, json)))
		.catch(err => console.log(err))
}
/*function modifyGroup(modifiedGroup) {
	return {
		type: 'MODIFY_GROUP'
	}
}*
function addUserToGroup(groupId, ...userIds) {
	return {
		type: 'ADD_USER_TO_GROUP',
		payload: {
			groupId,
			users: userIds //this is an array
		}
	}
}
function removeUserFromGroup(groupId, ...userIds) {
	return {
		type: 'REMOVE_USER_FROM_GROUP',
		payload: {
			groupId,
			users: userIds
		}
	}
}*/
function modifyGroup(hruserid, groupId, group) {
	return (dispatch) => {
		let req = requestOperation('MODIFY_GROUP', {hruserid, groupId, change: group})
		dispatch(req)
		fetch(`./api/groups/${groupId}`, {
			method: 'PUT',
			header: {
				'Content-Type' : 'application/json',
				'authorization' : hruserid.toString()
			}
			body: JSON.Stringify(group)
		})
		.then(res => {dispatch(responseFromServer(req, res.status)); return res.json})
		.then(json => dispatch(respondToRequest(req, json)))
		.catch(err => console.log('Error while putting modified group to server'))
	}
} //any user
	//deleting operations
/*function deleteGroup(groupId) {
	return {
		type: 'DELETE_GROUP',
		payload: {
			groupId
		}
	}
}*/
export function deleteGroup(hruserid, groupId) {
	return (dispatch) => {
		let req = requestOperation('DELETE_GROUP', {hruserid, groupId})
		dispatch(req)
		fetch(`./api/groups/${groupId}`, {
			method: 'DELETE',
			header: {
				'Content-Type' : 'application/json',
				'authorization': hruserid.toString()
			}
		})
		.then(res => {dispatch(responseFromServer(req, res.status))})
		.catch(err=> console.log(`Error while deleting group ${groupId}`))
	}
}
	
//fetch user data
/*function requestUsersInfo() {
	return {
		type: 'REQUEST_USERS_INFO'
	}
}
function receivedUsersInfo(usersInfo) {
	return {
		type: 'RECEIVE_USER_INFO',
		payload: {
			users: usersInfo
		}
}*/
export function fetchUsers(hruserId) {
	return (dispatch) => {
		let req = requestOperation('USERS', {hruserId})
		dispatch(req)
		fetch(`./api/users`, {
			method: 'GET',
			header: {
				'authorization': hruserId.toString()
			}
		})
		.then(res => {dispatch(responseFromServer(req, res.status)); return res.json})
		.then(json => dispatch(respondToRequest(req, json)))
		.catch(err => console.log(err))
	}
}
	//detailed requests
/*function requestUserDetail(userId) {
	return {
		type: 'REQUEST_USER_DETAIL',
		payload: {
			userId
		}
	}
}
function receivedUserDetail(data) {
	return {
		type: 'RECEIVE_USER_DETAIL',
		payload: {
			data
		}
	}
}*/
export function fetchUserDetail(hruserid, userId) {
	return (dispatch) => {
		let req = requestOperation('USER_DETAIL', {hruserid, userId})
		dispatch(req)
		fetch(`./api/users/${userId}`, {
			method: 'GET',
			header: {
				'Content-Type' : 'application/json',
				'authorization' : hruserid.toString()
			}
		})
		.then(res => {dispatch(responseFromServer(req, res.status)); return res.json})
		.then(json => dispatch(respondToRequest(req, json)))
		.catch(err => console.log(err))
	}
}
//user modifications
	//add users
/*function createUser(userInfo) {
	return {
		type: 'CREATE_USER',
		payload: {
			userInfo
		}
	}
}*/
 function createUser(hruserId, user) {
 	return (dispatch) => {
 		let req = requestOperation('CREATE_USER', {hruserId, userInfo: user})
		dispatch(req)
 		fetch(`./api/users`, {
 			method: 'POST',
 			header: {
 				'Content-Type' : 'application/json',
 				'authorization': hruserId.toString()
 			},
 			body: JSON.Stringify(user)
 		})
 		.then(res => {dispatch(responseFromServer(req, res.status)); return res.json})
		.then(json => dispatch(respondToRequest(req, json)))
		.catch(err => console.log(err))
	}
 	}
 }
	//modify users
/*function modifyUser(userId, user) {
	return {
		type: 'MODIFY_USER',
		payload: modifiedUserInfo
	}
}*/ //userId can be both hrIDS or their own Ids. This allows future self-changing infos
export function modifyUser(hruserId, userId, user) {
	return (dispatch) => {
		let req = requestOperation('MODIFY_USER', {hruserId, change: user})
		dispatch(req)
		fetch(`./api/users/${userId}`, 
		{
 			method: 'PUT',
 			header: {
 				'Content-Type' : 'application/json',
 				'authorization': userId.toString()
 			},
 			body: JSON.Stringify(user)
 		})
 		.then(res => {dispatch(responseFromServer(req, res.status)); return res.json})
		.then(json => dispatch(respondToRequest(req, json)))
		.catch(err => console.log(err))
	}
}
	//ban users - user cannot be deleted unless the database admin decide to do so
/*function banUser(targetUserId) {
	return {
		type: 'BAN_USER',
		payload: {
			target: targetUserId
		}
	}
}*/ //@param userId: decision maker, can either be themselves or hrUser @param target: targeted userId
function banUser(hruserId, userId) {
	return (dispatch) => {
		let req = requestOperation('BAN_USER', {hruserId, userId})
		dispatch(req)
		fetch(`./api/users/${userId}`, {
			method: 'DELETE',
			header: {
 				'Content-Type' : 'application/json',
 				'authorization': hruserId.toString()
 			}
		})
		.then(res =>dispatch(responseFromServer(req, res.status)))
		.catch(err => console.log(err))
	}
}

