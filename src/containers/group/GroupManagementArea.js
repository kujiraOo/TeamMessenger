import React from 'react'
import {connect} from 'react-redux'
import ManagementArea from '../shared/ManagementArea'
import GroupManagement from './GroupManagement'

class GroupManagementArea extends ManagementArea {
    constructor(props) {
        super(props)
    }

    render() {
        return (<GroupManagement/>)
    }
}
const mapStateToProp = (state) => {
    return {
        userStatus: state.authentication.status
    }
}
export default connect(mapStateToProp)(GroupManagementArea)