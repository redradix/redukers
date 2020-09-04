import { matchPattern } from './utils'

const STATES = {
  EMPTY: 'EMPTY',
  REQUESTING: 'REQUESTING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
}

const INITIAL_STATE = {
  state: STATES.EMPTY,
  error: undefined,
}

const makeRequestReducer = ({ start, success, error, clear }) => (
  state = INITIAL_STATE,
  action,
) => {
  if (matchPattern(start, action)) {
    return {
      state: STATES.REQUESTING,
      error: undefined,
    }
  }

  if (matchPattern(success, action)) {
    return {
      state: STATES.SUCCESS,
      error: undefined,
    }
  }

  if (matchPattern(error, action)) {
    return {
      state: STATES.ERROR,
      error: action.payload,
    }
  }

  if (matchPattern(clear, action)) {
    return INITIAL_STATE
  }

  return state
}

makeRequestReducer.getIsEmpty = state => 
  state.state === STATES.EMPTY

makeRequestReducer.getIsRequesting = state => 
  state.state === STATES.REQUESTING

makeRequestReducer.getIsRequestSucceeded = state => 
  state.state === STATES.SUCCESS

makeRequestReducer.getIsError = state => 
  state.state === STATES.ERROR

makeRequestReducer.getError = state => 
  state.error

makeRequestReducer.getIsLoading = state => 
  state.state === STATES.EMPTY || state.state === STATES.REQUESTING

makeRequestReducer.STATES = STATES

export default makeRequestReducer
