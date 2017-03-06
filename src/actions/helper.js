import {browserHistory} from 'react-router'
//helpers
export function requestOperation(type, payload) {
	return {
		type: `REQUEST_${type}`,
		payload
	}
}
export function responseFromServer(action, status) { //action describing server sends response to authentication, optionally taking 1 additional arguments
	return {
		type: `SERVER_RESPONSE_TO_${action.type}`,
		payload: {
			response: status,
			extra: arguments[2]
		}
	}
}
export function responseToRequest(req, data) {
	return {
		type: `RECEIVE_${req.type}`,
		request: req.payload,
		payload: data
	}
}
//redirection action
function redirection(url) {
	return {
		type: 'REDIRECTION',
		payload: {
			to: url
		}
	}
}
export function redirect(url) {
	return (dispatch) => {
		dispatch(redirection(url));
		browserHistory.push(url);
	}
}

export function checkStatus(response) {
  	if (response.status >= 200 && response.status < 300) return
    var error = new Error(`Failed to access ${response.url}`)
    error.response = response
    throw error
}
export function resolved(request) {
	return {
		type: `RESOLVED_${request.type}`
	}
}