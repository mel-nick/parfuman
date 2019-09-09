import React from 'react';
import toJson from 'enzyme-to-json';
import Logo from './Logo';

describe('Logo component', () => {
    it('Logo component render', () => {
        const wrapper  = shallow(<Logo />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})