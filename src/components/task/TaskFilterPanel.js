import React from 'react'
import {connect} from 'react-redux'
import {Button, ButtonGroup, DropdownButton, ButtonToolbar, MenuItem, Panel} from 'react-bootstrap'
import {setReceivedSentFilter} from '../../actions/filterAction'

class ButtonPanel extends React.Component {
    constructor(props) {
        super(props)
    }

    setFilterBySource(filterValue) {
        let {dispatch} = this.props
        dispatch(setReceivedSentFilter(filterValue))
    }

    render() {
        let {sentReceivedFilter} = this.props
        return (
            <Panel>
                <ButtonToolbar>
                    <ButtonGroup>
                        <Button className="customButton" active={(sentReceivedFilter == 'RECEIVED')} onClick={() => {
                            this.setFilterBySource('RECEIVED')
                        }}>Received</Button>
                        <Button className="customButton" active={(sentReceivedFilter == 'VIEW_SENT')} onClick={() => {
                            this.setFilterBySource('SENT')
                        }}>Sent</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </Panel>
        )
    }
}
const mapStateToProp = (state) => {
    return {
        sentReceivedFilter: state.filters.tasks.sentReceivedFilter
    }
}
export default connect(mapStateToProp)(ButtonPanel)