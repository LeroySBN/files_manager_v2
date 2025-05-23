import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from "aphrodite";
import FileListRow from './FileListRow';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('FileListRow component test', () => {
  it('renders without crashing', () => {
    const component = shallow(<FileListRow textFirstCell="test" />);
    expect(component).toMatchSnapshot();
  });

  it("should render one cell with colspan = 2 when textSecondCell null", () => {
    const wrapper = shallow(<FileListRow isHeader={true} textFirstCell="test" textSecondCell={null} />);

    expect(wrapper.find("tr").children()).toHaveLength(1);
    expect(wrapper.find("tr").childAt(0).html()).toEqual('<th colSpan="2">test</th>');
  });

  it("should render two cells when textSecondCell not null", () => {
    const wrapper = shallow(<FileListRow isHeader={false} textFirstCell="test" textSecondCell="test" />);

    expect(wrapper.find("tr").children()).toHaveLength(2);
    // expect(wrapper.find("tr").childAt(0).html()).toEqual("<td>test</td>");
    // expect(wrapper.find("tr").childAt(1).html()).toEqual("<td>test</td>");
  });
});
