import React from 'react'
import {
    Panel, ListGroup, ListGroupItem
}
from 'react-bootstrap'
import styles from '../css/general.css'
export default class TaskList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

            function handleClick(e) {
 
            console.log('handleClick( has been called.');
        }

        return ( < ListGroup > 
                < ListGroupItem
            onClick = {
                handleClick
            } > Task 1 < /ListGroupItem> < ListGroupItem             onClick = {
                handleClick
            } > Task 2 < /ListGroupItem> < /ListGroup>)
    }
}