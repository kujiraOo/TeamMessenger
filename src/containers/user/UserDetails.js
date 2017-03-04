import React from 'react'
import {connect} from 'react-redux'
import {modifyUser} from '../../actions/UserActions'
import UserForm from '../../components/user/UserForm'
import {Well} from 'react-bootstrap'

class UserDetails extends React.Component {
    constructor(props) {
        super(props)
    }

    updateUserData(userDetails) {
        const {dispatch} = this.props
        dispatch(modifyUser(userDetails))
    }

    render() {
        const {user} = this.props
        const formTitle = user.firstName + ' ' + user.lastName + ' ' + user.id

        return (
            <Well>
                <UserForm
                    title={formTitle}
                    user={this.props.user}
                    submitButtonText="Update user"
                    onSubmit={(userDetails) => {
                        this.updateUserData(userDetails)
                    }}
                />
            </Well>
        )
    }
}

const mapStatesToProps = state => ({
    user: state.users.byId[state.users.selectedUserDetails]
})

export default connect(mapStatesToProps)(UserDetails)