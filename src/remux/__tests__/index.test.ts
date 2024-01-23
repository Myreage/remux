import { initStore } from "..";
import { Reducer } from "../lenses";

describe("General", () => {
  it("General", () => {
    const store = initStore(0);

    const incrementCounter: Reducer<number> = (state) => state + 1;

    store.apply(incrementCounter);

    expect(store.readState()).toEqual(1);
  });
});
