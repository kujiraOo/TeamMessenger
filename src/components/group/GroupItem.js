import React from 'react';

const GroupItem = (props) => {

    function onClick(e) {
        e.preventDefault()
        props.onClick(props.id)
    }

    return (
        <li><a href="#" onClick={onClick}>{props.name}</a></li>
    )
}

export default GroupItem