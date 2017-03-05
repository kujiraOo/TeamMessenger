import React from 'react'
import style from '../css/general.css'
import {
    Panel, ListGroup, ListGroupItem
}
from 'react-bootstrap'
    /*
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
    */
class Item extends React.Component {
    render() {
        let {
            data
        } = this.props
        let name = data.sender.firstName + ' ' + data.sender.lastName
        console.log(this.props.items)
        return ( < div > < p > {
            data.title
        } < /p> < p > From: {
            name
        } < /p> < p > Deadline: {
            data.deadline
        } < /p> < /div>)
    }
}
export default class TaskList extends React.Component {
        constructor(props) {
            super(props)
        }
        render() {
            console.log('TESTING TASK LIST')
            const {
                list
            } = this.props
            console.log(list)
            console.log(this.props.items)

            function handleClick(e) {
                console.log('handleClick( has been called.');
            }
            const items = this.props.entries.map((id) => {
                    let entity = list[id]
                    return ( < ListGroupItem key = {
                            id
                        }
                        onClick = {
                            handleClick(),
                            () => {
                                this.props.taskSelect(id)
                            }
                        } > < Item data = {
                            entity
                        }
                        id = {
                            id
                        }
                        /> < /ListGroupItem>)
                    }); return ( < div > < ListGroup > {
                    items
                } < /ListGroup> < /div>)
            }
        }