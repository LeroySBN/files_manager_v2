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
        <NavigationPane />
        <BodySection {...this.props} />
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
    marginBottom: "40px",
    padding: "0 2vw",
    display: "grid",
    gridTemplateColumns: "1fr 4fr",
    minHeight: "100vh",
    background: 'transparent',
    '@media (max-width: 432px)': {
      gridTemplateColumns: "1fr 5fr",
    },
  },
});

export default BodySectionWithMarginBottom;
