import React, {
    Component, PropTypes
}
from 'react'
import {
    Navbar, Nav, NavItem
}
from 'react-bootstrap'
import {
    Link
}
from 'react-router'
import {
    connect
}
from 'react-redux'
import {
    redirect
}
from '../actions/helper'
import {
    getLoggedInUser
}
from '../reducers/rootReducer'
import {
    HR_USER
}
from '../constants/UserTypes'
import style from '../css/general.css'
var FontAwesome = require('react-fontawesome');
class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.handleNavigation = this.handleNavigation.bind(this)
    }
    handleNavigation(key) {
        let path = '/' + 'workspace' + '/' + key
        this.props.dispatch(redirect(path))
    }
    render() {
        return (this.props.userStatus === HR_USER) ? ( < Nav pullLeft = {
                true
            }
            bsStyle = "pills"
            stacked = {
                true
            }
            onSelect = {
                this.handleNavigation
            } > < NavItem eventKey = "task" > < FontAwesome className = 'customFontAwesome'
            name = 'bars'
            size = '2x'
            spin style = {
                {
                    textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'
                }
            }
            /> Task Viewer</NavItem > < NavItem eventKey = "issue" > < FontAwesome className = 'customFontAwesome'
            name = 'exclamation-triangle'
            size = '2x'
            spin style = {
                {
                    textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'
                }
            }
            /> Issue Viewer</NavItem > < NavItem eventKey = "group-management" > < FontAwesome className = 'customFontAwesome'
            name = 'users'
            size = '2x'
            spin style = {
                {
                    textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'
                }
            }
            />  Group Management</NavItem > < NavItem eventKey = "user-management" > < FontAwesome className = 'customFontAwesome'
            name = 'user'
            size = '2x'
            spin style = {
                {
                    textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'
                }
            }
            />  User Management</NavItem > < /Nav>) : ( < Nav pullLeft = {
                true
            }
            stacked = {
                true
            }
            onSelect = {
                this.handleNavigation
            } > < NavItem eventKey = "task" > Task Viewer < /NavItem> < NavItem eventKey = "issue" > Issue Viewer < /NavItem> < /Nav>)
        }
    }
    const mapStateToProps = (state) => {
        const loggedInUser = getLoggedInUser(state)
        return {
            userStatus: loggedInUser.status
        }
    }
    export default connect(mapStateToProps)(Sidebar)