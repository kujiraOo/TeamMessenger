import React from 'react'
import {connect} from 'react-redux'
import {redirect} from '../actions/helper'
import Sidebar from '../components/Sidebar.js'
import {getLoggedInUser} from '../reducers/rootReducer'

class Workspace extends React.Component{
	constructor(props) {
		super(props)
	}
	componentWillMount() {
		const {loggedin} = this.props
		if (!loggedin) this.redirectToLoginPage()
	}
	redirectToLoginPage() {
		this.props.dispatch(redirect('/login'))
	}

	render() {
		const {firstName, lastName} = this.props
		return (<div>
			<h1>Welcome, {firstName} {lastName}</h1>
			<div className="row">
			<div className="col-sm-1"><Sidebar/></div>
			<div className="col-sm-11">{this.props.children}</div>
			</div>
		</div>)
	}
}

const mapStatesToProps = (state) => {
    const {loggedin} = state.authentication
    const {firstName, lastName} = getLoggedInUser(state)

    return {
        loggedin,
        firstName,
        lastName
    }
}
export default connect(mapStatesToProps)(Workspace)