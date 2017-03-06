import React from 'react';
import GroupItem from './GroupItem';
import renderer from 'react-test-renderer';

describe('Component: GroupItem', () => {

    it('renders a snapshot', () => {
        const tree = renderer.create(<GroupItem name="Cashiers"/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
})