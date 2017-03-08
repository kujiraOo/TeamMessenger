import {
    SET_RECEIVED_SENT_FILTER,
    SET_RECIPIENT_GROUP_FILTER,
    SET_SENDER_GROUP_FILTER,
    SET_SENDER_FILTER
} from '../constants/ActionTypes'
import {
    RECIPIENT_GROUP_FILTER,
    SENDER_FILTER,
    SENDER_GROUP_FILTER,
    RECEIVED_SENT_FILTER
} from '../constants/taskFilterConstants'
import {combineReducers} from 'redux'

const initialTaskFilterState = {
	receivedSentFilter: 'RECEIVED',
	senderGroupFilter: 'ALL',
	recipientGroupFilter: 'ALL',
	senderFilter: SENDER_FILTER.ME
}

const tasks = (state = initialTaskFilterState, action) => {
	switch (action.type) {
		case SET_RECEIVED_SENT_FILTER:
			return {...state, receivedSentFilter: action.filterValue}
		case SET_SENDER_GROUP_FILTER:
            return {...state, senderGroupFilter: action.filterValue}
        case SET_RECIPIENT_GROUP_FILTER:
            return {...state, recipientGroupFilter: action.filterValue}
        case SET_SENDER_FILTER:
            return {...state, senderFilter: action.filterValue}
        default:
			return state
	}
}

const filters = combineReducers({tasks})
export default filters