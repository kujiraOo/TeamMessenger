import React, {PropTypes} from 'react'
import {Provider} from 'react-redux'
import configureStore from './configureStore.js'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import App from './components/App.js'
import IndexPage from './components/IndexPage.js'
import LoginForm from './components/LoginForm.js'

const store = configureStore()

export default class Root extends React.Component {
	render() {
		return (
			<Provider store={store}>
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={IndexPage}></IndexRoute>
					<Route path="/login" component={LoginForm}></Route>
					
				</Route>
			</Router>
			</Provider>)
	}
}
