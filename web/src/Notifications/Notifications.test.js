import React from 'react';
import { shallow, mount } from 'enzyme';
import Notifications from './Notifications';
import NotificationItem from './NotificationItem';
import { StyleSheetTestUtils } from "aphrodite";
import { getLatestNotification } from '../utils/utils';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

const listNotifications = [
  { id: 1, type: "default", value: "New course available" },
  { id: 2, type: "urgent", value: "New resume available" },
  { id: 3, type: "urgent", html: getLatestNotification() },
];


describe('Notifications component testing', () => {
  it('Notifications renders without crashing', () => {
    const component = shallow(<Notifications />);
    expect(component).toMatchSnapshot();
  });

  it('Notifications renders a list with three items', () => {
    const component = shallow(<Notifications />);
    expect(component.contains(<NotificationItem />)).exist;
  });

  it('Notifications renders the text "Here is the list of notifications"', () => {
    const component = shallow(<Notifications />);
    expect(component.contains(<p>Here is the list of notifications</p>)).exist
  });

  // it('menu item is being displayed when displayDrawer is false', () => {
  //   const component = shallow(<Notifications />);
  //   expect(component.find('.menuItem')).toHaveLength(1);
  // });

  it('div.Notifications is not being displayed when displayDrawer is false', () => {
    const component = shallow(<Notifications />);
    expect(component.find('.Notifications')).toHaveLength(0);
  });

  // it('menu item is being displayed when displayDrawer is true', () => {
  //   const component = shallow(<Notifications displayDrawer={true} />);
  //   expect(component.find('.menuItem')).toHaveLength(1);
  // });

  // it('div.Notifications is being displayed when displayDrawer is true', () => {
  //   const component = shallow(<Notifications displayDrawer={true} />);
  //   expect(component.find('.Notifications')).toHaveLength(1);
  // });
  
  // it('should call console.log with the right message when markAsRead is called', () => {
  //   const markNotificationAsRead = jest.fn();
  //   const wrapper = mount(
  //     <Notifications
  //       displayDrawer
  //       listNotifications={listNotifications}
  //       markNotificationAsRead={markNotificationAsRead}
  //     />
  //   );

  //   const instance = wrapper.instance();

  //   // Call the markAsRead function
  //   instance.props.markNotificationAsRead(1);

  //   // Verify that console.log was called with the expected message
  //   expect(console.log).toHaveBeenCalledWith('Notification 1 has been marked as read');

  //   // Restore the original console.log function
  //   console.log.mockRestore();
  // });

  it('should not rerender when updating with the same list', () => {
    const wrapper = mount(
      <React.StrictMode>
        <Notifications listNotifications={listNotifications} />
      </React.StrictMode>
    );
  
    const updateSpy = jest.spyOn(wrapper.instance(), 'forceUpdate');
    const updatedList = listNotifications.slice(); // Copy the list
  
    wrapper.setProps({ listNotifications: updatedList });
  
    expect(updateSpy).toHaveBeenCalledTimes(0);
  
    // Clean up the spy
    updateSpy.mockRestore();
  });
  

  it('should rerender when updating with a longer list', () => {
    const listNotifications = [
      { id: 1, type: 'default', value: 'Notification 1' },
      { id: 2, type: 'urgent', html: '<strong>Notification 2</strong>' },
    ];
  
    const wrapper = mount(<Notifications listNotifications={listNotifications} />);
    const component = wrapper.find('Notifications');
  
    const shouldRerender = jest.spyOn(component.instance(), 'render');
    const updatedList = [...listNotifications, { id: 3, type: 'default', value: 'Notification 3' }];
  
    wrapper.setProps({ listNotifications: updatedList });
  
    expect(shouldRerender).toHaveBeenCalledTimes(1);
  });

  it('verify that clicking on the menu item calls handleDisplayDrawer', () => {
    const handleDisplayDrawer = jest.fn();
    const wrapper = shallow(<Notifications handleDisplayDrawer={handleDisplayDrawer} />);
    const spy = jest.spyOn(wrapper.instance().props, 'handleDisplayDrawer');
    wrapper.find('div').first().simulate('click');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
  
});
