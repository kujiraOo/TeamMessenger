import {store} from '../Root.js' //not standard practise
import {fetchLoginData} from '../actions/LoginActions'

export function automateLogin(username) {
    console.log('***** Login automation is in effect ********\n********** Account used: ' + username + ' *********')
//begin dispatching action
    store.dispatch(fetchLoginData({username: username}));
}