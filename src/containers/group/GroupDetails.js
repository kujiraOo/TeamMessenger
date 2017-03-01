import React from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import {modifyGroup} from '../../actions/GroupActions'
import {fetchUserItems} from '../../actions/UserActions'
import ModalPopup from '../../components/shared/ModalPopup'
import ItemWithButtonList from '../../components/shared/ItemWithButtonList'


class GroupDetails extends React.Component {

    constructor(props) {
        super(props)

        this.state = {...props}
        this.props.dispatch(fetchUserItems())
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps})
    }

    removeUser(userId) {
        const dispatch = this.props.dispatch
        let group = this.state.group

        group = {...group, users: _.without(group.users, userId)}

        dispatch(modifyGroup(group))
    }

    addUser(userId) {
        const dispatch = this.props.dispatch
        let group = this.state.group

        group = {...group, users: _.union(group.users, [userId])}

        this.setState({isUserModalOpen: false})
        dispatch(modifyGroup(group))
    }

    addSubordinateGroup(groupId) {
        const dispatch = this.props.dispatch
        let group = this.state.group

        group = {...group, subordinateGroups: _.union(group.subordinateGroups, [groupId])}

        this.setState({isUserModalOpen: false})
        dispatch(modifyGroup(group))
    }

    removeSubordinateGroup(groupId) {
        const dispatch = this.props.dispatch
        let group = this.state.group

        group = {...group, subordinateGroups: _.without(group.subordinateGroups, groupId)}

        dispatch(modifyGroup(group))
    }

    changeManagerGroup(groupId) {
        const dispatch = this.props.dispatch
        let group = this.state.group

        group = {...group, managerGroup: groupId}

        dispatch(modifyGroup(group))
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
        const groupUserIds = this.state.group.users
        const users = this.state.users

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
        const group = this.state.group
        const managerGroup = this.state.groups[group.managerGroup]

        if (managerGroup) {
            return (
                <span>{managerGroup.name}</span>
            )
        }
    }

    renderSubordinateGroups() {
        const subordinateGroupIds = this.state.group.subordinateGroups
        const groups = this.state.groups

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
        const groups = this.state.groups
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
        const groups = this.state.groups
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
        const group = this.state.group

        return (
            <div>
                <h3>Group Details</h3>

                <ul>
                    <li>name: {group.name}</li>
                    <li>id: {group.id}</li>
                </ul>

                <h4>Users</h4>

                {this.renderGroupUserList()}

                <ModalPopup
                    openModalButtonText="Add user to group"
                    modalTitle="Add user to group"
                    renderBody={() => this.renderUsersToAddList()}
                />

                <h4>Manager Group</h4>

                {this.renderManagerGroup()}

                <ModalPopup
                    openModalButtonText="Change manager group"
                    modalTitle="Change manager group"
                    renderBody={() => this.renderManagerGroupCandidates()}
                />

                <h4>Subordinate Groups</h4>

                {this.renderSubordinateGroups()}

                <ModalPopup
                    openModalButtonText="Add subordinate group"
                    modalTitle="Add subordinate group"
                    renderBody={() => this.renderSubordinateGroupCandidates()}
                />
            </div>
        )
    }
}

const mapStatesToProps = state => ({
    group: state.groups.byId[state.groups.selectedGroupDetails],
    groups: state.groups.byId,
    users: state.users.byId
})

export default connect(mapStatesToProps)(GroupDetails)