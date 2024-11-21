import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, css } from "aphrodite";
import BodySection from "./BodySection";

class BodySectionWithMarginBottom extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={css(styles.bodySectionWithMargin)}>
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
  },
});

export default BodySectionWithMarginBottom;
