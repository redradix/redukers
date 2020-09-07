# redukers/requestById

Holds the state of a collection of request (usually a network `fetch`).

## API

### Reducer creator

```ts
function requestById(
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
  payload: { id: string }
}

/*
 * [success]: mark request as successfully completed.
 */
type SuccessAction = {
  type: string,
  payload: { id: string }
}

/*
 * [error]: mark request as error and set `payload` as error data.
 */
type ErrorAction = {
  type: string,
  payload: { id: string, error: string }
  error: true,
}

/*
 * [clear]: reset to empty (no request done) state.
 */
type ClearAction = {
  type: string,
  payload: { id: string }
}
```

### Selectors

```ts
/*
 * Returns `true` if the request has never been started, errored, etc.
 */
function getIsEmptyById(id:string, state: State): boolean

/*
 * Returns `true` if the request is in progress.
 */
function getIsRequestingById(id:string, state: State): boolean

/*
 * Returns `true` if the request completed succesfully.
 */
function getIsRequestSucceededById(id:string, state: State): boolean

/*
 * Returns `true` if the request errored.
 */
function getIsErrorById(id:string, state: State): boolean

/*
 * Returns the error associated with the request (if any).
 */
function getErrorById(id:string, state: State): any

/*
 * Returns `true` if the request has never been started or is in progress.
 */
function getIsLoadingById(id:string, state: State): any
```
