import request from './index'

describe('request', () => {
  describe('Initial state + Selectors', () => {
    it('works', () => {
      const reducer = request({})
      const nextState = reducer(undefined, { type: 'DUMMY_ACTION' })

      expect(request.getIsEmpty(nextState)).toEqual(true)
      expect(request.getIsRequesting(nextState)).toEqual(false)
      expect(request.getIsRequestSucceeded(nextState)).toEqual(false)
      expect(request.getIsError(nextState)).toEqual(false)
      expect(request.getError(nextState)).toEqual(undefined)
      expect(request.getIsLoading(nextState)).toEqual(true)
      expect(request.getIsDone(nextState)).toEqual(false)
    })
  })

  describe('Actions + Selectors', () => {
    it('start', () => {
      const reducer = request({ start: 'START' })
      const nextState = reducer(undefined, { type: 'START' })

      expect(request.getIsEmpty(nextState)).toEqual(false)
      expect(request.getIsRequesting(nextState)).toEqual(true)
      expect(request.getIsRequestSucceeded(nextState)).toEqual(false)
      expect(request.getIsError(nextState)).toEqual(false)
      expect(request.getError(nextState)).toEqual(undefined)
      expect(request.getIsLoading(nextState)).toEqual(true)
      expect(request.getIsDone(nextState)).toEqual(false)
    })

    it('success', () => {
      const reducer = request({ success: 'SUCCESS' })
      const nextState = reducer(undefined, { type: 'SUCCESS' })

      expect(request.getIsEmpty(nextState)).toEqual(false)
      expect(request.getIsRequesting(nextState)).toEqual(false)
      expect(request.getIsRequestSucceeded(nextState)).toEqual(true)
      expect(request.getIsError(nextState)).toEqual(false)
      expect(request.getError(nextState)).toEqual(undefined)
      expect(request.getIsLoading(nextState)).toEqual(false)
      expect(request.getIsDone(nextState)).toEqual(true)
    })

    it('error', () => {
      const reducer = request({ error: 'ERROR' })
      const nextState = reducer(undefined, { type: 'ERROR', payload: 'foobar' })

      expect(request.getIsEmpty(nextState)).toEqual(false)
      expect(request.getIsRequesting(nextState)).toEqual(false)
      expect(request.getIsRequestSucceeded(nextState)).toEqual(false)
      expect(request.getIsError(nextState)).toEqual(true)
      expect(request.getError(nextState)).toEqual('foobar')
      expect(request.getIsLoading(nextState)).toEqual(false)
      expect(request.getIsDone(nextState)).toEqual(true)
    })

    it('clear', () => {
      const reducer = request({ clear: 'CLEAR' })
      const nextState = reducer(undefined, { type: 'CLEAR' })

      expect(request.getIsEmpty(nextState)).toEqual(true)
      expect(request.getIsRequesting(nextState)).toEqual(false)
      expect(request.getIsRequestSucceeded(nextState)).toEqual(false)
      expect(request.getIsError(nextState)).toEqual(false)
      expect(request.getError(nextState)).toEqual(undefined)
      expect(request.getIsLoading(nextState)).toEqual(true)
      expect(request.getIsDone(nextState)).toEqual(false)
    })
  })
})
