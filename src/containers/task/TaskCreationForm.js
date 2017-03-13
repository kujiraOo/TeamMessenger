import React from 'react'
import {
    ControlLabel, 
    FormControl, 
    Button, 
    Checkbox, 
    ListGroupItem, 
    FormGroup, 
    HelpBlock,
    Modal
} from 'react-bootstrap'
import moment from 'moment'
import {connect} from 'react-redux'
import {getSubordinateGroups} from '../../reducers/rootReducer'
import OptionsFilter from '../../components/shared/OptionsFilter'
import {displayGroupDetails} from '../../actions/GroupActions'
import {createTask} from '../../actions/TaskActions'
import _ from 'lodash'
import FontAwesome from 'react-fontawesome'
class TaskCreationForm extends React.Component {
    constructor(props) {
        super(props)
        if (props.mode=='modify')
            this.state = {
                isValid: true,
                showModal: false,
                description: props.entity.content,
                title: props.entity.title,
                recipientGroup: props.entity.recipientGroup,
                recipients: props.entity.recipients,
                deadline: moment(props.entity.deadline).format('YYYY-MM-DDThh:mm')
            }
        else
        this.state = {
            isValid: undefined,
            showModal: false,
            modalContent: '',
            description: '',
            title: '',
            senderGroup: null,
            recipients: [],
            recipientGroup: null,
            deadline: moment().format('YYYY-MM-DDThh:mm')
        }
    }
    validateForm() {
        let title = (this.state.title.length > 1)
        let date = (moment(this.state.deadline) > moment())
        let recipients = (this.state.recipients.length > 0)
        return (title && date && recipients)
    }
    close() {
        this.setState({showModal: false})
    }
    onSendTaskButtonClicked() {
        const {dispatch, groups, loggedInUserId} = this.props
        const recipientGroup = groups.byId[this.state.recipientGroup]
        if (!this.validateForm()) {
            console.log(this.validateForm())
            this.setState({modalContent: 'Operation failed. Please revise the information you provided and try again later', showModal: true})
            return;
        }
        if (this.props.mode == 'modify') {
            //call modify code here
            alert("Modify code called")
        }
        //else call create code
        dispatch(createTask({
            ...this.state,
            senderGroup: recipientGroup.managerGroup,
            sender: loggedInUserId,
            deadline: moment(this.state.deadline).format()
        }))
        this.setState({modalContent: 'Successfully created new task', showModal: true})
    }

    renderTextInput(label, key, value, type = 'text') { //why dont you use this with description field also?
        const placeHolder = 'Enter new ' + label.toLowerCase()

        return (
            <FormGroup validationState={(this.state.title < 1) ? "error" : null}>
                <ControlLabel>{label}</ControlLabel>
                <FormControl

                    type={type}
                    value={value}
                    placeholder={placeHolder}
                    onChange={e => this.setState({
                        [key]: e.target.value
                    })}
                />
              <FormControl.Feedback>
              <span><FontAwesome name='warning'/></span>
              </FormControl.Feedback>
            </FormGroup>
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

    renderRecipients() { //Recommending reusing the component that you used to show user list in ManagementArea
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
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header>
                        <Modal.Title>Create Task status</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <p>{this.state.modalContent}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.close()}>Close</Button>
                    </Modal.Footer>
                </Modal>
                {(this.props.mode == 'create') ? <h3>New task</h3> : <h3>Modify task</h3>}
                {this.renderTextInput('Title', 'title', title)}
                <br/>
                <FormGroup>
                    <ControlLabel>Description</ControlLabel>
                    <FormControl
                        componentClass="textarea"
                        value={description}
                        placeholder="Enter description for the task"
                        onChange={e => this.setState({
                            description: e.target.value
                        })}
                    />
                 
                </FormGroup>
                <br/>
                <FormGroup validationState={(moment(this.state.deadline) < moment()) ? 'error' : null}>
                <ControlLabel>Deadline</ControlLabel>
                <FormControl type="datetime-local" value={deadline} onChange={e => this.setState({
                    deadline: moment(e.target.value).format('YYYY-MM-DDThh:mm')
                })}/>
                </FormGroup>
                <br/>
                <br/>
                {(this.props.mode == 'modify') && <p>Status: {this.props.entity.status}</p>}
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