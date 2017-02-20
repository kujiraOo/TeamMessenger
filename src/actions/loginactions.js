import 'whatwg-fetch'
import {redirect} from 'helper'
//login actions
 function sendAuthenticationInfo(loginInfo) { //action decribing user hitting enter
	return {
		type: 'SEND_AUTHENTICATION_INFO',
		payload: {
			username: loginInfo.username,
			//password: loginInfo.password
		}
	}
}

 function receivedAuthenticationData(data) { //action describing server sends data about user after authentication is completed
	return {
		type: 'RECEIVE_USER_AUTH_DATA',
		payload: data
	}
}

export function fetchLoginData(loginInfo) { //action when dispatched will also call apis
	return (dispatch)=> {
		let req = sendAuthenticationInfo(loginInfo)
		dispatch(req)
		return fetch('http://localhost:3000/api/auth', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authorization': loginInfo.username
			}
		})
		.then((response )=>{
			dispatch(responseFromServer(req, response.status))
			return response.json()})
		.then((json) => {
			dispatch(receivedAuthenticationData(json))
			dispatch(redirect('/workspace'))
		})
		.catch((error) => {console.log('There was a problem fetching user data')});
	}
}