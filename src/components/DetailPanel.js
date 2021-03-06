import React from 'react'
import {Well} from 'react-bootstrap'

export default class DetailPanel extends React.Component {
	constructor(props) {
		super(props)
	}
	componentWillUpdate(nextProps, nextState) {
		this.props.requestTaskDetail()
	}
	render() {
		const {entity, senderName} = this.props
		if (entity) {
			return (
					<Well>
						<h3>Detailed Task Information</h3>
						<h2>{entity.title}</h2>
						<p>From: {senderName}</p>
						<p>Due at: {entity.deadline}</p>
						<p>{entity.content}</p>
					</Well> )
		}
		else return (<h3>This will show you detailed information of your entity</h3>)
	}
}
