import GroupItem from './GroupItem'
import React from 'react'

const GroupList = (props) => {

    const groupItems = props.groupList.map(groupItem => <GroupItem key={groupItem.id} name={groupItem.name} />);

    return (
        <ul>
            {groupItems}
        </ul>
    )
}

export default GroupList