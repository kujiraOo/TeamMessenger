import React from 'react'
import style from '../css/general.css'
import {
    Panel, ListGroup, ListGroupItem
}
from 'react-bootstrap'

function Item(props) {
    let {task, senderName} = props

    return (
		<div>
			<p>{task.title}</p>
			<p>From: {senderName}</p>
			<p>Deadline: {task.deadline}</p>
		</div>
    )
}

export default class TaskList extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {list, users} = this.props
		const items = Object.keys(list).map((id) => {
			const task = list[id]
			const user = users.byId[task.sender]
			const senderName = user.firstName + ' ' + user.lastName
			return (
				<ListGroupItem key={id} onClick={() => this.props.taskSelect(id)}>
					<Item task={task} id={id} senderName={senderName}/>
				</ListGroupItem>
            )
		})
		return (
			<div>
				<ListGroup>
				{items}
				</ListGroup>
			</div>
		)
	}
}

