import React, {Component} from 'react'
import {Link} from 'react-router'
export default class IndexPage extends Component {
	render() {
		return (<div><h1>Welcome to TeamMessenger, please login</h1><Link to="/login">Login</Link></div>)
	}
}