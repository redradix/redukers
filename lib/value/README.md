# redukers/value

Holds a single value.

**WARNING:** This module cannot hold `undefined` values (see
https://redux.js.org/recipes/structuring-reducers/initializing-state#summary).
Use `null`, `false` or other appropriate value instead.

## API

### Reducer creator

```ts
function value<T>(
  patterns: {
    set?: Pattern,
    reset?: Pattern,
  },
  initialState: T,
): Reducer<T>
```
​
### Action shapes

```ts
/*
 * [set]: set `payload` as value.
 */
type SetAction<T> = {
  type: string,
  payload: T,
}

/*
 * [reset]: set value to `initialState`.
 */
type ResetAction = {
  type: string,
}
```

### Selectors

This module has no selectors since it's just a plain value that can be selected
normally.
