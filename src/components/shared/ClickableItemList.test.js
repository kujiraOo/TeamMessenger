import React from 'react'
import GroupList from './ClickableItemList'
import renderer from 'react-test-renderer'

describe('Component: GroupList', () => {

    it('renders a snapshot', () => {

        const mockGroupList = [
            {
                id: 1,
                name: 'cashiers'
            },
            {
                id: 2,
                name: 'storage'
            }
        ]

        const tree = renderer.create(<GroupList groupList={mockGroupList}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
})