import React from 'react'
import {Well, ButtonToolbar, ButtonGroup, Button, Panel} from 'react-bootstrap'
import moment from 'moment'

export default class DetailPanel extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillUpdate() {
        this.props.requestTaskDetail()
    }
    renderFooter() {
        if (!this.props.entity) return null
        return (<ButtonToolbar>
                    {
                        (this.props.control.receivedSentFilter == 'SENT') && 
                        <ButtonGroup>
                            <Button onClick={this.props.deleteTask}>Delete this task</Button>
                            <Button onClick={this.props.modifyTask}>Modify this Task</Button>
                        </ButtonGroup>
                        }
                   <ButtonGroup>
                        <Button onClick={this.props.modifyTask}>Mark as complete</Button>
                   </ButtonGroup>
               </ButtonToolbar>)
    }
    render() {
        const {entity, senderName} = this.props
        return (
           <Panel footer={this.renderFooter()}>
                   {entity ? ( 
                           <div>
                               <h2>{entity.title}</h2>
                               <p>From: {senderName}</p>
                               <p>Due {moment(entity.deadline).calendar()}</p>
                               <p>{entity.content}</p>
                           </div>
                       ) : (
                           <div>
                               <h3>Welcome to your task viewing screen</h3>
                               <p>Click the task item in the left and see its full details here.</p>
                               <p>If the task is sent by you, you can edit, or modify it. If not, you can only edit your task</p>
                           </div>
                       )}
           </Panel>
        )
    }
}
