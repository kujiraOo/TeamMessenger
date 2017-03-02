import React, {Component, PropTypes} from 'react'
import {Navbar,Nav, NavItem} from 'react-bootstrap'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {redirect} from '../actions/helper'
import {HR_USER} from '../constants/UserTypes'

class Sidebar extends Component{
	constructor(props) {
		super(props)
		this.handleNavigation = this.handleNavigation.bind(this)
	}
	handleNavigation(key) {
		let path = '/' + 'workspace' + '/' + key
		this.props.dispatch(redirect(path))
	}
	render() {

		return (this.props.userStatus === HR_USER) ?
			(<Nav pullLeft={true} bsStyle="pills" stacked={true} onSelect={this.handleNavigation}>
				<NavItem eventKey="task">Task Viewer</NavItem>
				<NavItem eventKey="issue">Issue Viewer</NavItem>
				<NavItem eventKey="group-management">Group Management</NavItem>
				<NavItem eventKey="user-management">User Management</NavItem>
			</Nav>
			) : (<Nav pullLeft={true} stacked={true} onSelect={this.handleNavigation}>
				<NavItem eventKey="task">Task Viewer</NavItem>
				<NavItem eventKey="issue">Issue Viewer</NavItem>
			</Nav>)
	}
}
const mapStateToProps = (state) => {
	return {
		userStatus: state.authentication.status
	}
}
export default connect(mapStateToProps)(Sidebar)