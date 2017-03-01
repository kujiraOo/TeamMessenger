import React from 'react';
import GroupListFilter from './GroupListFilter';
import renderer from 'react-test-renderer';

describe('Component: GroupListFilter', () => {

    it('renders a snapshot', () => {

        function handleGroupListFilterChange() {

        }

        const tree = renderer.create(<GroupListFilter onChange={handleGroupListFilterChange()}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
})