import React from 'react';
import toJson from 'enzyme-to-json';
import AdvantagesList from './AdvantagesList';

describe('AdvantagesList component', () => {
    it('AdvantagesList component render', () => {
        const wrapper  = shallow(<AdvantagesList />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})