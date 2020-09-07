# redukers/request

Holds the state of a single request (usually a network `fetch`).

## API

### Reducer creator

```ts
function request(
  patterns: {
    start?: Pattern,
    success?: Pattern,
    error?: Pattern,
    clear?: Pattern,
  },
): Reducer
```
​
### Action shapes

```ts
/*
 * [start]: mark request as in-progress.
 */
type StartAction<K, E> = {
  type: string,
}

/*
 * [success]: mark request as successfully completed.
 */
type SuccessAction<K, E> = {
  type: string,
}

/*
 * [error]: mark request as error and set `payload` as error data.
 */
type ErrorAction = {
  type: string,
  payload: any,
  error: true,
}

/*
 * [clear]: reset to empty (no request done) state.
 */
type ClearAction = {
  type: string,
}
```

### Selectors

```ts
/*
 * Returns `true` if the request has never been started, errored, etc.
 */
function getIsEmpty(state: State): boolean

/*
 * Returns `true` if the request is in progress.
 */
function getIsRequesting(state: State): boolean

/*
 * Returns `true` if the request completed succesfully.
 */
function getIsRequestSucceeded(state: State): boolean

/*
 * Returns `true` if the request errored.
 */
function getIsError(state: State): boolean

/*
 * Returns the error associated with the request (if any).
 */
function getError(state: State): any

/*
 * Returns `true` if the request has never been started or is in progress.
 */
function getIsLoading(state: State): any
```
