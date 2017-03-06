import React from 'react'
import style from '../css/general.css'
import {
    Panel, ListGroup, ListGroupItem
}
from 'react-bootstrap'
class Item extends React.Component {
	constructor(props) {
		super(props)
	}
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
/*	shouldComponentUpdate(nextProps, nextState) {
		return (nextProps.entries.length != this.props.entries.length);
	}
	componentWillUpdate(nextProps, nextState) {
		if (nextProps.entries!= this.props.entries) this.props.taskSelect(undefined);
	}*/
	render() {
		const {list, entries} = this.props
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

