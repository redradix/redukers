# Redukers

![Downloads](https://badgen.net/npm/dt/redukers)
![Version](https://badgen.net/npm/v/redukers)
![License](https://badgen.net/npm/license/redukers)
![Dependencies](https://badgen.net/david/dep/redradix/redukers)
![Size](https://badgen.net/bundlephobia/min/redukers)
![CI](https://github.com/redradix/redukers/actions/workflows/testing/badge.svg)

Reusable Redux atoms. Provides composable data structures in form of a reducer
and its accompanying selectors.

## Concepts

### Reduker

A [reducer](https://redux.js.org/basics/reducers) creator and a set of
[selectors](https://daveceddia.com/redux-selectors/) to access its internal
state. The created reducer reacts to actions matching the configured
`Pattern`s (see below).

Redukers are very minimal, and intended to handle a small slice of state (a
particular data structure). The application state is therefore grown by
composing there redukers (or other custom reducers) manually or via
[`combineReducers`](https://redux.js.org/api/combinereducers).

### Patterns

Redukers can be defined to react to specific actions via `Pattern`s. A `Pattern`
can be a `string` (i.e. an action type to react to), an `Array<string>` (i.e. an
array of action types to react to) or a predicate `(action: Action) => boolean`
that returns `true` if it should react to the action.

```ts
type Pattern =
  | string
  | Array<string>
  | ((action: Action) => boolean)
```

### Flux Standard Actions

https://github.com/redux-utilities/flux-standard-action

## Modules

See each module for in-depth documentation:

- [`value`](./lib/value/): Holds a single value.

  > **WARNING:** This module cannot hold `undefined` values (see
  > https://redux.js.org/recipes/structuring-reducers/initializing-state#summary).
  > Use `null`, `false` or other appropriate value instead.

- [entities](./lib/entities/): Holds a collection of keyed entities. Keys are
  unique values used to identify and access an entity (usually an `id`).

- [request](./lib/request/): Holds the state of a single request (usually a
  network `fetch`).

- [requestById](./lib/requestById/): Holds the state of a collection of request
  (usually a network `fetch`).

- [utils](./lib/utils/): Various convenience utilities to reduce Redux
  boilerplate or create your own redukers.
