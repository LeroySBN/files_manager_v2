import {UI_ACTIONS} from "./uiActions";

describe("Test uiActionCreators.js", () => {
    it("test displayNotificationDrawer", () => {
        const result = displayNotificationDrawer();
        expect(result).toEqual({ type: UI_ACTIONS.DISPLAY_NOTIFICATION_DRAWER });
    });

    it("test hideNotificationDrawer", () => {
        const result = hideNotificationDrawer();
        expect(result).toEqual({ type: UI_ACTIONS.HIDE_NOTIFICATION_DRAWER });
    });
});
