import React from 'react'
import {connect} from 'react-redux'
import {createUser} from '../../actions/UserActions'

const NORMAL_USER = 'ACTIVE'
const HR_USER = 'HR_MANAGER'

class UserCreationForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                userName: '',
                firstName: '',
                lastName: '',
                status: NORMAL_USER
            }
        }
    }

    handleUserNameInput(e) {
        const {user} = this.state
        this.setState({
            user: {...user, userName: e.target.value}
        })
    }

    handleFirstNameInput(e) {
        const {user} = this.state
        this.setState({
            user: {...user, firstName: e.target.value}
        })
    }

    handleLastNameInput(e) {
        const {user} = this.state
        this.setState({
            user: {...user, lastName: e.target.value}
        })
    }

    handleUserTypeSelection(e) {
        const {user} = this.state
        this.setState({
            user: {...user, status: e.target.value}
        })
    }

    handleUserDataSubmission() {
        const {user} = this.state
        const {dispatch} = this.props
        dispatch(createUser(user))
    }

    render() {

        const {userName, firstName, lastName, status} = this.state.user

        return (
            <div>
                User name <input value={userName} onChange={(e) => {this.handleUserNameInput(e)}}/>
                <br/>
                First name <input value={firstName} onChange={(e) => {this.handleFirstNameInput(e)}}/>
                <br/>
                Last name <input value={lastName} onChange={(e) => {this.handleLastNameInput(e)}}/>
                <br/>
                User type
                <select onChange={(e) => {this.handleUserTypeSelection(e)}} value={status}>
                    <option value={NORMAL_USER}>Normal user</option>
                    <option value={HR_USER}>HR user</option>
                </select>
                <br/>
                <button onClick={() => {this.handleUserDataSubmission()}} className="btn btn-primary">Create user</button>
            </div>
        )
    }
}

export default connect()(UserCreationForm)