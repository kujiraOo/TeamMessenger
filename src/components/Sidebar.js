import React from 'react'
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {Link}from 'react-router'
import {connect}from 'react-redux'
import {redirect}from '../actions/helper'
import {HR_USER} from '../constants/UserTypes'
import FontAwesome from 'react-fontawesome'
import {getLoggedInUser} from '../reducers/rootReducer'

function renderIcon(iconName) {
    return (<FontAwesome
        className='customFontAwesome'
        name={iconName}
        size='1x'
        style={{textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', width: '30px', 'text-align': 'center'}}/>)
}

class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.handleNavigation = this.handleNavigation.bind(this)
    }

    handleNavigation(key) {
        let path = '/' + 'workspace' + '/' + key
        this.props.dispatch(redirect(path))
    }

    render() {
        return (this.props.userStatus === HR_USER) ? (
                <Nav pullLeft bsStyle="pills" stacked onSelect={this.handleNavigation}>
                    <NavItem eventKey="task">
                        {renderIcon('bars')}
                        Task Viewer
                    </NavItem >
                    <NavItem eventKey="issue">
                        {renderIcon('exclamation-triangle')}
                        Issue Viewer
                    </NavItem>
                    <NavItem eventKey="group-management">
                        {renderIcon('users')}
                        Group Management
                    </NavItem >
                    <NavItem eventKey="user-management">
                        {renderIcon('user')}
                        User Management</NavItem>
                </Nav>
            ) : (
                <Nav pullLeft={true}
                     stacked={true}
                     onSelect={this.handleNavigation}>
                    <NavItem eventKey="task">
                        {renderIcon('bars')}
                        Task Viewer
                    </NavItem>
                    <NavItem eventKey="issue">
                        {renderIcon('exclamation-triangle')}
                        Issue Viewer
                    </NavItem>
                </Nav>
            )
    }
}
const mapStateToProps = (state) => {
    const loggedInUser = getLoggedInUser(state)
    return {
        userStatus: loggedInUser.status
    }
}
export default connect(mapStateToProps)(Sidebar)