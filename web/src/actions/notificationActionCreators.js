import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { MARK_AS_READ, SET_TYPE_FILTER, FETCH_NOTIFICATIONS_SUCCESS } from "./notificationActionTypes";

export const markAsAread = (index) => {
    return {
        type: MARK_AS_READ,
        index
    }
}

export const setNotificationFilter = (filter) => {
    return {
        type: SET_TYPE_FILTER,
        filter
    }
}

export const fetchNotificationsSuccess = (data) => {
    return {
        type: FETCH_NOTIFICATIONS_SUCCESS,
        data
    }
}

export const useNotificationActionCreators = () => {
    const dispatch = useDispatch();

    return {
        boundMarkAsAread: bindActionCreators(markAsAread, dispatch),
        boundSetNotificationFilter: bindActionCreators(setNotificationFilter, dispatch),
        boundFetchNotificationsSuccess: bindActionCreators(fetchNotificationsSuccess, dispatch)
    };
};
