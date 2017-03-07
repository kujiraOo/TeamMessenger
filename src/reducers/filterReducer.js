import {combineReducers} from 'redux'

const initialTaskFilterState = {
	receivedSentFilter: 'RECEIVED'
}

const tasks = (state = initialTaskFilterState, action) => {
	switch (action.type) {
		case 'SET_RECEIVED_SENT_FILTER':
			return {...state, receivedSentFilter: action.filterValue}
		default:
			return state
	}
}

const filters = combineReducers({tasks})
export default filters