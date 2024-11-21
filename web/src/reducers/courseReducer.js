import {
    FETCH_COURSE_SUCCESS,
    SELECT_COURSE,
    UNSELECT_COURSE,
} from '../actions/courseActionTypes';
import {Map, List } from 'immutable';
import { coursesNormalizer } from '../schema/courses';

// const initialState = [];
const initialState = Map({});

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COURSE_SUCCESS:
            // return action.data.map((course) => ({
            //     ...course,
            //     isSelected: false,
            // }));
            const normalizedData = coursesNormalizer(action.data);
            return state.mergeDeep(normalizedData);
        
        case SELECT_COURSE:
            // return state.map((course, index) =>
            //     index === action.index ? {...course, isSelected: true,} : course
            // );
            return state.setIn(['entities', 'courses', action.index, 'isSelected'], true);

        case UNSELECT_COURSE:
            // return state.map((course, index) =>
            //     index === action.index ? {...course, isSelected: false,} : course
            // );
            return state.setIn(['entities', 'courses', action.index, 'isSelected'], false);

        default:
            return state;
    }
};

export default courseReducer;
