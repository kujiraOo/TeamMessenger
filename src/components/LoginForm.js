import React, {PropTypes} from 'react'
import {Panel, Button, FormControl, FormGroup, HelpBlock} from 'react-bootstrap'
import {fetchLoginData, } from '../actions/actions'
import {connect} from 'react-redux'
import  loadingimg from '../img/loading.svg'

class LoginForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	handleChange(e) {
		let username = e.target.value;
		this.setState({username})
	}
	handleSubmit(e) {
		this.props.dispatch(fetchLoginData(this.state))
	}
	render() {
		let logged = (this.props.response == 404) ? 'danger' : 'primary'
		if (this.props.isFetching) return (<img src={loadingimg} alt=""/>)
		else return (
		<div className="container">
			<Panel header="Enter log-in details" bsStyle={logged}>
				<form>
					<FormGroup>
						<FormControl id="username" type="text" placeholder="Username" onChange={(e)=>{this.handleChange(e)}}></FormControl>
						<HelpBlock>Username cannot contain whitespace or special characters</HelpBlock>
					</FormGroup>
					<FormGroup>
						<FormControl id="password" type="password" placeholder="Password" ></FormControl>
						<HelpBlock>Enter your password here. Password is case sensitive</HelpBlock>
					</FormGroup>
					<Button onClick={(e) => {this.handleSubmit(e)}}>Login</Button>
				</form>
			</Panel>
		</div>
		);
	}
}

const mapStateToProps = (state) => ({isFetching: state.authentication.isFetching, response: state.authentication.responseFromServer})
export default connect(mapStateToProps)(LoginForm)