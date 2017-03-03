import React from 'react'
import {ListGroupItem, ListGroup} from 'react-bootstrap'

const ClickableItemList = (props) => {

    const {itemList, onItemSelected} = props

    return (
        <ListGroup>
            {itemList.map(item =>

                <ListGroupItem
                    key={item.id}
                    onClick={() => {
                        onItemSelected(item.id)
                    }}
                >
                    {item.name}
                </ListGroupItem>
            )}
        </ListGroup>
    )
}

export default ClickableItemList