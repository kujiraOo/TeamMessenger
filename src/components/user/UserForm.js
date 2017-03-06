import React from 'react'
import {FormControl, ControlLabel, Button} from 'react-bootstrap'
import {HR_USER, NORMAL_USER} from '../../constants/UserTypes'

export default class UserForm extends React.Component {

    constructor(props) {
        super(props)

        this.state = this.constructState(props)
    }

    componentWillReceiveProps(nextProps) {
        const state = this.constructState(nextProps)
        this.setState({...state})
    }

    // Flatten user data
    constructState(props) {
        const {user} = props

        if (user) {
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

        return this.defaultState()
    }

    constructUserDetails() {
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
        return {
            id,
            groups,
            userName,
            firstName,
            lastName,
            status,
            contactDetails
        }
    }

    defaultState() {
        return {
            userName: '',
            firstName: '',
            lastName: '',
            status: NORMAL_USER,
            email: '',
            phoneNumber: '',
            city: '',
            street: '',
            postalCode: ''
        }
    }

    handleSubmission() {
        const {onSubmit} = this.props
        const userDetails = this.constructUserDetails()
        onSubmit(userDetails)
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
        const {userName, firstName, lastName, status, email, phoneNumber, city, street, postalCode, id} = this.state
        const {submitButtonText, editUserName, title} = this.props

        return (
            <div>
                <h3>{title}</h3>

                {editUserName && this.renderTextInput('User name', 'userName', userName)}
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
                    onClick={() => this.handleSubmission()}
                >
                    {submitButtonText}
                </Button>
            </div>
        )
    }
}