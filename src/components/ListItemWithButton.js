import React from 'react'

const ListItemWithButton = (props) => {

    return (
        <li>
            {props.itemText} <button onClick={props.onButtonClick}>{props.buttonText}</button>
        </li>
    )
}

export default ListItemWithButton