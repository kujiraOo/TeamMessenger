import {combineReducers} from 'redux'
import '../actions/index.js'
import groups from './groups'
import users from './users'
import authentication from './loginReducer.js'
import tasks from './taskReducer'

const rootReducer = combineReducers({authentication, tasks, groups, users});

export default rootReducer
