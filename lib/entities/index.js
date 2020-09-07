import { matchPattern } from '../utils'
import * as F from '../fp-utils'

const INITIAL_STATE = {}

const makeEntitiesReducer = (
  { update, mergeById, updateById, reset },
) => (state = INITIAL_STATE, action) => {
  if (matchPattern(update, action)) {
    if(F.isNil(action.payload)) {
      return {}
    }

    return action.payload
  }

  if (matchPattern(mergeById, action)) {
    const { id, data } = action.payload

    const newValue = F.mergeDeepLeft(data, state[id] || {})

    return F.assoc(id, newValue, state)
  }

  if (matchPattern(updateById, action)) {
    const { id, data } = action.payload

    return F.assoc(id, data, state)
  }

  if (matchPattern(reset, action)) {
    return INITIAL_STATE
  }

  return state
}

// Selectors

makeEntitiesReducer.getAsList = Object.values

makeEntitiesReducer.getOne = (id, state) => state[id]

export default makeEntitiesReducer
