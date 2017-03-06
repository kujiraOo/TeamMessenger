import React from 'react'
import TaskList from '../components/TaskList'
import DetailPanel from '../components/DetailPanel'
import ButtonPanel from '../components/ButtonPanel'
import {connect} from 'react-redux'
import actions from '../actions/index'
import style from '../css/general.css'
import _ from 'lodash'
class TaskArea extends React.Component {
	constructor(props) {
		super(props)
		this.state = {id: undefined}
	}
	componentDidMount() {
		let {fetchTasks} = actions.taskActions
		let {dispatch, userId} = this.props
		dispatch(fetchTasks(userId))
	}
	componentWillUnmount() {}
	selectTask(id) {
		if (!id) return
		this.setState({id})
	}
	requestTaskDetail() {
		let {dispatch, userId} = this.props
		let {fetchTaskDetail} = actions.taskActions
		dispatch(fetchTaskDetail(this.state.id, userId))
	}
	render() {
		return (
		<div className="row">
				<h1>There is {this.props.tasks.allIds.length} items. Current id is: {this.state.id || "undefined"}</h1>
				<div className="col-sm-4 ">
				<div className="row btnContainer">
					<ButtonPanel id={this.state.id}  />
				</div>
				<div className="row">
					<TaskList list={this.props.tasks.byId} entries={this.props.tasks.allIds} taskSelect={(id) => {this.selectTask(id)}}/>
				</div>
				</div>
				<div className="col-sm-7"><DetailPanel entity={this.props.tasks.byId[this.state.id]} requestTaskDetail={()=> {this.requestTaskDetail}}></DetailPanel></div>
		</div>
		)
	}
}
function filterTaskBySource(flag, sourceId, data) {
	if (flag == 'VIEW_SENT') {
		let byId =  _.omitBy(_.mapValues(data.byId, (entity) => {
			if (entity.sender.id == sourceId) return entity;
		 	else return undefined 
		 }), _.isUndefined)
		let allIds = _.map(_.keys(byId), _.toNumber)
		return {
			byId,
			allIds
		}
	}
	if (flag == 'VIEW_RECEIVED') {
		let byId =  _.omitBy(_.mapValues(data.byId, (entity)=> {
			let match
			_.each(entity.recipients, (target) => {match = (target.id == sourceId) || match})
			console.log(entity)
			return (match) ? entity : undefined
		})
		, _.isUndefined)
		let allIds = _.map(_.keys(byId), _.toNumber)
		return {
			byId,
			allIds
		}
	}
	return data
}
const mapProp = (state) => {
	let taskData = state.tasks;
	let taskFilter = state.filters.tasks;
	return {
	tasks: filterTaskBySource(taskFilter.bySource, state.authentication.loggedInUserId, taskData),
	userId: state.authentication.loggedInUserId
    }
}
export default connect(mapProp)(TaskArea)