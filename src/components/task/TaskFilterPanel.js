import React from 'react'
import {connect} from 'react-redux'
import {Button, ButtonGroup, ButtonToolbar, Panel} from 'react-bootstrap'
import {setReceivedSentFilter, setSenderGroupFilter, setSenderFilter, setRecipientGroupFilter} from '../../actions/FilterActions'
import {
    RECIPIENT_GROUP_FILTER,
    SENDER_FILTER,
    SENDER_GROUP_FILTER,
    RECEIVED_SENT_FILTER
} from '../../constants/taskFilterConstants'
import {getManagerGroups, getSubordinateGroups} from '../../reducers/rootReducer'
import OptionsFilter from '../../components/shared/OptionsFilter'

class ButtonPanel extends React.Component {
    constructor(props) {
        super(props)
    }

    setReceivedSentFilter(filterValue) {
        let {dispatch} = this.props
        dispatch(setReceivedSentFilter(filterValue))
    }

    senderGroupFilterOptions() {
        const {managerGroups} = this.props

        const groupOptions = Object.values(managerGroups.byId).map(group => {
            return {value: group.id, name: group.name}
        })

        return [{name: 'all', value: SENDER_GROUP_FILTER.ALL}, ...groupOptions]
    }

    senderFilterOptions() {
        return [
            {name: 'me', value: SENDER_FILTER.ME},
            {name: 'others', value: SENDER_FILTER.OTHERS},
            {name: 'all', value: SENDER_FILTER.ALL}
        ]
    }

    recipientGroupFilterOptions() {
        const {subordinateGroups} = this.props

        const groupOptions = Object.values(subordinateGroups.byId).map(group => {
            return {value: group.id, name: group.name}
        })

        return [{name: 'all', value: RECIPIENT_GROUP_FILTER.ALL}, ...groupOptions]
    }

    handleSenderGroupSelection(filterValue) {
        if (filterValue && filterValue !== SENDER_GROUP_FILTER.ALL) {
            filterValue = Number(filterValue)
        }
        const {dispatch} = this.props
        dispatch(setSenderGroupFilter(filterValue))
    }

    handleSenderSelection(filterValue) {
        const {dispatch} = this.props
        dispatch(setSenderFilter(filterValue))
    }

    handleRecipientGroupSelection(filterValue) {
        if (filterValue && filterValue !== RECIPIENT_GROUP_FILTER.ALL) {
            filterValue = Number(filterValue)
        }
        const {dispatch} = this.props
        dispatch(setRecipientGroupFilter(filterValue))
    }

    render() {
        const {receivedSentFilter, senderGroupFilter, senderFilter, recipientGroupFilter} = this.props

        return (
            <Panel>
                <ButtonToolbar>
                    <ButtonGroup>
                        <Button className="customButton" active={(receivedSentFilter === RECEIVED_SENT_FILTER.RECEIVED)}
                                onClick={() => {
                                    this.setReceivedSentFilter(RECEIVED_SENT_FILTER.RECEIVED)
                                }}
                        >Received</Button>
                        <Button className="customButton" active={(receivedSentFilter === RECEIVED_SENT_FILTER.SENT)}
                                onClick={() => {
                                    this.setReceivedSentFilter(RECEIVED_SENT_FILTER.SENT)
                                }}>Sent</Button>
                    </ButtonGroup>
                    <br/>
                    <br/>
                    {(receivedSentFilter === RECEIVED_SENT_FILTER.RECEIVED) &&
                    <OptionsFilter
                        label="From GROUP"
                        value={senderGroupFilter}
                        options={this.senderGroupFilterOptions()}
                        onChange={(filterValue) => this.handleSenderGroupSelection(filterValue)}
                    />}
                    {(receivedSentFilter === RECEIVED_SENT_FILTER.SENT) &&
                    <div>
                        <OptionsFilter
                            label="Sent by"
                            value={senderFilter}
                            options={this.senderFilterOptions()}
                            onChange={filterValue => this.handleSenderSelection(filterValue)}
                        />
                        <OptionsFilter
                            label="To group"
                            value={recipientGroupFilter}
                            options={this.recipientGroupFilterOptions()}
                            onChange={filterValue => this.handleRecipientGroupSelection(filterValue)}
                        />
                    </div>}
                </ButtonToolbar>
            </Panel>
        )
    }
}
const mapStateToProp = (state) => {
    const {loggedInUserId} = state.authentication
    const {receivedSentFilter, senderGroupFilter, senderFilter, recipientGroupFilter} = state.filters.tasks

    return {
        receivedSentFilter,
        senderGroupFilter,
        senderFilter,
        recipientGroupFilter,
        managerGroups: getManagerGroups(state, loggedInUserId),
        subordinateGroups: getSubordinateGroups(state, loggedInUserId)
    }
}
export default connect(mapStateToProp)(ButtonPanel)