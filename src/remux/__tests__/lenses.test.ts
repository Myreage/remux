import { Reducer, composeLensWithReducer, createLens } from "../lenses";

describe("Lenses", () => {
  it("lens get", () => {
    let baseState = {
      cars: ["volvo", "renault"],
      backgroundColor: "red",
    };

    const lens = createLens("backgroundColor");
    const getValue = lens.get(baseState);
    expect(getValue).toEqual("red");
  });
  it("lens set", () => {
    let baseState = {
      cars: ["volvo", "renault"],
      backgroundColor: "red",
    };

    const lens = createLens("backgroundColor");
    const stateAfterSet = lens.set("blue")(baseState);
    expect(stateAfterSet).toEqual({
      cars: ["volvo", "renault"],
      backgroundColor: "blue",
    });
  });
  it("lens compose", () => {
    let baseState = {
      cars: ["volvo", "renault"],
      backgroundColor: "red",
    };

    const lens = createLens("backgroundColor");

    const reducer: Reducer<string> = () => "pink";

    const stateAfterCompose = composeLensWithReducer(lens)(reducer)(baseState);
    expect(stateAfterCompose).toEqual({
      cars: ["volvo", "renault"],
      backgroundColor: "pink",
    });
  });
});
