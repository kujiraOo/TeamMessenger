import React from 'react'
import ListItemWithButton from './ListItemWithButton'
import renderer from 'react-test-renderer'

describe('Component: ListItemWithButton', () => {

    it('renders a snapshot', () => {
        const tree = renderer.create(
            <ListItemWithButton
                itemText="Bob"
                buttonText="remove"
                onButtonClick={() => {}}/>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
})