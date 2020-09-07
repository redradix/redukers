import * as actionTypes from './action-types'

export const setFoo = (value) => ({
  type: actionTypes.SET_FOO,
  payload: value,
})

export const fetchFoo = () => ({
  type: actionTypes.FETCH_FOO,
})

export const errorFoo = (error) => ({
  type: actionTypes.ERROR_FOO,
  payload: error,
})

export const setBar = (value) => ({
  type: actionTypes.SET_BAR,
  payload: value,
})

export const resetAll = () => ({
  type: actionTypes.RESET_ALL,
})
