import React from 'react'
import { GroupList } from './GroupList'
import renderer from 'react-test-renderer'

describe('Component: GroupList', () => {

    it('renders a snapshot', () => {

        const mockGroups = {
            1: {
                name: 'cashiers'
            },
            2: {
                name: 'storage'
            }
        }

        const tree = renderer.create(<GroupList groups={mockGroups} dispatch={() => {}}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
})