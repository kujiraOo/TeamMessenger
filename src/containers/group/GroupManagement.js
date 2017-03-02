import React from 'react'
import {connect} from 'react-redux'
import ClickableItemList from '../../components/shared/ClickableItemList'
import GroupCreationForm from './GroupCreationForm'
import GroupDetails from './GroupDetails'
import {fetchGroupItems, displayGroupDetails, selectGroupDetails} from '../../actions/GroupActions'


export class GroupManagement extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedCreateNewGroup: false,
            groupByNameFilterValue: ''
        }
    }

    updateGroupsByNameFilter(e) {
        this.setState({
            groupByNameFilterValue: e.target.value
        })
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(fetchGroupItems())
    }

    onGroupItemSelected(groupId) {
        const {dispatch} = this.props
        dispatch(displayGroupDetails(groupId))
        this.setState({selectedCreateNewGroup: false})
    }

    onCreateNewGroupSelected(e) {
        e.preventDefault()
        const {dispatch} = this.props
        dispatch(selectGroupDetails(null))
        this.setState({selectedCreateNewGroup: true})
    }

    visibleGroups() {
        const {groups} = this.props
        const {groupByNameFilterValue} = this.state
        const result = []

        Object.values(groups).forEach(groupItem => {
            if (groupItem.name.includes(groupByNameFilterValue))
                result.push(groupItem)
        })

        return result
    }

    render() {

        const {selectedGroupDetails} = this.props
        const {selectedCreateNewGroup} = this.state

        return (
            <div className="row">
                <div className="col-sm-2">
                    search:
                    <input onChange={(e) => {this.updateGroupsByNameFilter(e)}}/>
                    <ClickableItemList
                        itemList={this.visibleGroups()}
                        onItemSelected={groupId => {
                            this.onGroupItemSelected(groupId)
                        }}
                    />
                    <a onClick={(e) => {
                        this.onCreateNewGroupSelected(e)
                    }}>Create new group</a>
                </div>
                <div className="col-sm-10">
                    {selectedGroupDetails && <GroupDetails/>}
                    {selectedCreateNewGroup && <GroupCreationForm/>}
                </div>
            </div>
        )
    }
}

const mapStatesToProps = state => ({
    groups: state.groups.byId,
    selectedGroupDetails: state.groups.selectedGroupDetails
})

export default connect(mapStatesToProps)(GroupManagement)