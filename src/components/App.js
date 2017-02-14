import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux'
//import '../actions/loginActions.js'

class App extends Component {
	constructor(props) {
		super(props)
	}
  	render() {
    	return (
      	<div className="App">
        	{this.props.children}
      	</div>
   	 );
  	}
}
export default connect()(App);
