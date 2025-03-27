import { createSelector } from 'reselect';
import { List, Map } from 'immutable';

const getAllFiles = (state) => state.file.getIn(['entities', 'files']);
const getListIds = (state, listName) => state.file.getIn(['lists', listName]);

export const fileSelector = createSelector(
    [getAllFiles, getListIds],
    (allFiles, listIds) => {
        if (!allFiles || !listIds) {
            return List();
        }
        return listIds.map((id) => allFiles.get(id)).toList();
    }
);
