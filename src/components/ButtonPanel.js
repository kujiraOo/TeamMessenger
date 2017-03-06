import React from 'react'
import {connect} from 'react-redux'
import {Button, ButtonGroup, DropdownButton, ButtonToolbar, MenuItem} from 'react-bootstrap'
import {viewBy} from '../actions/filterAction'
import style from '../css/general.css'

class ButtonPanel extends React.Component {
	constructor(props) {
		super(props)
	}
	setFilterBySource(flag) {
		let {dispatch} = this.props
		dispatch(viewBy(flag))
	}
	render() {
		let {bySource} = this.props
		return (
			<ButtonToolbar>
			<ButtonGroup>
				<Button className="customButton" active={(bySource == 'VIEW_SENT')} onClick={(flag) => {this.setFilterBySource('SENT')}}>Sent</Button>
				<Button className="customButton" active={(bySource == 'VIEW_RECEIVED')} onClick={(flag) => {this.setFilterBySource('RECEIVED')}}>Received</Button>
			</ButtonGroup>
			<ButtonGroup>
			<DropdownButton bsStyle="primary" title="Actions" id="undefined">
				<MenuItem eventKey="1">Create a task</MenuItem>
				<MenuItem eventKey="2">Edit this task</MenuItem>
				<MenuItem eventKey="3">Delete this task</MenuItem>
			</DropdownButton>
			</ButtonGroup>
			</ButtonToolbar>
			)
	}
}
const mapStateToProp = (state) => {
	return {
		bySource: state.filters.tasks.bySource
	}
}
export default connect(mapStateToProp)(ButtonPanel)