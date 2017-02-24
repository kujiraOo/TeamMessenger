import GroupItem from '../components/GroupItem'
import React from 'react'
import {connect} from 'react-redux'
import {fetchGroupItems} from '../actions/GroupActions'


export class GroupList extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(fetchGroupItems())
    }

    render() {

        const groups = this.props.groups

        // Turn store.groups into map
        const groupList = Object.keys(groups).map((id) => <GroupItem key={id} name={groups[id].name}/>)

        return (
            <ul>
                {groupList}
            </ul>
        )
    }
}

const mapStatesToProps = state => ({
    groups: state.groups.byId
})

export default connect(mapStatesToProps)(GroupList)