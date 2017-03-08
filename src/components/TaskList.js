import React from 'react'
import style from '../css/general.css'
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap'
import _ from 'lodash'

function Item(props) {
    let {task, senderName, recipientNames, senderGroupName, recipientGroupName} = props

    return (
		<div>
			<p>{task.title}</p>
			<p>{senderName} > {recipientNames}</p>
			<p>{senderGroupName} > {recipientGroupName}</p>
			<p>Deadline: {task.deadline}</p>
		</div>
    )
}

function personName(person) {
    return person.firstName + ' ' + person.lastName
}

export default class TaskList extends React.Component {
	constructor(props) {
		super(props)
	}

	recipientNames(task) {
		const {users} = this.props
		const recipients = _.pick(users.byId, task.recipients)
		const recipientList = Object.values(recipients)
		return recipientList.map(recipient => (personName(recipient)) + ', ')
	}

	render() {
		const {list, users, groups} = this.props
		const items = Object.keys(list).map((id) => {
			const task = list[id]
			const sender = users.byId[task.sender]
			const senderName = personName(sender)
			const recipientNames = this.recipientNames(task)
			const senderGroupName = groups.byId[task.senderGroup].name
			const recipientGroupName = groups.byId[task.recipientGroup].name

			return (
				<ListGroupItem key={id} onClick={() => this.props.taskSelect(id)}>
					<Item
						task={task}
						id={id}
						senderName={senderName}
						recipientNames={recipientNames}
						senderGroupName={senderGroupName}
						recipientGroupName={recipientGroupName}
					/>
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

