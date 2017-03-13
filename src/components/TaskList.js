import React from 'react'
import style from '../css/general.css'
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap'
import _ from 'lodash'
import FontAwesome from 'react-fontawesome'
import moment from 'moment'
function Item(props) {
    let {task, senderName, recipientNames, senderGroupName, recipientGroupName} = props

    return (
		<div className="item-in-list">
			<h4 className="text-left"><strong>{task.title}</strong></h4>
			<ul className="list-unstyled">
				<li><FontAwesome name="user" size="lg"/> {senderName}</li>
				<li><FontAwesome name="clock-o" size="lg"/> {moment(task.deadline).calendar()}</li>
			</ul>
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

