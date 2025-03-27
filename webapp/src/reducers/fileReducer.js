import {FILE_ACTIONS} from '../actions/fileActions';
import {Map, List} from 'immutable';
import {filesNormalizer} from '../schema/files';

const initialState = Map({
    entities: Map({
        files: Map(),
    }),
    lists: Map({
        home: List(),
        files: List(),
        photos: List(),
        shared: List(),
    }),
});

const fileReducer = (state = initialState, action) => {
    switch (action.type) {
        case FILE_ACTIONS.FETCH_FILE_SUCCESS:
            const normalizedData = filesNormalizer(action.payload);
            return state.mergeDeep(normalizedData);
        
        case FILE_ACTIONS.SELECT_FILE:
            return state.setIn(['entities', 'files', action.index, 'isSelected'], true);

        case FILE_ACTIONS.UNSELECT_FILE:
            return state.setIn(['entities', 'files', action.index, 'isSelected'], false);

        case FILE_ACTIONS.CLEAR_FILE:
            return state.set('lists', initialState.get('lists'));

        default:
            return state;
    }
};

export default fileReducer;
