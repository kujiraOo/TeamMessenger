import {combineReducers} from 'redux'
import '../actions/index.js'
import groups from './groups'
import users from './users'
import authentication from './loginReducer.js'
import tasks from './taskReducer'
import issues from './issueReducer'
import filters from './filterReducer'
import _ from 'lodash'

export function getLoggedInUser(state) {
    const {loggedInUserId} = state.authentication
    const loggedInUser = state.users.byId[loggedInUserId]
    return {...loggedInUser}
}

/**
 *
 * @param state
 * @param userId
 * @returns {{byId: object}} Collection of groups to which the specified user belongs
 */
export function getUserGroups(state, userId) {
    const {users, groups} = state
    const userGroupIds = users.byId[userId].groups
    return {byId: _.pick(groups.byId, userGroupIds)}
}

/**
 *
 * @param state
 * @param userId
 * @returns {{byId: object}} Collection of manager groups for specified user
 */
export function getManagerGroups(state, userId) {
    const {groups} = state
    const userGroups = getUserGroups(state, userId)
    const managerGroupIds = Object.values(userGroups.byId).map(group => group.managerGroup)
    return {byId: _.pick(groups.byId, managerGroupIds)}
}

const rootReducer = combineReducers({authentication, tasks, issues, filters, users, groups})
export default rootReducer