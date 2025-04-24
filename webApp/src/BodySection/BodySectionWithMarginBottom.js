import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, css } from "aphrodite";
import BodySection from "./BodySection";
import {NavigationPane} from "../NavigationPane/NavigationPane";

class BodySectionWithMarginBottom extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={css(styles.bodySectionWithMargin)}>
        <div className={`${css(styles.bodyContainer)} container`}>
          <NavigationPane />
          <BodySection {...this.props} />
        </div>
      </div>
    );
  }
}

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

const styles = StyleSheet.create({
  bodySectionWithMargin: {
    margin: "20px 0",
    minHeight: "100vh",
    background: 'transparent',
  },
  bodyContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 4fr",
    '@media (max-width: 432px)': {
      gridTemplateColumns: "1fr 5fr",
    },
  }
});

export default BodySectionWithMarginBottom;
