import React from 'react'
import GroupItem from './GroupItem'

const GroupList = (props) => {

    return (
        <ul>
            {props.groupList.map(groupItem =>
                <GroupItem
                    onClick={(groupId) => {
                        props.onGroupItemSelected(groupId)
                    }}
                    key={groupItem.id}
                    id={groupItem.id}
                    name={groupItem.name}/>
            )}
        </ul>
    )
}

export default GroupList