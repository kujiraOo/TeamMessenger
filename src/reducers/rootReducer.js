import {combineReducers} from 'redux'
import authentication from './loginReducer.js'
import tasks from './taskReducer'
import issues from './issueReducer'
import filters from './filterReducer'
const rootReducer = combineReducers({authentication, tasks, issues, filters});
export default rootReducer;