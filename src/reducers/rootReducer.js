import {combineReducers} from 'redux'
import '../actions/index.js'
import groups from './groups'
import users from './users'
import authentication from './loginReducer.js'
import tasks from './taskReducer'
import issues from './issueReducer'
import filters from './filterReducer'

const rootReducer = combineReducers({authentication, tasks, issues, filters, users, groups})
export default rootReducer