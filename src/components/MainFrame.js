import React, {Component, PropTypes} from 'react'
import Sidebar from './Sidebar'
export default class MainFrame extends Component {
	render() {
		let {handleNavigation} = this.props
		return (
			<div className="row">
			<div className="col-sm-2"><Sidebar/></div>
			<div className="col-sm-4">This is the listings</div>
			<div className="col-sm-6">This is the space for detailed info</div>
			</div>
			)
	}
}