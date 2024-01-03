export type Lens<V, U> = {
  get: (state: V) => U;
  set: (subState: U) => (state: V) => V;
};

export const createLens = <
  State extends Record<string, any>,
  T extends keyof State
>(
  key: T
): Lens<State, State[T]> => ({
  get: (state: State) => state[key],
  set: (input: State[T]) => (state: State) => ({
    ...state,
    [key]: input,
  }),
});

export type Reducer<State> = (state: State) => State;

export const composeLensWithReducer =
  <V, U>(lens: Lens<V, U>) =>
  (reducer: Reducer<U>): Reducer<V> =>
  (value) =>
    lens.set(reducer(lens.get(value)))(value);
