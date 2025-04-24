import React from 'react';
import { shallow } from 'enzyme';
import FileList from './FileList';
import { StyleSheetTestUtils } from "aphrodite";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('FileList component testing', () => {
  it('FileList renders without crashing', () => {
    const component = shallow(<FileList />);
    expect(component).toMatchSnapshot();
  });

  it('renders a table', () => {
    const wrapper = shallow(<FileList />);
    expect(wrapper.find('table')).toHaveLength(1);
    expect(wrapper.find('FileListRow')).toHaveLength(3);
  });

  it('renders the correct html when listCourses is empty', () => {
    const listCourses = [];
    const wrapper = shallow(<FileList listCourses={listCourses} />);
    expect(wrapper.find('table')).toHaveLength(1);
    expect(wrapper.find('FileListRow')).toHaveLength(3);
  });

  it('renders the correct html when listCourses is not empty', () => {
    const listCourses = [
      { id: 1, name: "ES6", credit: 60 },
      { id: 2, name: "Webpack", credit: 20 },
      { id: 3, name: "React", credit: 40 },
    ];
    const wrapper = shallow(<FileList listCourses={listCourses}/>);
    expect(wrapper.find('table')).toHaveLength(1);
    expect(wrapper.find('FileListRow')).toHaveLength(5);
  });
});


// This is an improve version of the previous test file

describe('FileList component testing', () => {
  describe('With FileList Empty', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<FileList listCourses={[]} />);
    });

    it('FileList renders without crashing', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders a table', () => {
      expect(wrapper.find('table')).toHaveLength(1);
      expect(wrapper.find('FileListRow')).toHaveLength(3);
    });

    it('renders the correct html when listCourses is empty', () => {
      expect(wrapper.find('table')).toHaveLength(1);
      expect(wrapper.find('FileListRow')).toHaveLength(3);
    });
  });

  describe('With FileList containing elements', () => {
    let wrapper;

    beforeEach(() => {
      const listCourses = [
        { id: 1, name: "ES6", credit: 60 },
        { id: 2, name: "Webpack", credit: 20 },
        { id: 3, name: "React", credit: 40 },
      ];
      wrapper = shallow(<FileList listCourses={listCourses} />);
    });

    it('FileList renders without crashing', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders a table', () => {
      expect(wrapper.find('table')).toHaveLength(1);
      expect(wrapper.find('FileListRow')).toHaveLength(5);
    });

    it('renders the correct html when listCourses is not empty', () => {
      expect(wrapper.find('table')).toHaveLength(1);
      expect(wrapper.find('FileListRow')).toHaveLength(5);
    });
  });
});
