import React from 'react';
import {shallow, mount} from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom'
import {NavBar} from './NavBar';

// TEST_MARKER
describe('<NavBar />', () => {
    it('Renders without crashing', () => {
        shallow(<NavBar />)
    })

    it('Display logout/profile button when signed in', () => {
        const wrapper = mount(<Router><NavBar loggedIn={true}/></Router>)
        expect(wrapper.find('button[className="navBar-logout-button"]').exists()).toBeTruthy();
        expect(wrapper.find('button[className="navBar-button profile"]').exists()).toBeTruthy();        
    })

    it('Display signup/login buttons when logged out', () => {
        const wrapper = mount(<Router><NavBar loggedIn={false}/></Router>)
        expect(wrapper.find('button[className="navBar-button signup"]').exists()).toBeTruthy();
        expect(wrapper.find('button[className="navBar-button login"]').exists()).toBeTruthy();
    })
})


