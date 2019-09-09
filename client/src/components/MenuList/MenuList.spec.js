import React from 'react';
import toJson from 'enzyme-to-json';
import MenuList from './MenuList';

describe('MenuList component', () => {
    it('MenuList component render', () => {
        const wrapper  = shallow(<MenuList />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})