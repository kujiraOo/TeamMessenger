import React from 'react'
import {browserHistory, Link} from 'react-router'
import {Panel, Button, FormControl, FormGroup, HelpBlock, ControlLabel} from 'react-bootstrap'
import LoginForm from './LoginForm.js'
import {connect} from 'react-redux'
import 'whatwg-fetch'
import {fetchLoginData} from '../actions/actions'

const Login = ({dispatch}) => {
	console.log(onSubmission)
	return (<LoginForm/>)
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSubmission: (loginInfo) => {
			dispatch(fetchLoginData(loginInfo))
		}
	}
}

export default connect(undefined,mapDispatchToProps)(Login)



