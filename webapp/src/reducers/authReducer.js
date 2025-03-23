import { Map } from 'immutable';
import { AUTH_ACTIONS } from '../actions/authActions';

const initialState = Map({
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
  message: null,
  signupEmail: null,
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_REQUEST:
    case AUTH_ACTIONS.SIGNUP_REQUEST:
      return state.merge({
        loading: true,
        error: null,
        message: null,
      });

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return state.merge({
        isLoggedIn: true,
        user: action.payload,
        loading: false,
        error: null,
        message: null,
      });

    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.SIGNUP_FAILURE:
      return state.merge({
        isLoggedIn: false,
        user: null,
        loading: false,
        error: action.payload,
        message: null,
      });

    case AUTH_ACTIONS.SIGNUP_SUCCESS:
      return state.merge({
        isLoggedIn: false,
        loading: false,
        error: null,
        message: action.payload.message,
        signupEmail: action.payload.email,
      });

    // case AUTH_ACTIONS.LOGOUT:
    //   return state.merge({
    //     isLoggedIn: false,
    //     user: null,
    //     loading: false,
    //     error: null,
    //     message: null,
    //     signupEmail: null,
    //   });

    case AUTH_ACTIONS.SET_USER:
      return state.merge({
        isLoggedIn: true,
        user: action.payload,
        loading: false,
        error: null,
      });

    case AUTH_ACTIONS.CLEAR_AUTH_MESSAGE:
      return state.merge({
        message: null,
        signupEmail: null,
      });

    default:
      return state;
  }
};

export default authReducer;
