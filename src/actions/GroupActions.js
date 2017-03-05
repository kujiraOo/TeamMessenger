import * as types from '../constants/ActionTypes'
import {updateUsers} from './UserActions'
import 'whatwg-fetch'
import {normalize} from 'normalizr'
import {group as groupSchema} from '../api/schemas'
import {store} from '../Root'

function getLoggedInUserId() {
    return store.getState().authentication.loggedInUserId
}

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

export function updateGroups(groups) {
    return {
        type: types.UPDATE_GROUPS,
        groups
    }
}

export function fetchGroupItems() {

    return dispatch => {
        dispatch(fetchGroupItemsRequest())
        return fetch('/groups', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getLoggedInUserId()
            }
        })
            .then(res => res.json())
            .then(json => {
                const data = normalize(json, [groupSchema])
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

        return fetch(`/groups/${groupId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getLoggedInUserId()
            }
        })
            .then(res => res.json())
            .then(json => {
                const data = normalize(json, groupSchema)
                dispatch(updateGroups(data.entities.groups))
                dispatch(updateUsers(data.entities.users))
                dispatch(selectGroupDetails(groupId))
            })
            .catch(ex => dispatch(fetchGroupItemsFailure(ex)))
    }
}

export function modifyGroup(modifiedGroup) {

    return dispatch => {
        return fetch(`/groups/${modifiedGroup.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getLoggedInUserId()
            },
            body: JSON.stringify(modifiedGroup)

        })
            .then(() => {
                dispatch(displayGroupDetails(modifiedGroup.id))
            })
            .catch(ex => dispatch(fetchGroupItemsFailure(ex)))
    }
}

export function createGroup(groupName) {

    return dispatch => {
        return fetch(`/groups`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getLoggedInUserId()
            },
            body: JSON.stringify({name: groupName})
        })
            .then(res => res.json())
            .then(groupData => {
                const normalizedGroupData = normalize(groupData, groupSchema)
                dispatch(updateGroups(normalizedGroupData.entities.groups))
            })
    }
}