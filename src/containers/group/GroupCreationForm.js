import React from 'react'
import {createGroup} from '../../actions/GroupActions'
import {connect} from 'react-redux'
import {Well, ControlLabel, FormControl, Button} from 'react-bootstrap'


class GroupCreationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            groupName: ''
        }
    }

    onGroupNameChange(e) {
        this.setState({groupName: e.target.value})
    }

    onCreateGroupButtonClicked() {
        const {dispatch} = this.props
        const {groupName} = this.state
        dispatch(createGroup(groupName))
    }

    render() {
        const {newGroupName} = this.state

        return (
            <Well>
                <h3>Create new group</h3>
                <ControlLabel>Group name</ControlLabel>
                <FormControl
                    value={newGroupName}
                    onChange={(e) => {this.onGroupNameChange(e)}}
                    placeholder="Enter group name"
                />
                <br/>
                <Button bsStyle="primary" onClick={() => {this.onCreateGroupButtonClicked()}}>Create group</Button>
            </Well>
        )
    }
}

export default connect()(GroupCreationForm)