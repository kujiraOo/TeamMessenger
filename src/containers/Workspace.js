import React from 'react'
import {connect} from 'react-redux'
import {redirect} from '../actions/helper'
import Sidebar from '../components/Sidebar.js'
import style from '../css/general.css'
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
			<div className="col-sm-12 col-md-2 col-lg-2 sidebar"><Sidebar/></div>
			<div className="col-sm-12 col-md-9 col-lg-9">{this.props.children}</div>
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