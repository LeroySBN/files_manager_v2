import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from './courseActionTypes';

export const selectCourse = (index) => {
  return {
    type: SELECT_COURSE,
    index,
  };
}

export const unSelectCourse = (index) => {
  return {
    type: UNSELECT_COURSE,
    index,
  };
}

export const fetchCourseSuccess = (data) => {
  return {
    type: FETCH_COURSE_SUCCESS,
    data,
  };
}

export const useCourseActionCreators = () => {
  const dispatch = useDispatch();

  return {
    boundSelectCourse: bindActionCreators(selectCourse, dispatch),
    boundUnSelectCourse: bindActionCreators(unSelectCourse, dispatch),
  };
};
