import * as types from '../constants/ActionTypes'
import 'whatwg-fetch'
import {schema, normalize} from 'normalizr'

const groupSchema = new schema.Entity('groups')

function fetchGroupItemsRequest() {
    return {
        type: types.FETCH_GROUP_ITEMS_REQUEST
    }
}


function fetchGroupItemsSuccess(groups) {
    return {
        type: types.FETCH_GROUP_ITEMS_SUCCESS,
        groups
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
            .then(json => {
                const data = normalize(json.groups, [groupSchema])
                dispatch(fetchGroupItemsSuccess(data.entities.groups))
            })
            .catch(ex => dispatch(fetchGroupItemsFailure(ex)))
    }
}

