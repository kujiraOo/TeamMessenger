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
                           <h3>Nothing to display</h3>
                       )}
           </Panel>
        )
    }
}
