import React from 'react';
import GroupList from './GroupList';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

describe('Component: GroupList', () => {

    it('renders a snapshot', () => {

        const mockGroupList = [
            {name: 'cashiers', id: 1},
            {name: 'storage', id: 2}
        ]

        const tree = renderer.create(<GroupList groupList={mockGroupList}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
})