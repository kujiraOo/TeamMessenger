import React from 'react'
import {connect} from 'react-redux'
import {fetchUserItems, displayUserDetails, selectUserDetails} from '../../actions/UserActions'
import ClickableItemList from '../../components/shared/ClickableItemList'
import UserDetails from './UserDetails'
import UserCreationForm from './UserCreationForm'

class UserManagement extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedCreateNewUser: false,
            userByNameFilterValue: ''
        }

        const {dispatch} = this.props
        dispatch(fetchUserItems())
    }

    visibleUsers() {
        const {users} = this.props
        const {userByNameFilterValue} = this.state
        const result = []

        if (users) {
            Object.values(users).map(user => {
                if (user.firstName.includes(userByNameFilterValue) ||
                    user.lastName.includes(userByNameFilterValue)) result.push({
                    name: user.firstName + ' ' + user.lastName,
                    id: user.id
                })
            })
        }

        return result
    }

    updateUserByNameFilter(e) {
        this.setState({
            userByNameFilterValue: e.target.value
        })
    }

    onUserItemSelected(userId) {
        const {dispatch} = this.props
        dispatch(displayUserDetails(userId))
        this.setState({selectedCreateNewUser: false})
    }

    onCreateNewUserSelected(e) {
        e.preventDefault()
        const {dispatch} = this.props
        dispatch(selectUserDetails(null))
        this.setState({selectedCreateNewUser: true})
    }

    render() {
        const {selectedUserDetails} = this.props
        const {selectedCreateNewUser} = this.state

        return (
            <div className="row">
                <div className="col-sm-2">
                    search:
                    <input onChange={(e) => {this.updateUserByNameFilter(e)}}/>
                    <ClickableItemList
                        itemList={this.visibleUsers()}
                        onItemSelected={(userId) => {
                            this.onUserItemSelected(userId)
                        }}
                    />
                    <a onClick={(e) => {
                        this.onCreateNewUserSelected(e)
                    }}>Add new user</a>
                </div>
                <div className="col-sm-10">
                    {selectedUserDetails && <UserDetails/>}
                    {selectedCreateNewUser && <UserCreationForm/>}
                </div>
            </div>
        )
    }
}

const mapStatesToProps = state => ({
    users: state.users.byId,
    selectedUserDetails: state.users.selectedUserDetails
})

export default connect(mapStatesToProps)(UserManagement)