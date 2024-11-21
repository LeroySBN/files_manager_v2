import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

export default function CourseListRow({ isHeader, textFirstCell, textSecondCell }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  
  return (
    <tr className={isHeader ? css(styles.header) : css(styles.normal, isChecked && styles.rowChecked)}>
      {isHeader ? (
        textSecondCell === null ? (
          <th colSpan={2}>{textFirstCell}</th>
        ) : (
          <>
            <th>{textFirstCell}</th>
            <th>{textSecondCell}</th>
          </>
        )
      ) : (
        <>
          <td className={css(styles.td)} >
            {/* {isChecked && ( */}
              <input
                type="checkbox"
                onChange={handleCheckbox}
                checked={isChecked}
              />
            {/* )} */}
            {textFirstCell}
          </td>
          <td className={css(styles.td)} >{textSecondCell}</td>
        </>
      )}
    </tr>
  );
}

const styles = StyleSheet.create({
  td: {
    paddingLeft: "4px",
  },
  header: {
    backgroundColor: "#deb5b545",
  },

  normal: {
    backgroundColor: "#f5f5f5ab",
  },

  rowChecked: {
    backgroundColor: "#e6e4e4",
  },
});

CourseListRow.propTypes = {
    isHeader: PropTypes.bool,
    textFirstCell: PropTypes.string.isRequired,
    textSecondCell: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
}

CourseListRow.defaultProps = {
    isHeader: false,
    textSecondCell: null,
}
