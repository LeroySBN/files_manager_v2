import React from 'react';
import { configure } from 'enzyme';
import Adapter from '@freelensing/enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
