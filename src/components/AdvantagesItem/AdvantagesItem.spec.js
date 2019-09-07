import React from 'react';
import toJson from 'enzyme-to-json';
import AdvantagesItem from './AdvantagesItem';

describe('AdvantagesItem component', () => {
    it('AdvantagesItem component render', () => {
        const wrapper  = shallow(<AdvantagesItem />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})