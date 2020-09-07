import { combineReducers } from 'redux'
import * as redukers from '../../lib'
import * as actionTypes from './action-types'

export default combineReducers({
  foo: redukers.value({
    set: actionTypes.SET_FOO,
     // Notice how these are shared with fooRequest and bar.reset
    reset: [actionTypes.FETCH_FOO, actionTypes.ERROR_FOO, actionTypes.RESET_ALL],
  }),

  bar: redukers.value({
    set: actionTypes.SET_BAR,
    reset: actionTypes.RESET_ALL,
  }, 1337),

  fooRequest: redukers.request({
    start: actionTypes.FETCH_FOO,
    success: actionTypes.SET_FOO, // Notice how this is shared with foo.set
    error: actionTypes.ERROR_FOO,
    clear: actionTypes.RESET_ALL,
  })
})
