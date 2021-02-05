import { matchPattern } from '../utils'
import * as F from '../fp-utils'

const INITIAL_STATE = {}

const makeEntitiesReducer = (
  { update, mergeById, updateById, removeById, reset },
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

  if (matchPattern(removeById, action)) {
    const { id } = action.payload

    return F.dissoc(id, state)
  }

  if (matchPattern(reset, action)) {
    return INITIAL_STATE
  }

  return state
}

// Selectors

makeEntitiesReducer.getAsList = Object.values

makeEntitiesReducer.getOne = (id, state) => state[id]

makeEntitiesReducer.getSomeAsList = (ids, state) => ids.map(id => state[id])

makeEntitiesReducer.getSomeAsObject = (ids, state) =>
  Object.fromEntries(ids.map(id => [id, state[id]]))

export default makeEntitiesReducer
