import * as types from '../constants/ActionTypes'
import 'whatwg-fetch'
import {normalize} from 'normalizr'
import {user as userSchema} from '../api/shemas'

export function updateUsers(users) {
    return {
        type: types.UPDATE_USERS,
        users
    }
}

export function fetchUserItems() {

    return dispatch => {
        // dispatch(fetchGroupItemsRequest())
        return fetch('/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 1
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