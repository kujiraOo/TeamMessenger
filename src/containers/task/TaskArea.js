import React from 'react'
import {ListGroupItem, Panel} from 'react-bootstrap'
import TaskList from '../../components/TaskList'
import TaskDetailsPanel from '../../components/task/TaskDetailsPanel'
import TaskFilterPanel from '../../components/task/TaskFilterPanel'
import TaskCreationForm from './TaskCreationForm'
import {connect} from 'react-redux'
import actions from '../../actions/index'
import {
    RECIPIENT_GROUP_FILTER,
    SENDER_FILTER,
    SENDER_GROUP_FILTER,
    RECEIVED_SENT_FILTER
} from '../../constants/taskFilterConstants'
import _ from 'lodash'
class TaskArea extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTaskId: undefined,
            createNewTaskSelected: false,
            modifyTaskSelected: false,
        }
    }
    componentDidMount() {
        let {fetchTasks} = actions.taskActions
        let {dispatch} = this.props
        dispatch(fetchTasks())
    }

    selectTask(selectedTaskId) {
        this.setState({
            selectedTaskId,
            createNewTaskSelected: false,
            modifyTaskSelected: false
        })
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.tasks.byId!== nextProps.tasks.byId) this.setState({modifyTaskSelected: false});
    }
    requestTaskDetail() {
        let {dispatch} = this.props
        let {fetchTaskDetail} = actions.taskActions
        dispatch(fetchTaskDetail(this.state.id))
    }

    onCreateNewTaskSelected() {
        this.setState({
            createNewTaskSelected: true
        })
    }
    deleteTask() {
        alert("Task deletion invoked")
    }
    modifyTask() {
        this.setState({modifyTaskSelected: true})
    }
    render() {
        const {tasks, users, groups} = this.props
        const {selectedTaskId, createNewTaskSelected, modifyTaskSelected} = this.state
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
                        <ListGroupItem
                            onClick={() => {
                                this.onCreateNewTaskSelected()
                            }}>
                            New task
                        </ListGroupItem>
                    </div>
                    <br/>
                    <div className="row">
                        <TaskList list={tasks.byId} users={users} groups={groups} taskSelect={(id) => {
                            this.selectTask(id)
                        }}/>
                    </div>
                </div>
                <div className="col-sm-7">
                    {!createNewTaskSelected &&
                    <TaskDetailsPanel
                        entity={selectedTask} senderName={selectedTaskSenderName}
                        requestTaskDetail={() => {
                            this.requestTaskDetail
                        }}
                        deleteTask={()=> this.deleteTask()}
                        modifyTask={()=> this.modifyTask()}
                        control={this.props.filter}
                        />}
                    {(createNewTaskSelected || modifyTaskSelected) &&
                    <Panel>
                        <TaskCreationForm entity={tasks.byId[this.state.selectedTaskId]} mode={(createNewTaskSelected) ? 'create' : 'modify'}/>
                    </Panel>
                    }
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

    return {tasks, users, groups, filter: taskFilter}
}
export default connect(mapProp)(TaskArea)