import request from '../../lib/request'
import * as F from '../../lib/fp-utils'

export const getFoo = state => state.foo

export const getBar = state => state.bar

const getFooRequest = state => state.fooRequest

export const getIsEmptyFoo = F.pipe(
  getFooRequest,
  request.getIsEmpty,
)

export const getIsRequestingFoo = F.pipe(
  getFooRequest,
  request.getIsRequesting,
)

export const getIsRequestSucceededFoo = F.pipe(
  getFooRequest,
  request.getIsRequestSucceeded,
)

export const getIsErrorFoo = F.pipe(
  getFooRequest,
  request.getIsError,
)

export const getErrorFoo = F.pipe(
  getFooRequest,
  request.getError,
)

export const getIsLoadingFoo = F.pipe(
  getFooRequest,
  request.getIsLoading,
)
