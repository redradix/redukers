# ToDo

- Add `requestById` module
  - Naming doubts (`requestWithId`? `keyedRequest`? `parametrizedRequest`?)

- README version and publish instructions

- Test tree-shaking
  - https://medium.com/@toastui/building-a-ui-library-capable-of-tree-shaking-from-a-to-z-b3f8a9be589f

- Test ES5 compiled version

- Test that you can import individual submodules via `'redukers/xxx'` (both
  modules and CommonJS)

- Add comments that it can be used outside of Redux (e.g. `useReducer` hook)
  since they're just reducers

## Discuss with team

- Review naming choices

- Generic action creators (`payloadActions`) vs specific action creator for each
  possible action

- A way to have `undefined` in `value`

  - Just don't use `undefined`

  - `maybeValue` that wraps internal state in `{ value }` and has a `getValue`
    selector

  - `unsafeCombineReducers` that just ignores the `undefined` check

  - `combineReducers` wrapper that ignores the `undefined` check onyl for
    `value` reducers

- Talk in a specific #redukers channel or use #unit-development?

- Maybe manually currify up to `state` in selectors
