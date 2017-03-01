import React from 'react'

const ItemWithButtonList = props => {

    const {itemList, onItemButtonClick, buttonText} = props

    return (
        <ul>
            {itemList.map(item =>
                <li key={item.id}>
                    {item.name}
                    <button onClick={() => {
                        onItemButtonClick(item.id)
                    }}>{buttonText}</button>
                </li>
            )}
        </ul>
    )
}

export default ItemWithButtonList