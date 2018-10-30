import React from 'react';
import { reduxForm } from 'redux-form';
import { createStore } from 'redux';
import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';
import {Provider} from 'react-redux';
import SignupForm from './signupForm';
// import {SignupForm} from './signupForm';
import {mockStore} from '../mockStore';

jest.mock('react-dom')

const spy = jest.fn();

const Decorated = reduxForm({
    form: 'Sign Up', onSubmit: {spy}
})(SignupForm)

const username = 'Tester';
const email = 'Test@test.com';
const password = '1234567890';
const passwordConfirm = '1234567890';

const formFieldValues = {
    username, email, password, passwordConfirm
}



describe('<SignupForm />', () => {
    it('Renders without crashing', () => {
        shallow(<SignupForm />);
    });

    it('Should fire onSubmit callback when form is submitted', () => {
        const callback = spy;
        const store = mockStore();
        const wrapper = mount(
        <Provider store={store}>
            <Decorated  {...formFieldValues}/>
        </Provider>
        );
        const username = 'Tester';
        const email = 'Test@test.com';
        const password = '1234567890';
        const passwordConfirm = '1234567890';
        const values = {username, email, password, passwordConfirm};
        wrapper.find('input[name="username"]').instance().value = username;
        wrapper.find('input[name="email"]').instance().value = email;
        wrapper.find('input[name="password"]').instance().value = password;
        wrapper.find('input[name="passwordConfirm"]').instance().value = passwordConfirm;
        wrapper.find('form').simulate('submit');
        expect(callback).toHaveBeenCalledWith(values);
    });


})