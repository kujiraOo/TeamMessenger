import React from 'react'
import ItemWithButtonList from './ItemWithButtonList'
import renderer from 'react-test-renderer'

describe('Component: ListItemWithButton', () => {

    it('renders a snapshot', () => {

        const itemList = [
            {id: 1, name: 'ok'},
            {id: 2, name: 'pvp'},
            {id: 3, name: 'lol'},
        ]

        const tree = renderer.create(
            <ItemWithButtonList
                itemList={itemList}
                buttonText="ok"
            />
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
})