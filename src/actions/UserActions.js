import * as types from '../constants/ActionTypes'
import 'whatwg-fetch'
import {normalize} from 'normalizr'
import {user as userSchema} from '../api/schemas'
import {updateGroups} from './GroupActions'
import {store} from '../Root'

function getLoggedInUserId() {
    return store.getState().authentication.loggedInUserId
}

export function updateUsers(users) {
    return {
        type: types.UPDATE_USERS,
        users
    }
}

export function selectUserDetails(userId) {
    return {
        type: types.SELECT_USER_DETAILS,
        userId
    }
}

export function fetchUserItems() {

    return dispatch => {
        // dispatch(fetchGroupItemsRequest())
        return fetch('/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getLoggedInUserId()
            }
        })
            .then(res => res.json())
            .then(json => {
                const data = normalize(json, [userSchema])
                dispatch(updateUsers(data.entities.users))
            })
            // .catch(ex => dispatch(fetchGroupItemsFailure(ex)))
            .catch(ex => {console.log(ex)})
    }
}

export function displayUserDetails(userId) {
    return dispatch => {

        // console.log(store.getState())
        return fetch(`/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getLoggedInUserId()
            }
        })
            .then(res => res.json())
            .then(json => {
                const data = normalize(json, userSchema)

                const {users, groups} = data.entities
                dispatch(updateUsers(users))
                if (groups) {
                    dispatch(updateGroups(groups))
                }
                dispatch(selectUserDetails(userId))
            })
            // .catch(ex => dispatch(fetchGroupItemsFailure(ex)))
    }
}

export function modifyUser(modifiedUser) {

    return dispatch => {
        return fetch(`/users/${modifiedUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getLoggedInUserId()
            },
            body: JSON.stringify(modifiedUser)

        })
            .then(() => {
                dispatch(displayUserDetails(modifiedUser.id))
            })
            // .catch(ex => dispatch(fetchGroupItemsFailure(ex)))
    }
}

export function createUser(userData) {

    return dispatch => {
        return fetch(`/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getLoggedInUserId()
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(userData => {
                const normalizedGroupData = normalize(userData, userSchema)
                dispatch(updateUsers(normalizedGroupData.entities.users))
            })
    }
}