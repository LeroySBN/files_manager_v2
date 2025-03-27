import {createAction} from '@reduxjs/toolkit';
import {fileService} from "../services/api";

// Action types
export const FILE_ACTIONS = {
    FETCH_FILE_SUCCESS: 'file/FETCH_FILES_SUCCESS',
    CREATE_FILE: 'file/CREATE_FILE',
    UPDATE_FILE: 'file/UPDATE_FILE',
    DELETE_FILE: 'file/DELETE_FILE',
    SELECT_FILE: 'file/SELECT_FILE',
    UNSELECT_FILE: 'file/UNSELECT_FILE',
    CLEAR_FILE: 'file/CLEAR_FILE',
};

// Action creators
const fetchFileSuccess = createAction(FILE_ACTIONS.FETCH_FILE_SUCCESS, (files) => ({ payload: files }));
const selectFile = createAction(FILE_ACTIONS.SELECT_FILE, (index) => ({payload: index,}));
const unSelectFile = createAction(FILE_ACTIONS.UNSELECT_FILE, (index) => ({payload: index,}));
const clearFile = createAction(FILE_ACTIONS.CLEAR_FILE);

// Thunk actions
export const fetchFilesAction = () => async (dispatch) => {
    try {
        const files = await fileService.listFiles();
        dispatch(fetchFileSuccess(files));
    } catch (error) {
        console.error('Error fetching files:', error);
    }
};

export const clearFilesAction = () => async (dispatch) => {
    dispatch(clearFile());
};

