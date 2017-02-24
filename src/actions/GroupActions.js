import * as types from '../constants/ActionTypes'
import 'whatwg-fetch'

function fetchGroupItemsRequest() {
    return {
        type: types.FETCH_GROUP_ITEMS_REQUEST
    }
}

function fetchGroupItemsSuccess(body) {
    return {
        type: types.FETCH_GROUP_ITEMS_SUCCESS,
        body
    }
}

function fetchGroupItemsFailure(ex) {
    return {
        type: types.FETCH_GROUP_ITEMS_FAILURE,
        ex
    }
}

export function fetchGroupItems() {

    return dispatch => {
        dispatch(fetchGroupItemsRequest())
        return fetch('/api/groups', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 1
            }
        })
            .then(res => res.json())
            .then(json => dispatch(fetchGroupItemsSuccess(json.body)))
            .catch(ex => dispatch(fetchGroupItemsFailure(ex)))
    }
}

