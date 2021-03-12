import { matchPattern } from '../utils'

const STATES = {
  EMPTY: 'EMPTY',
  REQUESTING: 'REQUESTING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
}

const INITIAL_STATE = {
  state: STATES.EMPTY,
  error: undefined,

  hadSucceeded: false,
  hadErrored: false,
}

const makeRequestReducer = ({ start, success, error, clear }) => (
  state = INITIAL_STATE,
  action,
) => {
  if (matchPattern(start, action)) {
    return {
      ...state,
      state: STATES.REQUESTING,
      error: undefined,
    }
  }

  if (matchPattern(success, action)) {
    return {
      ...state,
      state: STATES.SUCCESS,
      error: undefined,
      hadSucceeded: true,
    }
  }

  if (matchPattern(error, action)) {
    return {
      ...state,
      state: STATES.ERROR,
      error: action.payload,
      hadErrored: true,
    }
  }

  if (matchPattern(clear, action)) {
    return {
      ...INITIAL_STATE,
      hadSucceeded: state.hadSucceeded,
      hadErrored: state.hadErrored,
    }
  }

  return state
}

makeRequestReducer.getIsEmpty = state => state.state === STATES.EMPTY

makeRequestReducer.getIsRequesting = state => state.state === STATES.REQUESTING

makeRequestReducer.getIsRequestSucceeded = state =>
  state.state === STATES.SUCCESS

makeRequestReducer.getIsError = state => state.state === STATES.ERROR

makeRequestReducer.getError = state => state.error

makeRequestReducer.getIsLoading = state =>
  state.state === STATES.EMPTY || state.state === STATES.REQUESTING

makeRequestReducer.getIsDone = state =>
  !makeRequestReducer.getIsLoading(state)
  
makeRequestReducer.getHadSucceeded = state => state.hadSucceeded

makeRequestReducer.getHadErrored = state => state.hadErrored

makeRequestReducer.getHadCompleted = state => state.hadSucceeded || state.hadErrored

makeRequestReducer.STATES = STATES

makeRequestReducer.INITIAL_STATE = INITIAL_STATE

export default makeRequestReducer
