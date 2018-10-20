import React from 'react';
import {shallow, mount} from 'enzyme';

import SignupForm from './signupForm';
import {mockStore} from '../mockStore';

describe('<SignupForm />', () => {
    it('Renders without crashing', () => {
        shallow(<SignupForm />);
    });

    // it('Should fire onSubmit callback when form is submitted', () => {
    //     const callback = jest.fn();
    //     const store = mockStore();
    //     const wrapper = mount(<SignupForm onSubmit={callback} />);
    //     const username = 'Tester';
    //     const email = 'Test@test.com';
    //     const password = '1234567890';
    //     const passwordConfirm = '1234567890';
    //     const values = {username, email, password, passwordConfirm};
    //     wrapper.find('input[name="username"]').instance().value = username;
    //     wrapper.find('input[name="email"]').instance().value = email;
    //     wrapper.find('input[name="password"]').instance().value = password;
    //     wrapper.find('input[name="passwordConfirm"]').instance().value = passwordConfirm;
    //     wrapper.find('form').simulate('submit');
    //     expect(callback).toHaveBeenCalledWith(values);
    // });
})