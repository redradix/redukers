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
type StartAction = {
  type: string,
}

/*
 * [success]: mark request as successfully completed.
 */
type SuccessAction = {
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
function getError(state: State): Error

/*
 * Returns `true` if the request has never been started or is in progress.
 */
function getIsLoading(state: State): boolean

/*
 * Returns `true` if the request has ended loading (error or success)
 */
function getIsDone(state: State): boolean

/*
 * Returns `true` if the request had been successful at least once.
 */
function getHadSucceeded(state: State): boolean

/*
 * Returns `true` if the request had errored at least once.
 */
function getHadErrored(state: State): boolean

/*
 * Returns `true` if the request had had completed (either succeeded or errored)
 */
function getHadCompleted(state: State): boolean
```
