import request from '../../lib/request'
import { pipe } from '../../lib/utils'

export const getFoo = state => state.foo

export const getBar = state => state.bar

const getFooRequest = state => state.fooRequest

export const getIsEmptyFoo = pipe(
  getFooRequest,
  request.getIsEmpty,
)

export const getIsRequestingFoo = pipe(
  getFooRequest,
  request.getIsRequesting,
)

export const getIsRequestSucceededFoo = pipe(
  getFooRequest,
  request.getIsRequestSucceeded,
)

export const getIsErrorFoo = pipe(
  getFooRequest,
  request.getIsError,
)

export const getErrorFoo = pipe(
  getFooRequest,
  request.getError,
)

export const getIsLoadingFoo = pipe(
  getFooRequest,
  request.getIsLoading,
)
