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
import ManagementArea from './components/ManagementArea'
import GroupManagement from './containers/GroupManagement'

export const store = configureStore() //bad, we dont export store. But in this case we just export for automation

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
						<Route path="management" component={ManagementArea}></Route>
					</Route>
					{/*Route for testing stuff*/}
					<Route path="/playground" component={GroupManagement}>

					</Route>
				</Route>
			</Router>
			</Provider>)
	}
}

/* Automation script */
