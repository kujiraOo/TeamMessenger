import {browserHistory} from 'react-router'
//helpers
export function requestOperation(type, payload) {
	return {
		type: `REQUEST_${type}`,
		payload
	}
}
export function responseFromServer(action, status) { //action describing server sends response to authentication
	return {
		type: `SERVER_RESPONSE_TO_${action.type}`,
		payload: {
			response: status
		}
	}
}
export function responseToRequest(req, data) {
	return {
		type: `RECEIVE_${req.type}`,
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