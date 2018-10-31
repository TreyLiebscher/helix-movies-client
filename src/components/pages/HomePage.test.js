import React from 'react';
import {shallow, mount} from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom'
import HomePage from './HomePage';

// TEST_MARKER
describe('<HomePage />', () => {
    it('Renders without crashing', () => {
        shallow(<HomePage />)
    });
})

