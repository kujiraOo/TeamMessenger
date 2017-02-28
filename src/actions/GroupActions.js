import * as types from '../constants/ActionTypes'
import 'whatwg-fetch'
import {normalize} from 'normalizr'
import {group as groupSchema} from '../api/shemas'

function fetchGroupItemsRequest() {
    return {
        type: types.FETCH_GROUP_ITEMS_REQUEST
    }
}

function fetchGroupItemsSuccess() {
    return {
        type: types.FETCH_GROUP_ITEMS_SUCCESS,
    }
}

function fetchGroupItemsFailure(ex) {
    return {
        type: types.FETCH_GROUP_ITEMS_FAILURE,
        ex
    }
}

function fetchGroupDetailsRequest() {
    return {
        type: types.FETCH_GROUP_DETAILS_REQUEST
    }
}

function updateGroups(groups) {
    return {
        type: types.UPDATE_GROUPS,
        groups
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
                dispatch(updateGroups(data.entities.groups))
            })
            .catch(ex => dispatch(fetchGroupItemsFailure(ex)))
    }
}

export function filterGroupsByName(filterValue) {
    return {
        type: types.SET_GROUPS_BY_NAME_FILTER,
        filterValue
    }
}

export function selectGroupDetails(groupId) {
    return {
        type: types.SELECT_GROUP_DETAILS,
        groupId
    }
}

export function displayGroupDetails(groupId) {
    return dispatch => {
        dispatch(fetchGroupDetailsRequest())
        return fetch(`/api/groups/${groupId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 1
            }
        })
            .then(res => res.json())
            .then(json => {
                const data = normalize(json, groupSchema)
                dispatch(updateGroups(data.entities.groups))
                dispatch(selectGroupDetails(groupId))
            })
            .catch(ex => dispatch(fetchGroupItemsFailure(ex)))
    }
}