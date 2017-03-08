import React from 'react'
import TaskList from '../components/TaskList'
import TaskDetailsPanel from '../components/task/TaskDetailsPanel'
import TaskFilterPanel from '../components/task/TaskFilterPanel'
import {connect} from 'react-redux'
import actions from '../actions/index'
import {
    RECIPIENT_GROUP_FILTER,
    SENDER_FILTER,
    SENDER_GROUP_FILTER,
    RECEIVED_SENT_FILTER
} from '../constants/taskFilterConstants'
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
        const {tasks, users, groups} = this.props
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
                        <TaskList list={tasks.byId} users={users} groups={groups} taskSelect={(id) => {
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
function applyReceivedSentFilter(filterValue, userId, tasks) {
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
function applySenderGroupFilter(tasks, filterValue) {
    if (!filterValue || filterValue === SENDER_GROUP_FILTER.ALL) {
        return tasks
    } else {
        return {
            byId: _.pickBy(tasks.byId, (task => (task.senderGroup === filterValue)))
        }
    }
}

function applySenderFilter(tasks, filterValue, senderId) {
    switch (filterValue) {
        case SENDER_FILTER.ME:
            return {
                byId: _.pickBy(tasks.byId, task => (task.sender === senderId))
            }
        case SENDER_FILTER.OTHERS:
            return {
                byId: _.pickBy(tasks.byId, task => (task.sender !== senderId))
            }
        default:
            return tasks
    }
}

function applyRecipientGroupFilter(tasks, filterValue) {
    if (!filterValue || filterValue === RECIPIENT_GROUP_FILTER.ALL) {
        return tasks
    } else {
        return {
            byId: _.pickBy(tasks.byId, (task => (task.recipientGroup === filterValue)))
        }
    }
}

const mapProp = (state) => {
    const {users, groups} = state
    const {loggedInUserId} = state.authentication

	let taskData = state.tasks
	let taskFilter = state.filters.tasks
	let tasks = applyReceivedSentFilter(taskFilter.receivedSentFilter, loggedInUserId, taskData)

    switch (taskFilter.receivedSentFilter) {
        case RECEIVED_SENT_FILTER.RECEIVED:
            tasks = applySenderGroupFilter(tasks, taskFilter.senderGroupFilter)
            break
        case RECEIVED_SENT_FILTER.SENT:
            tasks = applyRecipientGroupFilter(tasks, taskFilter.recipientGroupFilter)
            tasks = applySenderFilter(tasks, taskFilter.senderFilter, loggedInUserId)
            break
    }

	return {tasks, users, groups}
}
export default connect(mapProp)(TaskArea)