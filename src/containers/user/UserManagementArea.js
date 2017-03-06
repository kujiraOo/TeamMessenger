import React from 'react'
import {connect} from 'react-redux'
import ManagementArea from '../shared/ManagementArea'
import UserManagement from './UserManagement'

class UserManagementArea extends ManagementArea {
    constructor(props) {
        super(props)
    }

    render() {
        return (<UserManagement/>)
    }
}
const mapStateToProp = (state) => {
    return {
        userStatus: state.authentication.status
    }
}
export default connect(mapStateToProp)(UserManagementArea)