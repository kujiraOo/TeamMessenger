import React from 'react'
import {redirect} from '../../actions/helper'
import {HR_USER} from '../../constants/UserTypes'

class ManagementArea extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        if (!this.props.userStatus === HR_USER) this.props.dispatch(redirect('/login'))
    }
}

export default ManagementArea