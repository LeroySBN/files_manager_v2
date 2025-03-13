import React from "react";
import { shallow, mount } from "enzyme";
import NotificationItem from "./NotificationItem";
import { StyleSheetTestUtils } from "aphrodite";

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});


describe("NotificationItem component testing", () => {
  it("NotificationItem renders without crashing", () => {
    const component = shallow(<NotificationItem />);
    expect(component).toMatchSnapshot();
  });

  it('renders the correct html with type and value props', () => {
    const wrapper = shallow(<NotificationItem type="default" value="test" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the correct html', () => {
    const wrapper = shallow(<NotificationItem html={{ __html: '<u>test</u>' }} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe("NotificationItem component events testing", () => {  
  it('should call markAsRead with the correct ID when clicked', () => {
    const id = 1;
    const spy = jest.fn();
    const wrapper = mount(
      <NotificationItem
        id={id}
        type="default"
        value="New notification"
        markAsRead={spy}
      />
    );
  
    // Find the list item and simulate a click
    const listItem = wrapper.find('li');
    listItem.simulate('click');
  
    // Verify that the spy was called with the correct ID
    expect(spy).toHaveBeenCalledWith(id);
  });
});
