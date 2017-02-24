import React from 'react'
import {connect} from 'react-redux'

export class GroupManagement extends React.Component {

    constructor(props) {
        super(props)
    }

    // render() {
    //
    //     const groups = this.props.groups
    //
    //     // Turn store.groups into map
    //     const groupList = Object.keys(groups).map((id) => <GroupItem key={id} name={groups[id].name}/>)
    //
    //     return (
    //         <ul>
    //             {groupList}
    //         </ul>
    //     )
    // }
}

const mapStatesToProps = state => ({
    groups: state.groups.byId
    // selectedGroupDetails: state.groups.selectedGroupDetails
})

export default connect(mapStatesToProps)(GroupManagement)