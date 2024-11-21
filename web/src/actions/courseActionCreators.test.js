import { selectCourse, unSelectCourse } from "./courseActionCreators";

describe("Test selectCourse action", () => {
    it("selectCourse returns correct object", () => {
        const result = selectCourse(1);
        expect(result).toEqual({ type: "SELECT_COURSE", index: 1 });
    });
});

describe("Test unSelectCourse action", () => {
    it("unSelectCourse returns correct object", () => {
        const result = unSelectCourse(1);
        expect(result).toEqual({ type: "UNSELECT_COURSE", index: 1 });
    });
});
