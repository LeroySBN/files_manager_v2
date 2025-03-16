import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, css } from 'aphrodite';
import CourseListRow from "./CourseListRow";
import { CourseShape } from "./CourseShape";

export default function CourseList({ listCourses }) {
  return (
    <table id="CourseList"className={css(styles.courseTable)}>
      <thead>
        <CourseListRow textFirstCell="My files" textSecondCell={null} isHeader={true} />
        <CourseListRow textFirstCell="File name" textSecondCell="Size" isHeader={true} />
      </thead>
      <tbody>
      {listCourses.length > 0 ? (
          listCourses.map(({ id, name, credit }) => <CourseListRow key={id} textFirstCell={name} textSecondCell={credit} />)
        ) : (
          <CourseListRow textFirstCell="No Files available yet" />
        )}
      </tbody>
    </table>
  );
}

CourseList.propTypes = {
  listCourses: PropTypes.arrayOf(CourseShape),
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
