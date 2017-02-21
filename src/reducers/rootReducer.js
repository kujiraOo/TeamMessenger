import {combineReducers} from 'redux'
import authentication from './loginReducer.js'
import tasks from './taskReducer'
const rootReducer = combineReducers({authentication, tasks});
export default rootReducer;