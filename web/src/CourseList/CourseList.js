import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from 'aphrodite';
import CourseListRow from "./CourseListRow";
import { CourseShape } from "./CourseShape";

export default function CourseList({ listCourses }) {
  return (
    <table id="CourseList"className={css(styles.courseTable)}>
      <thead>
        <CourseListRow textFirstCell="Available courses" textSecondCell={null} isHeader={true} />
        <CourseListRow textFirstCell="Course name" textSecondCell="Credit" isHeader={true} />
      </thead>
      <tbody>
      {listCourses.length > 0 ? (
          listCourses.map(({ id, name, credit }) => <CourseListRow key={id} textFirstCell={name} textSecondCell={credit} />)
        ) : (
          <CourseListRow textFirstCell="No course available yet" />
        )}
      </tbody>
    </table>
  );
}

CourseList.propTypes = {
  listCourses: PropTypes.arrayOf(CourseShape),
};

CourseList.defaultProps = {
  listCourses: [],
};

const styles = StyleSheet.create({
  courseTable: {
    marginTop: "2em",
    width: "100%",
    border: "1px solid #ddd",
    fontSize: "1.2rem",
    margin: "auto",
  },
})
