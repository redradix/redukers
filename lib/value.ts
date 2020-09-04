import { matchPattern } from './utils'

export default <P>(
  { set, reset }: {
    set?: Pattern<P>,
    reset?: Pattern<P>,
  },
  initialState: P = null,
) => (
  state: P = initialState,
  action: Action<P>,
) => {
  if (matchPattern(set, action)) {
    return action.payload
  }

  if (matchPattern(reset, action)) {
    return initialState
  }

  return state
}
