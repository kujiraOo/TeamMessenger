import React from 'react'
import {connect} from 'react-redux'
import {redirect} from '../actions/helper'
import Sidebar from '../components/Sidebar.js'

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
			<div className="col-sm-2"><Sidebar/></div>
			<div className="col-sm-10">{this.props.children}</div>
			</div>
		</div>)
	}
}

const mapStatesToProps = (state) => ({loggedin: state.authentication.loggedin, firstName: state.authentication.firstName, lastName: state.authentication.lastName})
export default connect(mapStatesToProps)(Workspace)