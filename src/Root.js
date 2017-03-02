/* eslint-disable */

import React, {PropTypes} from 'react'
import {Provider} from 'react-redux'
import configureStore from './configureStore.js'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import App from './components/App.js'
import IndexPage from './components/IndexPage.js'
import LoginForm from './components/LoginForm.js'
import WorkSpace from './containers/Workspace.js'
import TaskArea from './components/TaskArea'
import IssueArea from './components/IssueArea'
import GroupManagementArea from './containers/group/GroupManagementArea'
import UserManagementArea from './containers/user/UserManagementArea'

//bad, we dont export store. But in this case we just export for automation
//also needed as a temporary solution for authorization
//set state only for dev purposes, default state is commented out bellow
// export const store = configureStore({
//     authentication: {
//         "id": 1,
//         "userName": "hruser",
//         "lastName": "Chen",
//         "firstName": "Bob",
//         "subGroups": [],
//         "groups": [],
//         "superGroups": [],
//         "isHR": true,
//         loggedin: true
//     }
// })

export const store = configureStore()

export default class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path="/" component={App}>
                        <IndexRoute component={IndexPage}></IndexRoute>
                        <Route path="/login" component={LoginForm}></Route>
                        <Route path="/workspace" component={WorkSpace}>
                            <Route path="task" component={TaskArea}></Route>
                            <Route path="issue" component={IssueArea}></Route>
                            <Route path="group-management" component={GroupManagementArea}></Route>
                            <Route path="user-management" component={UserManagementArea}></Route>
                        </Route>
                    </Route>
                </Router>
            </Provider>)
    }
}

/* Automation script */
import {automateLogin} from './automatescript/automateLogin'
//automateLogin("hruser");
