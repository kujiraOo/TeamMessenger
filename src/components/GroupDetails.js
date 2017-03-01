import React from 'react'
import {connect} from 'react-redux'
import ListItemWithButton from '../components/ListItemWithButton'
import _ from 'lodash'
import {modifyGroup} from '../actions/GroupActions'
import {fetchUserItems} from '../actions/UserActions'


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

        group = {...group, subordinateGroups: _.union(group.users, [groupId])}

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
        this.toggleChangeManagerGroupModal()
    }

    openAddUserModal() {
        this.setState({isUserModalOpen: true})
    }

    toggleAddSubordinateGroupModal() {
        this.setState({isSubordinateGroupModalOpen: !this.state.isSubordinateGroupModalOpen})
    }

    toggleChangeManagerGroupModal() {
        this.setState({isChangeManagerGroupModalOpen: !this.state.isChangeManagerGroupModalOpen})
    }

    renderUsersToAddList() {
        const users = this.props.users

        return (
            <ul>
                {Object.keys(users).map(userId => {
                        const user = users[userId]

                        return (
                            <ListItemWithButton key={userId}
                                                itemText={user.firstName + ' ' + user.lastName}
                                                buttonText="add"
                                                onButtonClick={() => {
                                                    this.addUser(userId)
                                                }}/>
                        )
                    }
                )}
            </ul>
        )

    }

    renderGroupUserList() {
        const userIds = this.state.group.users
        const users = this.state.users

        if (userIds) {
            return userIds.map(userId => {
                const user = users[userId]
                return (
                    <ul>
                        <ListItemWithButton key={userId}
                                            itemText={user.firstName + ' ' + user.lastName}
                                            buttonText="remove"
                                            onButtonClick={() => {
                                                this.removeUser(userId)
                                            }}/>
                    </ul>
                )
            })
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
            return subordinateGroupIds.map(groupId => {
                const group = groups[groupId]
                return (
                    <ul>
                        <ListItemWithButton key={groupId}
                                            itemText={group.name}
                                            buttonText="remove"
                                            onButtonClick={() => {
                                                this.removeSubordinateGroup(groupId)
                                            }}/>
                    </ul>
                )
            })
        }
    }

    renderSubordinateGroupCandidates() {
        const groups = this.state.groups

        return Object.keys(groups).map(groupId => {
            const group = groups[groupId]
            return (
                <ul>
                    <ListItemWithButton key={groupId}
                                        itemText={group.name}
                                        buttonText="add"
                                        onButtonClick={() => {
                                            this.addSubordinateGroup(groupId)
                                        }}/>
                </ul>
            )
        })
    }

    renderManagerGroupCandidates() {
        const groups = this.state.groups

        return Object.keys(groups).map(groupId => {
            const group = groups[groupId]
            return (
                <ul>
                    <ListItemWithButton key={groupId}
                                        itemText={group.name}
                                        buttonText="choose"
                                        onButtonClick={() => {
                                            this.changeManagerGroup(groupId)
                                        }}/>
                </ul>
            )
        })
    }

    render() {

        const group = this.state.group

        const isAddSubordinateGroupModalOpen = this.state.isSubordinateGroupModalOpen
        const isChangeManagerGroupModalOpen = this.state.isChangeManagerGroupModalOpen

        return (
            <div>
                <h3>Group Details</h3>

                <ul>
                    <li>name: {group.name}</li>
                    <li>id: {group.id}</li>
                </ul>

                <h4>Users</h4>

                {this.renderGroupUserList()}

                <button onClick={() => {
                    this.openAddUserModal()
                }}>Add user
                </button>

                {this.state.isUserModalOpen && <div>
                    <h3>Add user modal</h3>
                    {this.renderUsersToAddList()}
                </div>}

                <h4>Manager Group</h4>

                {this.renderManagerGroup()}

                <button onClick={() => {
                    this.toggleChangeManagerGroupModal()
                }}>Change manager group
                </button>

                {isChangeManagerGroupModalOpen && this.renderManagerGroupCandidates()}

                <h4>Subordinate Groups</h4>

                {this.renderSubordinateGroups()}

                <button onClick={() => {
                    this.toggleAddSubordinateGroupModal()
                }}>Add subordinate group
                </button>

                {isAddSubordinateGroupModalOpen && this.renderSubordinateGroupCandidates()}
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