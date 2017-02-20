import React from 'react'
import {connect} from 'react-redux'
import {redirect} from '../actions/helper'

class ManagementArea extends React.Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {
		if (!this.props.isHr) this.props.dispatch(redirect('/login'))
	}
	render() {
		return (<h1>This is management area</h1>)
	}
}
const mapStateToProp = (state) => {
	return {
		isHr: state.userInfo.isHR
	}
}
export default connect(mapStateToProp)(ManagementArea)