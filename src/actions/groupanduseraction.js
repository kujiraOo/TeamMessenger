import fetch from 'isomorphic-fetch'
import {requestOperation, responseFromServer, responseToRequest, checkStatus} from './helper'
import _ from 'lodash/array'
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

export function fetchGroups(userId) {
	return (dispatch) => {
		let req = requestOperation('GROUPS', {userId})
		dispatch(req)
		return fetch('http://localhost:3000/api/groups', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authorization': userId.toString()
			}})
		.then(res => {
			dispatch(responseFromServer(req, res.status))
			return res.json()
		})
		.then(json => dispatch(responseToRequest(req, json.body)))
		.catch(err => console.log(err))
	}
}
	//get group detailed info
/*function requestGroupDetailedInfo(id) {
	return {
		type: 'REQUEST_GROUP_DETAIL',
		payload: {
			id
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
export function fetchGroupDetail(userId, id) {
	return (dispatch) => {
		let req = requestOperation('GROUP_DETAIL', {userId, id})
		dispatch(req)
		return fetch(`http://localhost:3000/api/groups/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authorization': userId.toString()
			}})
		.then(res => {
			dispatch(responseFromServer(req, res.status))
			return res.json()
		})
		.then(json => dispatch(responseToRequest(req, json.body)))
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

export function createGroup(userId, entity) {
	return (dispatch) => {
		let req = requestOperation('CREATE_GROUP', {userId, entity})
		dispatch(req)
		return fetch(`http://localhost:3000/api/groups`, {
			method: 'POST',
			header: {
				'Content-Type' : 'application/json',
				'authorization' : userId.toString(),
			},
			body: JSON.stringify({group: entity})
		})
		.then(res => {
			dispatch(responseFromServer(req, res.status))
			checkStatus(res, req)
			return res.json()
		})
		.then(
			(json) => {dispatch(responseToRequest(req, json.body))}
		)
		.catch(err => console.log(err))
	}
}
/*function modifyGroup(modifiedGroup) {
	return {
		type: 'MODIFY_GROUP'
	}
}*
function addUserToGroup(id, ...userIds) {
	return {
		type: 'ADD_USER_TO_GROUP',
		payload: {
			id,
			users: userIds //this is an array
		}
	}
}
function removeUserFromGroup(id, ...userIds) {
	return {
		type: 'REMOVE_USER_FROM_GROUP',
		payload: {
			id,
			users: userIds
		}
	}
}*/
/*const diff = (arr1 = [], arr2 = []) => { 
	let bigger, smaller
	if (arr1.length > arr2.length) {bigger = arr1; smaller = arr2}
	else {bigger = arr2; smaller = arr1}
	return bigger.filter( (i) => { return smaller.indexOf(i) < 0 } ) 
}*/
export function modifyGroup(userId, id, entity) {
	return (dispatch, getState) => {
		let req = requestOperation('MODIFY_GROUP', {userId, id, entity})
		dispatch(req)
		return fetch(`http://localhost:3000/api/groups/${id}`, {
			method: 'PUT',
			header: {
				'Content-Type' : 'application/json',
				'authorization' : userId.toString()
			},
			body: JSON.stringify({group: entity})
		})
		.then(res => {dispatch(responseFromServer(req, res.status)); checkStatus(res, req); return res.json()})
		.then(
			(json) => {dispatch(responseToRequest(req, json.body))
			//if members are removed or added to the group, we should refetch information of those users, because their 'groups' field has changed
			//also because the modified group has links to super groups and children groups, these information should be reflected in the user corresponseing
			//change also.
			//===> Refetch these users' data!
			/*let it = getState().entities.groups.byId.id
			let users = diff(entity.users, it.users)
			let groups = diff([...entity.subGroups, ...entity.superGroups], [...it.superGroups, ...it.subGroups])
			groups.forEach((group) => {users = _.uniq([...users, ...group.users])})
			if (users.length!==0) users.forEach((user) => fetchUserDetail(userId, user))*/
			}
		)
		.catch(err => console.log('Error while putting modified group to server'))
	}
} //any user
	//deleting operations
/*function deleteGroup(id) {
	return {
		type: 'DELETE_GROUP',
		payload: {
			id
		}
	}
}*/
export function deleteGroup(userId, id) {
	return (dispatch, getState) => {
		let req = requestOperation('DELETE_GROUP', {userId, id})
		dispatch(req)
		return fetch(`http://localhost:3000/api/groups/${id}`, {
			method: 'DELETE',
			header: {
				'Content-Type' : 'application/json',
				'authorization': userId.toString()
			}
		})
		.then(
			(res) => {dispatch(responseFromServer(req, res.status))
			checkStatus(res, req)
			}
		)
		.then(()=> //similar check like the check in modifyingGroup.
			//this one is similar to deleting all members inside it
			//and severing links to its super groups and child groups
			//users in super groups or children groups should be refetched to update the disappearence of this group in their data
			//=> refetch members within the group (1), members in the super group (2), and members in the children groups (3)
			{
			/*let it = getState().entities.groups.byId.id
			let ownmembers = it.users;
			ownmembers.forEach((user) => fetchUserDetail(userId, user)) // (1)
			let connectedGroupMembers = _.uniq([...it.subGroups, ...it.superGroups])
			connectedGroupMembers.forEach((user)=> fetchUserDetail(userId, user)) //(2) (3) */
			dispatch(responseToRequest(req)) //at this point we wont be able to query the group anymore
			}
		)
		.catch(err=> console.log(`Error while deleting group ${id}`))
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
export function fetchUsers(userId) {
	return (dispatch) => {
		let req = requestOperation('USERS', {userId})
		dispatch(req)
		return fetch(`http://localhost:3000/api/users`, {
			method: 'GET',
			header: {
				'authorization': userId.toString()
			}
		})
		.then(res => {dispatch(responseFromServer(req, res.status)); return res.json()})
		.then(json => dispatch(responseToRequest(req, json.body)))
		.catch(err => console.log(err))
	}
}
	//detailed requests
/*function requestUserDetail(id) {
	return {
		type: 'REQUEST_USER_DETAIL',
		payload: {
			id
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
export function fetchUserDetail(userId, id) {
	return (dispatch) => {
		let req = requestOperation('USER_DETAIL', {userId, id})
		dispatch(req)
		return fetch(`http://localhost:3000/api/users/${id}`, {
			method: 'GET',
			header: {
				'Content-Type' : 'application/json',
				'authorization' : userId.toString()
			}
		})
		.then(res => {
			dispatch(responseFromServer(req, res.status));
			checkStatus(res, req) 
			return res.json()
		})
		.then(json => dispatch(responseToRequest(req, json.body)))
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
export function createUser(userId, entity) {
 	return (dispatch) => {
 		let req = requestOperation('CREATE_USER', {userId, entity})
		dispatch(req)
 		return fetch(`http://localhost:3000/api/users`, {
 			method: 'POST',
 			header: {
 				'Content-Type' : 'application/json',
 				'authorization': userId.toString()
 			},
 			body: JSON.stringify({user: entity})
 		})
 		.then(res => {dispatch(responseFromServer(req, res.status)); 
 			checkStatus(res, req) 
 			return res.json()})
		.then(json => {
			dispatch(responseToRequest(req, json.body))
			//again, new user leads to groups info change. Thus causing refetching
			//#tobeimplemented
		})
		.catch(err => console.log(err))
	}
 }
	//modify users
/*function modifyUser(id, user) {
	return {
		type: 'MODIFY_USER',
		payload: modifiedUserInfo
	}
}*/ //id can be both hrIDS or their own Ids. This allows future self-changing infos
export function modifyUser(userId, id, entity) {
	return (dispatch) => {
		let req = requestOperation('MODIFY_USER', {userId, entity, id})
		dispatch(req)
		return fetch(`http://localhost:3000/api/users/${id}`, 
		{
 			method: 'PUT',
 			header: {
 				'Content-Type' : 'application/json',
 				'authorization': id.toString()
 			},
 			body: JSON.stringify({user: entity})
 		})
 		.then(res => {
 			dispatch(responseFromServer(req, res.status)); 
 			checkStatus(res, req) 
 			return res.json()})
		.then(json => {dispatch(responseToRequest(req, json.body))
			//changed group in the user leads to different group info
			//#tobeimplemented
		})
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
}*/ //@param id: decision maker, can either be themselves or hrUser @param target: targeted id
export function banUser(userId, id) {
	return (dispatch) => {
		let req = requestOperation('DELETE_USER', {userId, id})
		dispatch(req)
		return fetch(`http://localhost:3000/api/users/${id}`, {
			method: 'DELETE',
			header: {
 				'Content-Type' : 'application/json',
 				'authorization': userId.toString()
 			}
		})
		.then(res => {dispatch(responseFromServer(req, res.status))
			checkStatus(res, req)
			//users deleted changing his or her presence in the corresponseing groups
			//#tobeimplemented
		})
		.then(()=>{
			dispatch(responseToRequest(req))})
		.catch(err => console.log(err))
	}
}

