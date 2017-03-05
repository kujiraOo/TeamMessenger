import {store} from '../Root.js' //not standard practise
import actions from '../actions/index'

export function automateLogin(username) {
console.log('***** Login automation is in effect ********\n********** Account used: hruser *********')
//begin dispatching action
store.dispatch(actions.loginActions.fetchLoginData({username: username}));
}