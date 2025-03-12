import { filterTypeSelected, getNotifications, getUnreadNotifications } from "./notificationSelector";

describe("notificationSelector", () => {
    describe("filterTypeSelected", () => {
        it("should return the filter type selected from the state", () => {
            const state = {
                filterType: "important",
            };
            const result = filterTypeSelected(state);
            expect(result).toEqual("important");
        });
    });

    describe("getNotifications", () => {
        it("should return a list of message entities within the reducer", () => {
            const state = {
                notifications: [
                    { id: 1, message: "Notification 1" },
                    { id: 2, message: "Notification 2" },
                ],
            };
            const result = getNotifications(state);
            expect(result).toEqual([
                { id: 1, message: "Notification 1" },
                { id: 2, message: "Notification 2" },
            ]);
        });
    });

    describe('getUnreadNotifications', () => {
        it('should return a list of message entities within the reducer', () => {
            const state = {
                notifications: [
                    { id: 1, isRead: false, message: "Notification 1" },
                    { id: 2, isRead: true, message: "Notification 2" },
                    { id: 3, isRead: false, message: "Notification 3" },
                ],
            };
            const result = getUnreadNotifications(state);
            expect(result).toEqual(new Map([
                [1, { id: 1, isRead: false, message: "Notification 1" }],
                [3, { id: 3, isRead: false, message: "Notification 3" }],
            ]));
        });
    });
});
