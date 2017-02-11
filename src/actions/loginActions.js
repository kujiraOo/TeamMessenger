import 'whatwg-fetch'

export function sendAuthenticationInfo(loginInfo) { //action decribing user hitting enter
	return {
		type: 'SEND_AUTHENTICATION_INFO',
		payload: {
			username: loginInfo.username,
			//password: loginInfo.password
		}
	}
}
export function receiveAuthenticationInfo(status) { //action describing server sends response to authentication
	return {
		type: 'RECIEVE_AUTHENTICATION_INFO',
		payload: {
			response: status
		}
	}
}
export function receivedAuthenticationData(data) { //action describing server sends data about user after authentication is completed
	return {
		type: 'RECEIVE_USER_AUTH_DATA',
		payload: data
	}
}
export function fetchLoginData(loginInfo) { //action when dispatched will also call apis
	return (dispatch)=> {
		dispatch(sendAuthenticationInfo(loginInfo))
		return fetch('./api/auth', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'authorization': loginInfo.username
			}
		}).then((response )=>{return response.json()}).then((json) => {
			dispatch(receiveAuthenticationInfo('200'));
			dispatch(receivedAuthenticationData(json));
		}).catch((error) => {dispatch(receiveAuthenticationInfo('404')); console.log('There was a problem fetching user data')});
	}
}
