import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {css, StyleSheet} from 'aphrodite';

export default function FileListRow({ isHeader, textFirstCell, textSecondCell, textThirdCell }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  
  return (
    <tr className={isHeader ? css(styles.header) : css(styles.normal, isChecked && styles.rowChecked)}>
      {isHeader ? (
        textSecondCell === null && textThirdCell === "" ? (
          <th colSpan={3}>{textFirstCell}</th>
        ) : (
          <>
            <th>{textFirstCell}</th>
            <th>{textSecondCell}</th>
            <th>{textThirdCell}</th>
          </>
        )
      ) : (
        <>
          <td className={css(styles.td)} >
              <input
                type="checkbox"
                onChange={handleCheckbox}
                checked={isChecked}
              />
            {textFirstCell}
          </td>
          <td className={css(styles.tdMeta)} >{textSecondCell}</td>
          <td className={css(styles.tdMeta)} >{textThirdCell}</td>
        </>
      )}
    </tr>
  );
}

const styles = StyleSheet.create({
  td: {
    paddingLeft: "4px",
    display: "flex",
    gap: "8px",
  },
  tdMeta: {
    paddingLeft: "4px",
    color: "gray",
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

FileListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  textThirdCell: PropTypes.string,
}
