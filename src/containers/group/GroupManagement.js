import React from 'react'
import {connect} from 'react-redux'
import GroupList from '../../components/group/GroupList'
import GroupCreationForm from './GroupCreationForm'
import GroupListFilter from '../../components/group/GroupListFilter'
import GroupDetails from './GroupDetails'
import {fetchGroupItems, filterGroupsByName, displayGroupDetails, selectGroupDetails} from '../../actions/GroupActions'


export class GroupManagement extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedCreateNewGroup: false
        }
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

    onCreateNewGroupSelected(e) {
        e.preventDefault()
        const {dispatch} = this.props
        dispatch(selectGroupDetails(null))
        this.setState({selectedCreateNewGroup: true})
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

        const {selectedGroupDetails} = this.props
        const {selectedCreateNewGroup} = this.state

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
                <hr/>
                <a href="#" onClick={(e) => {this.onCreateNewGroupSelected(e)}} >Create new group</a>
                <hr/>
                {selectedGroupDetails && <GroupDetails/>}
                {selectedCreateNewGroup && <GroupCreationForm/>}
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