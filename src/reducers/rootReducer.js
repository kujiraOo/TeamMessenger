import {combineReducers} from 'redux'
import '../actions/index.js'

function authentication(state, action) {
	state = state || {
		isFetching: false, 
		responseFromServer: 0,
		loggedin: false
		} //default state
	switch(action.type) {
	case 'SEND_AUTHENTICATION_INFO': 
		return Object.assign({}, state, {
				isFetching: true
			})
	case 'SERVER_RESPONSE_TO_SEND_AUTHENTICATION_INFO': 
		return Object.assign({}, state, {
				isFetching: false, 
				responseFromServer: action.payload.response,
				loggedin: action.payload.response == 200
			})
	default: return state; //if nothing else leave state.authentication intact
}
}
function userInfo(state = {}, action) {
	switch(action.type) {
	case 'RECEIVE_USER_AUTH_DATA': return Object.assign({}, state, action.payload);
	default: return state; //if nothing else leave state.userInfo intact
}
}
function task(state = {}, action) {
	switch(action.type) {
		case 'REQUEST_TASKS' : return Object.assign({}, state, {isFetching: true})
		case 'TASKS_RETRIEVED': return Object.assgin({}, state, {isFetching: false, tasks: action.payload.tasklist})
		default: return state
	}
}
const rootReducer = combineReducers({authentication, userInfo});
export default rootReducer;