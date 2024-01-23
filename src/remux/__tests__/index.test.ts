import { initStore } from "..";
import { Reducer } from "../lenses";

describe("General", () => {
  it("Counter", () => {
    const store = initStore(0);

    const incrementCounter: Reducer<number> = (state) => state + 1;

    store.apply(incrementCounter);
    expect(store.readState()).toEqual(1);
  });

  it("Counter in object", () => {
    type State = {
      counter: number;
    };

    const store = initStore({ counter: 0 });

    const incrementCounter: Reducer<State> = (state) => ({
      counter: state.counter + 1,
    });

    store.apply(incrementCounter);
    expect(store.readState()).toEqual({
      counter: 1,
    });
  });
});

describe("With lenses", () => {
  it("Big store", () => {
    type Car = {
      color: string;
      brand: string;
    };
    type State = {
      cars: Car[];
      customers: { name: string }[];
      companyInfo: {
        name: string;
        siret: string;
        address: string;
      } | null;
    };

    const store = initStore<State>({
      cars: [],
      customers: [],
      companyInfo: null,
    });

    // TODO: on aimerait bien pouvoir agir juste sur cars et pas se retaper tout le state à chaque fois
    const addCarReducerFactory =
      (car: Car): Reducer<State> =>
      (state) => ({
        ...state,
        cars: [...state.cars, car],
      });

    const carToAdd: Car = {
      brand: "volvo",
      color: "kaki",
    };

    store.apply(addCarReducerFactory(carToAdd));
    expect(store.readState()).toEqual({
      cars: [carToAdd],
      customers: [],
      companyInfo: null,
    });
  });
});
