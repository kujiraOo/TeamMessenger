import React from 'react'

const ClickableItemList = (props) => {

    const {itemList, onItemSelected} = props

    return (
        <ul>
            {itemList.map(item =>

                <li key={item.id}>
                    <a href="#"
                       onClick={(e) => {
                           e.preventDefault()
                           onItemSelected(item.id)
                       }}
                    >{item.name}</a>
                </li>
            )}
        </ul>
    )
}

export default ClickableItemList