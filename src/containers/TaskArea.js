import React from 'react'
import TaskList from '../components/TaskList'
import TaskDetailsPanel from '../components/task/TaskDetailsPanel'
import TaskFilterPanel from '../components/task/TaskFilterPanel'
import {connect} from 'react-redux'
import actions from '../actions/index'
import style from '../css/general.css'
import _ from 'lodash'
class TaskArea extends React.Component {
	constructor(props) {
		super(props)
		this.state = {selectedTaskId: undefined}
	}

	componentDidMount() {
		let {fetchTasks} = actions.taskActions
		let {dispatch} = this.props
		dispatch(fetchTasks())
	}

	selectTask(selectedTaskId) {
		this.setState({selectedTaskId})
	}

	requestTaskDetail() {
		let {dispatch} = this.props
		let {fetchTaskDetail} = actions.taskActions
		dispatch(fetchTaskDetail(this.state.id))
	}

	render() {
        const {tasks, users} = this.props
	    const allIds = Object.keys(tasks.byId)
        const {selectedTaskId} = this.state
        const selectedTask = tasks.byId[selectedTaskId]

        let selectedTaskSender, selectedTaskSenderName
        if (selectedTask) {
            selectedTaskSender = users.byId[selectedTask.sender]
            selectedTaskSenderName = selectedTaskSender.firstName + ' ' + selectedTaskSender.lastName
        }

        return (
            <div className="row">
                <div className="col-sm-4 ">
                    <div className="row btnContainer">
                        <TaskFilterPanel/>
                    </div>
                    <div className="row">
                        <TaskList list={tasks.byId} users={users} taskSelect={(id) => {
                            this.selectTask(id)
                        }}/>
                    </div>
                </div>
                <div className="col-sm-7">
                    <TaskDetailsPanel entity={selectedTask} senderName={selectedTaskSenderName} requestTaskDetail={() => {
                        this.requestTaskDetail
                    }}/>
                </div>
            </div>
        )
	}
}
function receivedSentFilter(filterValue, userId, tasks) {
    switch (filterValue) {
        case 'SENT':
            return {
                byId: _.omitBy(tasks.byId, (task) => {
                    return _.includes(task.recipients, userId)
                })
            }
        case 'RECEIVED':
            return {
                byId: _.pickBy(tasks.byId, (task) => {
                    return _.includes(task.recipients, userId)
                })
            }
        default:
            return tasks
    }
}
const mapProp = (state) => {
	let taskData = state.tasks;
	let taskFilter = state.filters.tasks;
	const tasks = receivedSentFilter(taskFilter.receivedSentFilter, state.authentication.loggedInUserId, taskData)
    const users = state.users

	return {tasks, users}
}
export default connect(mapProp)(TaskArea)