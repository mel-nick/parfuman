import React from 'react';
import toJson from 'enzyme-to-json';
import Slider from './Slider';

describe('Slider component', () => {
    it('Slider component render', () => {
        const wrapper  = shallow(<Slider />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})