import React from 'react'
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap'
class Item extends React.Component {
	render() {
		let {data} = this.props
		let name = data.sender.firstName + ' ' + data.sender.lastName
		return (
			<div>
				<p>{data.title}</p>
				<p>From: {name}</p>
				<p>Deadline: {data.deadline}</p>
			</div>
			)
	}
}
export default class TaskList extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		console.log('TESTING TASK LIST')
		const {list} = this.props
		console.log(list)
		console.log(this.props.items)
		const items = this.props.entries.map((id) => {
			let entity = list[id]
			return (<ListGroupItem key={id} onClick={()=> this.props.taskSelect(id)}>
				<Item data={entity} id={id}/>
			</ListGroupItem>)
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
