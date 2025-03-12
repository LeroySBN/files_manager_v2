import { getFooterCopy, getFullYear, getLatestNotification } from './utils';

test("Returns correct year", () => {
  expect(getFullYear()).toBe(new Date().getFullYear());
});

test("Returns expected footer copy", () => {
  expect(getFooterCopy(false)).toBe("Holberton School main dashboard");
  expect(getFooterCopy(true)).toBe("Holberton School");
});

test("Returns expected Notification", () => {
  expect(getLatestNotification()).toBe(
    "<strong>Urgent requirement</strong> - complete by EOD"
  );
});
