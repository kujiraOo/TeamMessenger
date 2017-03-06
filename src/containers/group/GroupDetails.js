import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import {modifyGroup} from '../../actions/GroupActions'
import {fetchUserItems} from '../../actions/UserActions'
import ModalPopup from '../../components/shared/ModalPopup'
import ItemWithButtonList from '../../components/shared/ItemWithButtonList'
import {Well, FormControl, ControlLabel, Button, ListGroupItem} from 'react-bootstrap'

class GroupDetails extends React.Component {

    constructor(props) {
        super(props)

        this.state = {...props.group}
        this.props.dispatch(fetchUserItems())
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps.group})
    }

    removeUser(userId) {
        const dispatch = this.props.dispatch
        const {users} = this.state
        const group = {...this.state, users: _.without(users, userId)}

        dispatch(modifyGroup(group))
    }

    addUser(userId) {
        const dispatch = this.props.dispatch
        const groupData = {...this.state, users: _.union(this.state.users, [userId])}

        dispatch(modifyGroup(groupData))
    }

    addSubordinateGroup(groupId) {
        const dispatch = this.props.dispatch
        const groupData = {...this.state, subordinateGroups: _.union(this.state.subordinateGroups, [groupId])}

        dispatch(modifyGroup(groupData))
    }

    removeSubordinateGroup(groupId) {
        const dispatch = this.props.dispatch
        const groupData = {...this.state, subordinateGroups: _.without(this.state.subordinateGroups, groupId)}

        dispatch(modifyGroup(groupData))
    }

    changeManagerGroup(managerGroupId) {
        const dispatch = this.props.dispatch
        const groupData = {...this.state, managerGroup: managerGroupId}

        dispatch(modifyGroup(groupData))
    }

    userListItem(user) {
        return {
            id: user.id,
            name: user.firstName + ' ' + user.lastName
        }
    }

    renderUsersToAddList() {
        const users = this.props.users
        const userList = Object.values(users).map(user => this.userListItem(user))

        return (
            <ItemWithButtonList
                itemList={userList}
                buttonText="add"
                onItemButtonClick={(userId) => {
                    this.addUser(userId)
                }}
            />
        )
    }

    renderGroupUserList() {
        const groupUserIds = this.state.users
        const {users} = this.props

        if (groupUserIds) {
            const groupUsers = groupUserIds.map(userId => this.userListItem(users[userId]))

            return (
                <ItemWithButtonList
                    itemList={groupUsers}
                    buttonText="remove"
                    onItemButtonClick={(userId) => {
                        this.removeUser(userId)
                    }}
                />
            )
        }
    }

    renderManagerGroup() {
        const managerGroup = this.props.groups[this.state.managerGroup]

        if (managerGroup) {
            return (
                <ListGroupItem>{managerGroup.name}</ListGroupItem>
            )
        }
    }

    renderSubordinateGroups() {
        const subordinateGroupIds = this.state.subordinateGroups
        const groups = this.props.groups

        if (subordinateGroupIds) {
            const subordinateGroupList = subordinateGroupIds.map(subordinateGroupId => groups[subordinateGroupId])

            return (
                <ItemWithButtonList
                    itemList={subordinateGroupList}
                    buttonText="remove"
                    onItemButtonClick={(groupId) => {
                        this.removeSubordinateGroup(groupId)
                    }}
                />
            )
        }
    }

    renderSubordinateGroupCandidates() {
        const groups = this.props.groups
        const groupList = Object.values(groups)

        return (
            <ItemWithButtonList
                itemList={groupList}
                buttonText="add"
                onItemButtonClick={(groupId) => {
                    this.addSubordinateGroup(groupId)
                }}
            />
        )
    }

    renderManagerGroupCandidates() {
        const groups = this.props.groups
        const groupList = Object.values(groups)

        return (
            <ItemWithButtonList
                itemList={groupList}
                buttonText="choose"
                onItemButtonClick={(groupId) => {
                    this.changeManagerGroup(groupId)
                }}
            />
        )
    }

    render() {
        const {id, name} = this.state

        return (
            <Well>
                <h3>{name} {id}</h3>

                <h4>Users</h4>
                {this.renderGroupUserList()}
                <ModalPopup
                    openModalButtonText="Add user to group"
                    modalTitle="Add user to group"
                    renderBody={() => this.renderUsersToAddList()}
                />
                <br/>

                <h4>Manager Group</h4>
                {this.renderManagerGroup()}
                <br/>
                <ModalPopup
                    openModalButtonText="Change manager group"
                    modalTitle="Change manager group"
                    renderBody={() => this.renderManagerGroupCandidates()}
                />
                <br/>

                <h4>Subordinate Groups</h4>

                {this.renderSubordinateGroups()}

                <ModalPopup
                    openModalButtonText="Add subordinate group"
                    modalTitle="Add subordinate group"
                    renderBody={() => this.renderSubordinateGroupCandidates()}
                />
            </Well>
        )
    }
}

const mapStatesToProps = state => ({
    group: state.groups.byId[state.groups.selectedGroupDetails],
    groups: state.groups.byId,
    users: state.users.byId
})

export default connect(mapStatesToProps)(GroupDetails)