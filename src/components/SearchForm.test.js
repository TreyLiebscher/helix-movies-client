import React from 'react';
import {shallow, mount} from 'enzyme';

import SearchFormR from './SearchForm';
import {SearchForm} from './SearchForm';

describe('<SearchForm />', () => {
    it('Renders without crashing', () => {
        shallow(<SearchForm />);
    });

    // it('Should fire onSubmit callback when form is submitted', () => {
    //     const callback = jest.fn();
    //     const wrapper = mount(<SearchForm onSubmit={callback} />);
    //     const value = 'Movie';
    //     wrapper.find('input[type="text"]').instance().value = value;
    //     wrapper.simulate('submit');
    //     expect(callback).toHaveBeenCalledWith(value);
    // });
})