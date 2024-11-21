import React from 'react';
import { shallow } from 'enzyme';
import CourseList from './CourseList';
import { StyleSheetTestUtils } from "aphrodite";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('CourseList component testing', () => {
  it('CourseList renders without crashing', () => {
    const component = shallow(<CourseList />);
    expect(component).toMatchSnapshot();
  });

  it('renders a table', () => {
    const wrapper = shallow(<CourseList />);
    expect(wrapper.find('table')).toHaveLength(1);
    expect(wrapper.find('CourseListRow')).toHaveLength(3);
  });

  it('renders the correct html when listCourses is empty', () => {
    const listCourses = [];
    const wrapper = shallow(<CourseList listCourses={listCourses} />);
    expect(wrapper.find('table')).toHaveLength(1);
    expect(wrapper.find('CourseListRow')).toHaveLength(3);
  });

  it('renders the correct html when listCourses is not empty', () => {
    const listCourses = [
      { id: 1, name: "ES6", credit: 60 },
      { id: 2, name: "Webpack", credit: 20 },
      { id: 3, name: "React", credit: 40 },
    ];
    const wrapper = shallow(<CourseList listCourses={listCourses}/>);
    expect(wrapper.find('table')).toHaveLength(1);
    expect(wrapper.find('CourseListRow')).toHaveLength(5);
  });
});


// This is an improve version of the previous test file

describe('CourseList component testing', () => {
  describe('With CourseList Empty', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<CourseList listCourses={[]} />);
    });

    it('CourseList renders without crashing', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders a table', () => {
      expect(wrapper.find('table')).toHaveLength(1);
      expect(wrapper.find('CourseListRow')).toHaveLength(3);
    });

    it('renders the correct html when listCourses is empty', () => {
      expect(wrapper.find('table')).toHaveLength(1);
      expect(wrapper.find('CourseListRow')).toHaveLength(3);
    });
  });

  describe('With CourseList containing elements', () => {
    let wrapper;

    beforeEach(() => {
      const listCourses = [
        { id: 1, name: "ES6", credit: 60 },
        { id: 2, name: "Webpack", credit: 20 },
        { id: 3, name: "React", credit: 40 },
      ];
      wrapper = shallow(<CourseList listCourses={listCourses} />);
    });

    it('CourseList renders without crashing', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders a table', () => {
      expect(wrapper.find('table')).toHaveLength(1);
      expect(wrapper.find('CourseListRow')).toHaveLength(5);
    });

    it('renders the correct html when listCourses is not empty', () => {
      expect(wrapper.find('table')).toHaveLength(1);
      expect(wrapper.find('CourseListRow')).toHaveLength(5);
    });
  });
});
