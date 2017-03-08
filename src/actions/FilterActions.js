import {
    SET_RECEIVED_SENT_FILTER,
    SET_RECIPIENT_GROUP_FILTER,
    SET_SENDER_GROUP_FILTER,
    SET_SENDER_FILTER
} from '../constants/ActionTypes'

export function setReceivedSentFilter(filterValue) {
    return {
        type: SET_RECEIVED_SENT_FILTER,
        filterValue
    }
}

export function setSenderGroupFilter(filterValue) {
    return {
        type: SET_SENDER_GROUP_FILTER,
        filterValue
    }
}

export function setSenderFilter(filterValue) {
    return {
        type: SET_SENDER_FILTER,
        filterValue
    }
}

export function setRecipientGroupFilter(filterValue) {
    return {
        type: SET_RECIPIENT_GROUP_FILTER,
        filterValue
    }
}