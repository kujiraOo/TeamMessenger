import {viewBy} from '../actions/filterAction'
import {combineReducers} from 'redux'
import {updateObject, createReducer} from './helper'
const updateState = (state, action) => {
	if (state.bySource == action.type) //TOGGLE OFF
		return updateObject(state, {bySource: 'VIEW_ALL'})
	else return updateObject(state, {bySource: action.type})
}
const initialState = {bySource: "VIEW_ALL"}
const tasks = createReducer(initialState, {
	'VIEW_SENT': updateState,
	'VIEW_RECEIVED': updateState,
	'VIEW_ALL': updateState,
})
const filters = combineReducers({tasks})
export default filters