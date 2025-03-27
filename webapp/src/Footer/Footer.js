import React from 'react';
import './Footer.css';
import {getFullYear} from '../utils/utils';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import WithLogging from "../HOC/WithLogging";

function Footer({appName}) {
  return (
    <>
      <div className="App-footer">
        <p>Copyright {getFullYear()} - {appName}</p>
        </div>
    </>
  );
}

Footer.propTypes = {
  appName: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  appName: state.ui.get('appName'),
});

const ConnectedFooter = connect(mapStateToProps, null)(Footer);
const LoggedFooter = WithLogging(ConnectedFooter);

export { LoggedFooter as Footer };
