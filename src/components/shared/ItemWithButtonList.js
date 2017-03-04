import React from 'react'
import {ListGroup, ListGroupItem, Button} from 'react-bootstrap'

const ItemWithButtonList = props => {

    const {itemList, onItemButtonClick, buttonText} = props

    return (
        <ListGroup>
            {itemList.map(item =>
                <ListGroupItem key={item.id}>
                    {item.name}
                    <Button bsStyle="primary" className="pull-right" onClick={() => {
                        onItemButtonClick(item.id)
                    }}>{buttonText}</Button>
                    <div className="clearfix"/>
                </ListGroupItem>
            )}
        </ListGroup>
    )
}

export default ItemWithButtonList