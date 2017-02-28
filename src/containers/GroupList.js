import React from 'react'
import GroupItem from '../components/GroupItem'

export class GroupList extends React.Component {

    constructor(props) {
        super(props)
    }

    handleGroupItemClick(groupId) {
        this.props.onGroupItemSelected(groupId)
    }

    render() {
        const groupList = this.props.groupList

        return (
            <ul>
                {groupList.map(groupItem =>
                    <GroupItem
                        onClick={(groupId) => {this.handleGroupItemClick(groupId)}}
                        key={groupItem.id}
                        id={groupItem.id}
                        name={groupItem.name}/>
                )}
            </ul>
        )
    }
}

export default GroupList