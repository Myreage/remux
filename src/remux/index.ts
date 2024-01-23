import { Reducer } from "./lenses";

type Store<State> = {
  apply: (reducer: Reducer<State>) => void;
  readState: () => Readonly<State>;
};

export const initStore = <State>(initialState: State): Store<State> => {
  let state = initialState;

  return {
    readState: () => state,
    apply: (reducer) => {
      state = reducer(state);
    },
  };
};
