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

    openAddUserModal() {
        const {dispatch} = this.props
        this.setState({isUserModalOpen: true})
        dispatch(fetchUserItems())
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

                <button onClick={() => {
                    this.openAddUserModal()
                }}>Add user
                </button>

                {this.state.isUserModalOpen && <div>
                    <h3>Add user modal</h3>
                    {this.renderUsersToAddList()}
                </div>}
            </div>
        )
    }
}

const mapStatesToProps = state => ({
    group: state.groups.byId[state.groups.selectedGroupDetails],
    users: state.users.byId
})

export default connect(mapStatesToProps)(GroupDetails)