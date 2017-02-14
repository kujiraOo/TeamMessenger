import {store} from '../Root.js' //not standard practise
import * as actions from '../actions/actions'

export function automateLogin(username) {
console.log('***** Login automation is in effect ********\n********** Account used: hruser *********')
//begin dispatching action
store.dispatch(actions.fetchLoginData({username: username}));
}