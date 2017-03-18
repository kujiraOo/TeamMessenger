import {get} from '../api/fetch'
import {redirect} from './helper'
import * as types from '../constants/ActionTypes'
import {updateUsers} from './UserActions'
import {updateGroups} from './GroupActions'
import {normalize} from 'normalizr'
import {user as userSchema} from '../api/schemas'

function fetchAuthRequest(loginData) {
    return {
        type: types.FETCH_AUTH_REQUEST,
        loginData
    }
}

function fetchAuthSuccess(statusCode) {
    return {
        type: types.FETCH_AUTH_SUCCESS,
        statusCode
    }
}

function fetchAuthFailure(statusCode) {
    return {
        type: types.FETCH_AUTH_FAILURE,
        statusCode
    }
}

function receiveAuth(loggedInUserId) {
    return {
        type: types.RECEIVE_AUTH,
        loggedInUserId
    }
}

export function fetchLoginData(loginData) { //action when dispatched will also call apis
    return (dispatch)=> {
        dispatch(fetchAuthRequest(loginData))

        return get('/auth', {auth: loginData.username})
            .then((response )=>{
                dispatch(fetchAuthSuccess(response.status))
                return response.json()})
            .then((authData) => {
                dispatch(receiveAuth(authData.id))

                const normalizedData = normalize(authData, userSchema)
                const {users, groups} = normalizedData.entities
                dispatch(updateUsers(users))

                if (groups) {
                    dispatch(updateGroups(groups))
                }

                dispatch(redirect('/workspace'))
            })
            .catch((error) => {
                dispatch(fetchAuthFailure(error.response.status))
            });
    }
}