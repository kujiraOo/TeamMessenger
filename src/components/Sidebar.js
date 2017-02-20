import React, {Component, PropTypes} from 'react'
import {Navbar,Nav, NavItem} from 'react-bootstrap'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {redirect} from '../actions/index'
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

		return (this.props.isHr) ? 
			(<Nav pullLeft={true} bsStyle="pills" stacked={true} onSelect={this.handleNavigation}>
				<NavItem eventKey="task">Task Viewer</NavItem>
				<NavItem eventKey="issue">Issue Viewer</NavItem>
				<NavItem eventKey="management">HR Management</NavItem>
			</Nav>
			) : (<Nav pullLeft={true} stacked={true} onSelect={this.handleNavigation}>
				<NavItem eventKey="task">Task Viewer</NavItem>
				<NavItem eventKey="issue">Issue Viewer</NavItem>
			</Nav>)
	}
}
const mapStateToProps = (state) => {
	return {
		isHr: state.userInfo.isHR
	}
}
export default connect(mapStateToProps)(Sidebar)