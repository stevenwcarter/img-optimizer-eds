import "@testing-library/jest-dom";
import createMultiOptimizedPicture, { PictureProps } from "..";

describe("createMultiOptimizedPicture", () => {
  let pic: PictureProps;
  let pic1: PictureProps;
  let pic2: PictureProps;
  beforeEach(() => {
    pic = {
      src: "https://test.com/img.jpg",
    };
    pic1 = {
      src: "https://test.com/img2.jpg",
      breakpoints: [{ width: 1000 }],
    };
    pic2 = {
      src: "https://test.com/img.jpg",
      breakpoints: [{ media: "(min-width: 600px)", width: 2000 }],
    };
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("matches snapshot w eager=lazy", () => {
    const result = createMultiOptimizedPicture([pic]);

    expect(result).toMatchSnapshot();
  });
  it("matches snapshot w eager=true", () => {
    pic.eager = true;
    const result = createMultiOptimizedPicture([pic]);

    expect(result).toMatchSnapshot();
  });
  it("mimics the existing version with only a single element", () => {
    const result = createMultiOptimizedPicture([pic]);

    expect(result!.querySelectorAll("source").length).toBe(3);
  });
  it("multiple photos has correct number of `source` elements", () => {
    const result = createMultiOptimizedPicture([pic1, pic2]);

    expect(result!.querySelectorAll("source").length).toBe(2);
  });
  it("multiple photos has only one `img` tag", () => {
    const result = createMultiOptimizedPicture([pic1, pic2]);

    expect(result!.querySelectorAll("img").length).toBe(1);
  });
  it("multiple photos matches snapshot", () => {
    const result = createMultiOptimizedPicture([pic1, pic2]);

    expect(result).toMatchSnapshot();
  });
  it("should return null with empty array as input", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(createMultiOptimizedPicture([])).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith("No pictures provided");
  });
});
