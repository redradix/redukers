import { matchPattern } from './utils'

export default ({ set, reset }, initialState = null) => 
  (state = initialState, action) => {
    if (matchPattern(set, action)) {
      return action.payload
    }

    if (matchPattern(reset, action)) {
      return initialState
    }

    return state
  }
