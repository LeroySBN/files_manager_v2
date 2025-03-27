import { selectFile, unSelectFile } from "./fileActionCreators";

describe("Test selectFile action", () => {
    it("selectFile returns correct object", () => {
        const result = selectFile(1);
        expect(result).toEqual({ type: "SELECT_FILE", index: 1 });
    });
});

describe("Test unSelectFile action", () => {
    it("unSelectFile returns correct object", () => {
        const result = unSelectFile(1);
        expect(result).toEqual({ type: "UNSELECT_FILE", index: 1 });
    });
});
