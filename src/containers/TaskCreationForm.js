import React from 'react'
import {ControlLabel, FormControl, Button, Checkbox, ListGroupItem} from 'react-bootstrap'
import moment from 'moment'
import {connect} from 'react-redux'
import {getSubordinateGroups} from '../reducers/rootReducer'
import OptionsFilter from '../components/shared/OptionsFilter'
import {displayGroupDetails} from '../actions/GroupActions'
import {createTask} from '../actions/TaskActions'
import _ from 'lodash'

class TaskCreationForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            description: '',
            title: '',
            senderGroup: null,
            recipients: [],
            recipientGroup: null,
            deadline: moment().format('YYYY-MM-DDThh:mm')
        }
    }

    onSendTaskButtonClicked() {
        const {dispatch, groups, loggedInUserId} = this.props
        const recipientGroup = groups.byId[this.state.recipientGroup]

        dispatch(createTask({
            ...this.state,
            senderGroup: recipientGroup.managerGroup,
            sender: loggedInUserId,
            deadline: moment(this.state.deadline).format()
        }))
    }

    renderTextInput(label, key, value, type = 'text') {
        const placeHolder = 'Enter new ' + label.toLowerCase()

        return (
            <div>
                <ControlLabel>{label}</ControlLabel>
                <FormControl
                    type={type}
                    value={value}
                    placeholder={placeHolder}
                    onChange={e => this.setState({
                        [key]: e.target.value
                    })}
                />
            </div>
        )
    }

    recipientGroupOptions() {
        const {subordinateGroups} = this.props

        return Object.values(subordinateGroups.byId).map(group => ({value: group.id, name: group.name}))
    }

    handleRecipientSelection(recipientId) {
        const {recipients} = this.state

        if (_.includes(recipients, recipientId)) {
            this.setState({
                recipients: _.pull(recipients, recipientId)
            })
        } else {
            this.setState({
                recipients: [...recipients, recipientId]
            })
        }
    }

    renderRecipients() {
        const recipientGroupId = this.state.recipientGroup

        if (!recipientGroupId) {
            return null
        }

        const {groups, users} = this.props
        const recipientCandidateIds = groups.byId[recipientGroupId].users

        if (recipientCandidateIds) {
            const recipients = _.pick(users.byId, recipientCandidateIds)

            return Object.values(recipients).map(recipient => {

                const {recipients} = this.state
                const active = _.includes(recipients, recipient.id)

                return (
                    <ListGroupItem key={recipient.id} active={active} onClick={() => {
                        this.handleRecipientSelection(recipient.id)
                    }}>
                        {recipient.firstName + ' ' + recipient.lastName}
                    </ListGroupItem>
                )
            })
        }
    }

    render() {
        const {title, description, deadline, recipientGroup} = this.state

        return (
            <div>
                <h3>New task</h3>
                {this.renderTextInput('Title', 'title', title)}
                <br/>

                <ControlLabel>Description</ControlLabel>
                <FormControl
                    componentClass="textarea"
                    value={description}
                    placeholder="Enter description for the task"
                    onChange={e => this.setState({
                        description: e.target.value
                    })}
                />
                <br/>

                <ControlLabel>Deadline</ControlLabel>
                <FormControl type="datetime-local" value={deadline} onChange={e => this.setState({
                    deadline: moment(e.target.value).format('YYYY-MM-DDThh:mm')
                })}/>
                <br/>
                <br/>

                <div className="row">
                    <OptionsFilter
                        label="Select group"
                        options={this.recipientGroupOptions()}
                        onChange={filterValue => {
                            const {dispatch} = this.props
                            filterValue = Number(filterValue)
                            dispatch(displayGroupDetails(filterValue))
                            this.setState({
                                recipientGroup: filterValue,
                                recipients: []
                            })
                        }}
                    />
                </div>

                <br/>

                <div className="row">
                    {recipientGroup && this.renderRecipients()}
                </div>


                <br/>
                <br/>
                <br/>

                <Button bsStyle="primary" onClick={() => {
                    this.onSendTaskButtonClicked()
                }}>Send task</Button>
            </div>
        )
    }
}

const mapStateToProp = (state) => {
    const {loggedInUserId} = state.authentication
    const {users, groups} = state

    return {
        loggedInUserId,
        subordinateGroups: getSubordinateGroups(state, loggedInUserId),
        users,
        groups
    }
}
export default connect(mapStateToProp)(TaskCreationForm)