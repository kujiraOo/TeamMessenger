import React from 'react'
import {connect} from 'react-redux'
import {redirect} from '../../actions/helper'
import GroupManagement from './GroupManagement'

class ManagementArea extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        if (!this.props.isHr) this.props.dispatch(redirect('/login'))
    }

    renderManagementComponent() {
        const {managementComponentType} = this.props

        switch (managementComponentType) {
            case 'user':
                return
            case 'group':
                return (<GroupManagement/>)
        }
    }

    render() {
        return this.renderManagementComponent()
    }
}
const mapStateToProp = (state) => {
    return {
        isHr: state.authentication.isHR
    }
}
export default connect(mapStateToProp)(ManagementArea)