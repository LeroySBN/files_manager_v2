import React from "react";
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';


class NotificationItem extends React.PureComponent {
  render() {
    const { type, value, html, markAsRead, id } = this.props;
    return (
      <React.Fragment>
        {type && value ? 
          <li
            className={
              type === "default" ? css(styles.default) : css(styles.urgent)
            }
            onClick={()=> markAsRead(id)}
            data-notification-type={type} >{value}
          </li>
        : null}
        {html ?
          <li
            className={css(styles.urgent)}
            onClick={()=> markAsRead(id)}
            data-notification-type="urgent"
            dangerouslySetInnerHTML={{__html: html}}
          />
        : null}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  default: {
    color: 'blue',
    cursor: 'pointer',
    '@media (max-width: 900px)': {
      borderBottom: '1px solid black',
      fontSize: '20px',
      padding: '10px 8px',
    },
  },
  urgent: {
    color: 'red',
    cursor: 'pointer',
    '@media (max-width: 900px)': {
      borderBottom: '1px solid black',
      fontSize: '20px',
      padding: '10px 8px',
    },
  },
});

NotificationItem.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  __html: PropTypes.shape({ html: PropTypes.string }),
  markAsRead: PropTypes.func,
};

NotificationItem.defaultProps = {
  type: 'default',
  markAsRead: () => {},
  id: 0,
};

export default NotificationItem;
