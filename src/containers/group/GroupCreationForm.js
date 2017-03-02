import React from 'react'
import {createGroup} from '../../actions/GroupActions'
import {connect} from 'react-redux'


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
            <div>
                Create new group <br/>
                Name <input value={newGroupName} onChange={(e) => {this.onGroupNameChange(e)}}/>
                <button onClick={() => {this.onCreateGroupButtonClicked()}}>Create group</button>
            </div>
        )
    }
}

export default connect()(GroupCreationForm)