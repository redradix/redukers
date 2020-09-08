import request from '../request'
import * as F from '../fp-utils'

const makeRequestByIdReducer = actionTypes => {
  const requestReducer = request(actionTypes)

  return (state = {}, action) => {
    if (F.isNil(action?.payload?.id)) {
      return state
    }

    return {
      ...state,
      [action.payload.id]: requestReducer(state[action.payload.id], {
        ...action,
        payload: action.payload.error,
      }),
    }
  }
}

makeRequestByIdReducer.getById = id => state => state[id] || request.INITIAL_STATE

makeRequestByIdReducer.getIsEmptyById = id =>
  F.pipe(makeRequestByIdReducer.getById(id), request.getIsEmpty)

makeRequestByIdReducer.getIsRequestingById = id =>
  F.pipe(makeRequestByIdReducer.getById(id), request.getIsRequesting)

makeRequestByIdReducer.getIsRequestSucceededById = id =>
  F.pipe(makeRequestByIdReducer.getById(id), request.getIsRequestSucceeded)

makeRequestByIdReducer.getIsErrorById = id =>
  F.pipe(makeRequestByIdReducer.getById(id), request.getIsError)

makeRequestByIdReducer.getErrorById = id =>
  F.pipe(makeRequestByIdReducer.getById(id), request.getError)

makeRequestByIdReducer.getIsLoadingById = id =>
  F.pipe(makeRequestByIdReducer.getById(id), request.getIsLoading)

makeRequestByIdReducer.STATES = request.STATES

export default makeRequestByIdReducer