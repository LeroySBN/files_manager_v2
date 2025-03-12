import { LOGIN, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER } from "./uiActionTypes";
import { login, logout, displayNotificationDrawer, hideNotificationDrawer, loginRequest } from "./uiActionCreators";
import fetchMock from "fetch-mock";
// import { configureStore } from '@reduxjs/toolkit';
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import uiReducer, { initialState} from "../reducers/uiReducer";
import { Map } from 'immutable';

describe("Test uiActionCreators.js", () => {
    it("test login", () => {
        const result = login("email", "password");
        expect(result).toEqual({ type: LOGIN, user: { email: "email", password: "password" } });
    });

    it("test logout", () => {
        const result = logout();
        expect(result).toEqual({ type: LOGOUT });
    });

    it("test displayNotificationDrawer", () => {
        const result = displayNotificationDrawer();
        expect(result).toEqual({ type: DISPLAY_NOTIFICATION_DRAWER });
    });

    it("test hideNotificationDrawer", () => {
        const result = hideNotificationDrawer();
        expect(result).toEqual({ type: HIDE_NOTIFICATION_DRAWER });
    });

    it("test loginRequest", () => {
      const middleware = [thunk];
      const mockStore = configureMockStore(middleware);
      const store = mockStore(Map(initialState));
      
      fetchMock.mock("http://localhost:8564/login-success.json", { email: "test@test.com" });

      const user = {
        email: "test@test.com",
        password: "123456",
      };

      store
        .dispatch(loginRequest(user.email, user.password));
      const actions = store.getActions();
      expect(actions[0]).toEqual(login(user.email, user.password));
      expect(actions[1]).toEqual(loginFailure());
    });
});
