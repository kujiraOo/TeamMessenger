import React from 'react'
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap'
export default class TaskList extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
				<ListGroup>
					<ListGroupItem>Task 1</ListGroupItem>
					<ListGroupItem>Task 2</ListGroupItem>
				</ListGroup>
			)
	}
}