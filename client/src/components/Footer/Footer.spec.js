import React from 'react';
import toJson from 'enzyme-to-json';
import Footer from './Footer';

describe('Footer component', () => {
    it('Footer component render', () => {
        const wrapper  = shallow(<Footer />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})