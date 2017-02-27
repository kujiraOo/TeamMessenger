import {combineReducers} from 'redux'
import '../actions/index.js'
import groups from './groups'
import authentication from './loginReducer.js'
import tasks from './taskReducer'

const rootReducer = combineReducers({authentication, tasks, groups});

export default rootReducer
