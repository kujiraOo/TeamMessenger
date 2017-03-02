import React from 'react'
import {connect} from 'react-redux'
import {modifyUser} from '../../actions/UserActions'

class UserDetails extends React.Component {
    constructor(props) {
        super(props)

        this.state = {...this.props}
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...nextProps})
    }

    handleFirstNameChange(e) {
        const {user} = this.state

        this.setState({
            user: {...user, firstName: e.target.value}
        })
    }

    handleLastNameChange(e){
        const {user} = this.state

        this.setState({
            user: {...user, lastName: e.target.value}
        })
    }

    updateUserData() {
        const {dispatch} = this.props
        const {user} = this.state
        dispatch(modifyUser(user))
    }

    render() {

        const {firstName, lastName} = this.state.user

        return (
            <div>
                <h3>User Details</h3>
                First name: <input value={firstName} onChange={(e) => {this.handleFirstNameChange(e)}}/>
                <br/>
                Last name: <input value={lastName} onChange={(e) => {this.handleLastNameChange(e)}}/>
                <br/>
                <button onClick={() => {this.updateUserData()}} className="btn btn-primary">Update user info</button>
            </div>
        )
    }
}

const mapStatesToProps = state => ({
    user: state.users.byId[state.users.selectedUserDetails],
})

export default connect(mapStatesToProps)(UserDetails)