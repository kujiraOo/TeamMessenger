import React from 'react'
import {connect} from 'react-redux'
import {modifyUser} from '../../actions/UserActions'
import {SplitButton, MenuItem, Panel, Well, FormControl, ControlLabel, Button} from 'react-bootstrap'
import {HR_USER, NORMAL_USER} from '../../constants/UserTypes'

class UserDetails extends React.Component {
    constructor(props) {
        super(props)

        this.state = this.constructState(props)
    }

    // Flatten user data
    constructState(props) {
        const {user} = props
        const {contactDetails} = user
        let state = {...user}

        if (contactDetails) {
            state = {...state, ...contactDetails}

            const {address} = contactDetails

            if (address) {
                state = {...state, ...address}
            }
        }

        return state
    }

    componentWillReceiveProps(nextProps) {
        const state = this.constructState(nextProps)
        this.setState({...state})
    }

    updateUserData() {
        const {dispatch} = this.props
        const {userName, firstName, lastName, status, email, phoneNumber, city, street, postalCode, id, groups} = this.state
        const contactDetails = {
            email,
            phoneNumber,
            address: {
                city,
                street,
                postalCode
            }
        }
        const userData = {
            id,
            groups,
            userName,
            firstName,
            lastName,
            status,
            contactDetails
        }

        dispatch(modifyUser(userData))
    }

    renderTextInput(label, key, value) {
        const placeHolder = 'Enter new ' + label.toLowerCase()

        return (
            <div>
                <ControlLabel>{label}</ControlLabel>
                <FormControl
                    type="text"
                    value={value}
                    placeholder={placeHolder}
                    onChange={e => this.setState({
                        [key]: e.target.value
                    })}
                />
            </div>
        )
    }

    render() {
        const currentUserData = this.props.user
        const currentFirstName = currentUserData.firstName
        const currentLastName = currentUserData.lastName
        const {firstName, lastName, status, email, phoneNumber, city, street, postalCode} = this.state

        return (
            <Well>
                <h3>{currentFirstName} {currentLastName}</h3>

                {this.renderTextInput('First name', 'firstName', firstName)}
                {this.renderTextInput('Last Name', 'lastName', lastName)}

                <ControlLabel>User type</ControlLabel>
                <FormControl
                    value={status}
                    componentClass="select"
                    onChange={e => this.setState({
                        status: e.target.value
                    })}
                >
                    <option value={NORMAL_USER}>Normal user</option>
                    <option value={HR_USER}>HR user</option>
                </FormControl>

                {this.renderTextInput('Email', 'email', email)}
                {this.renderTextInput('Phone number', 'phoneNumber', phoneNumber)}
                {this.renderTextInput('City', 'city', city)}
                {this.renderTextInput('Street', 'street', street)}
                {this.renderTextInput('Postal code', 'postalCode', postalCode)}

                <br/>
                <Button
                    bsStyle="primary"
                    onClick={() => {
                        this.updateUserData()
                    }}
                >
                    Update user info
                </Button>
            </Well>
        )
    }
}

const mapStatesToProps = state => ({
    user: state.users.byId[state.users.selectedUserDetails],
})

export default connect(mapStatesToProps)(UserDetails)