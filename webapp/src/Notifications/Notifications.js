import React from 'react';
import PropTypes from 'prop-types';
import {css, StyleSheet} from 'aphrodite';
import closeIcon from '../assets/close-icon.png';
import unreadNotificationsIcon from '../assets/notifications_unread.png';
import readNotificationsIcon from '../assets/notifications.png';
import NotificationItem from './NotificationItem';
import {NotificationItemShape} from './NotificationItemShape';
import {notification} from "../schema/notifications";

class Notifications extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('Notifications props:', this.props);

    return (
      <React.Fragment>
        { !this.props.displayDrawer ? (
          <div
            className={css(styles.menuItem)}
            onClick={()=> {
              console.log('handleDisplayDrawer called');
              console.log(this.props.handleDisplayDrawer);
              this.props.handleDisplayDrawer();
            }}
          >
            <img className={css(styles.notificationIcon)} src={unreadNotificationsIcon} alt="unread notifications" />
          </div>
        ) : (
          <div className={css(styles.Notifications)}>
            <button 
              style={{ display: "flex", justifyContent: "flex-end", margin: "6px 6px 0 0", padding: "0", border: "none", cursor: "pointer", position: "absolute", top: "2px", right: "2px" }}
              aria-label="Close" 
              onClick={() => {
                this.props.handleHideDrawer();
              }}
            >
              <img className={css(styles.closeIcon)} src={closeIcon} alt='closeIcon' />
            </button>

            {this.props.listNotifications && this.props.listNotifications.length > 0 ? (
              <div>
                <p>Here is the list of notifications</p>
                <ul className={css(styles.ul)}>
                  {this.props.listNotifications.map(({ id, type, value, html }) => (
                    <NotificationItem
                      id={id}
                      key={id}
                      type={type}
                      value={value}
                      html={html}
                      markAsRead={this.props.markNotificationAsRead}
                    />
                  ))}
                </ul>
              </div>
            ) : (
            <p>No new notification for now</p>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

const opacityKeyframes = {
  'from': {
      opacity: 0.5,
  },

  'to': {
      opacity: 1,
  }
};

const translateKeyframes = {
  '0%': {
      transform: 'translateY(0)',
  },

  '50%': {
      transform: 'translateY(-5px)',
  },

  '100%': {
      transform: 'translateY(5)',
  },
};

const styles = StyleSheet.create({
  menuItem: {
    position: 'absolute',
    top: '0',
    right: '0',
    padding: '4px',
    ':hover': {
      cursor: 'pointer',
      // backgroundColor: '#fff8f8',
      background: 'transparent',
      animationName: [opacityKeyframes, translateKeyframes],
      animationDuration: '1s, 0.5s',
      animationIterationCount: '3',
    },
  },
  Notifications: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    padding: '8px 16px',
    border: '2px #e1003c dotted',
    color: '#000000',
    fontFamily: 'Helvetica, sans-serif',
    fontSize: '1rem',
    textAlign: 'left',
    backgroundColor: '#fff8f8',
    '@media (max-width: 900px)': {
      top: '0',
      right: '0',
      margin: '0',
      padding: '0',
      width: '100%',
      height: '100%',
      border: 'none',
      zIndex: '3',
    },
  },
  notificationIcon: {
    width: '30px',
    height: '30px',
  },
  closeIcon: {
    margin: '0',
    height: '15px',
  },
  ul: {
    '@media (max-width: 900px)': {
      listStyle: 'none',
      padding: '0',
      fontSize: '20px',
    },
  }
});

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: ()=> {},
};

export default Notifications;
