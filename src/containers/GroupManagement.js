import React from 'react'
import {connect} from 'react-redux'
import GroupList from './GroupList'
import GroupListFilter from '../components/GroupListFilter'
import {fetchGroupItems, filterGroupsByName, displayGroupDetails} from '../actions/GroupActions'


export class GroupManagement extends React.Component {

    constructor(props) {
        super(props)
    }

    updateGroupsByNameFilter(e) {
        const {dispatch} = this.props
        const filterValue = e.target.value
        dispatch(filterGroupsByName(filterValue))
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(fetchGroupItems())
    }

    onGroupItemSelected(groupId) {
        const {dispatch} = this.props
        dispatch(displayGroupDetails(groupId))
    }

    visibleGroups() {
        const groups = this.props.groups
        const filterValue = this.props.groupsByNameFilter
        const result = []

        Object.values(groups).forEach(groupItem => {
            if (groupItem.name.includes(filterValue))
                result.push(groupItem)
        })

        return result
    }

    render() {

        const groups = this.props.groups
        const selectedGroupDetails = this.props.selectedGroupDetails

        // Turn store.groups into map
        const groupList = Object.values(groups).map(groupItem => groupItem)

        return (
            <div>
                <GroupListFilter
                    onChange={(e) => {
                        this.updateGroupsByNameFilter(e)
                    }}
                />
                <GroupList
                    groupList={this.visibleGroups()}
                    onGroupItemSelected={groupId => {
                        this.onGroupItemSelected(groupId)
                    }}
                />
                { selectedGroupDetails &&
                <div>
                    {groups[selectedGroupDetails].name}
                </div>
                }
            </div>
        )
    }
}

const mapStatesToProps = state => ({
    groups: state.groups.byId,
    groupsByNameFilter: state.groups.groupsByNameFilter,
    selectedGroupDetails: state.groups.selectedGroupDetails
})

export default connect(mapStatesToProps)(GroupManagement)