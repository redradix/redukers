# redukers/utils

## `matchPattern`

```ts
function matchPattern(pattern: Pattern, action: Action): boolean
```

Used internally to check if an action matches the configured patterns of the
reducer creator. Exposed here so you can wrap redukers with your own reducer
functionality.

## `payloadActions` / `errorActions`

Small util for generating flux `actions` and `actionTypes` boilerplate. Inspired
by https://github.com/alnorris/redux-actiontyper.

Use these when you plan to use simple actions that just wrap around a `payload`.
Once your actions become more complex or you plan to reuse action types across
different actions, it's better to be explicit.

Example:

```js
// Usage (important, use camel case in destructuring)
const { fetchUsersById, anotherAction } = payloadActions('EXAMPLE')
const { setFooError, setBarError } = errorActions('TESTING')

// Get the action type
fetchUsersById.type // => 'EXAMPLE/FETCH_USERS_BY_ID'
anotherAction.type  // => 'EXAMPLE/ANOTHER_ACTION'
setFooError.type    // => 'TESTING/SET_FOO_ERROR'
setBarError.type    // => 'TESTING/SET_BAR_ERROR'

// Get the action creator
fetchUsersById({ id: 1337 })
// => {
//       type: 'EXAMPLE/FETCH_USERS_BY_ID',
//       payload: { id: 1337 },
//    }

setFooError('Could not load')
// => {
//       type: 'TESTING/SET_FOO_ERROR',
//       payload: 'Could not load',
//       error: true,
//    }
```
