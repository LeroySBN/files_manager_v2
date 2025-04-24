import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from 'redux-thunk';
import { Map } from 'immutable';

import {login, signup, logout, AUTH_ACTIONS} from "./authActions";

describe("Test authActionCreators.js", () => {
    it("test login", () => {
        const result = login("email", "password");
        expect(result).toEqual({ type: AUTH_ACTIONS.LOGIN_REQUEST, user: { email: "email", password: "password" } });
    });

    it("test logout", () => {
        const result = logout();
        expect(result).toEqual({ type: AUTH_ACTIONS.LOGOUT });
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

        store.dispatch(loginRequest(user.email, user.password));
        const actions = store.getActions();
        expect(actions[0]).toEqual(login(user.email, user.password));
        expect(actions[1]).toEqual(loginFailure());
    });
});
