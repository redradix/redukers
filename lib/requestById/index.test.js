import requestById from './index'

describe('requestById', () => {
  describe('Initial state + Selectors', () => {
    it('works', () => {
      const reducer = requestById({})
      const nextState = reducer(undefined, { type: 'DUMMY_ACTION' })

      expect(requestById.getIsEmptyById('foo')(nextState)).toEqual(true)
      expect(requestById.getIsRequestingById('foo')(nextState)).toEqual(false)
      expect(requestById.getIsRequestSucceededById('foo')(nextState)).toEqual(false)
      expect(requestById.getIsErrorById('foo')(nextState)).toEqual(false)
      expect(requestById.getErrorById('foo')(nextState)).toEqual(undefined)
      expect(requestById.getIsLoadingById('foo')(nextState)).toEqual(true)
      expect(requestById.getIsDoneById('foo')(nextState)).toEqual(false)
      expect(requestById.getHadSucceededById('foo')(nextState)).toEqual(false)
      expect(requestById.getHadErroredById('foo')(nextState)).toEqual(false)
      expect(requestById.getHadCompletedById('foo')(nextState)).toEqual(false)
    })
  })

  describe('Actions + Selectors', () => {
    it('start', () => {
      const reducer = requestById({ start: 'START' })
      const nextState = reducer(undefined, { type: 'START', payload: { id: 'foo' } })

      expect(requestById.getIsEmptyById('foo')(nextState)).toEqual(false)
      expect(requestById.getIsRequestingById('foo')(nextState)).toEqual(true)
      expect(requestById.getIsRequestSucceededById('foo')(nextState)).toEqual(false)
      expect(requestById.getIsErrorById('foo')(nextState)).toEqual(false)
      expect(requestById.getErrorById('foo')(nextState)).toEqual(undefined)
      expect(requestById.getIsLoadingById('foo')(nextState)).toEqual(true)
      expect(requestById.getIsDoneById('foo')(nextState)).toEqual(false)
      expect(requestById.getHadSucceededById('foo')(nextState)).toEqual(false)
      expect(requestById.getHadErroredById('foo')(nextState)).toEqual(false)
      expect(requestById.getHadCompletedById('foo')(nextState)).toEqual(false)
    })

    it('success', () => {
      const reducer = requestById({ success: 'SUCCESS' })
      const nextState = reducer(undefined, { type: 'SUCCESS', payload: { id: 'foo' } })

      expect(requestById.getIsEmptyById('foo')(nextState)).toEqual(false)
      expect(requestById.getIsRequestingById('foo')(nextState)).toEqual(false)
      expect(requestById.getIsRequestSucceededById('foo')(nextState)).toEqual(true)
      expect(requestById.getIsErrorById('foo')(nextState)).toEqual(false)
      expect(requestById.getErrorById('foo')(nextState)).toEqual(undefined)
      expect(requestById.getIsLoadingById('foo')(nextState)).toEqual(false)
      expect(requestById.getIsDoneById('foo')(nextState)).toEqual(true)
      expect(requestById.getHadSucceededById('foo')(nextState)).toEqual(true)
      expect(requestById.getHadErroredById('foo')(nextState)).toEqual(false)
      expect(requestById.getHadCompletedById('foo')(nextState)).toEqual(true)
    })

    it('error', () => {
      const reducer = requestById({ error: 'ERROR' })
      const nextState = reducer(undefined, {
        type: 'ERROR',
        payload: { id: 'foo', error: 'error' }
      })

      expect(requestById.getIsEmptyById('foo')(nextState)).toEqual(false)
      expect(requestById.getIsRequestingById('foo')(nextState)).toEqual(false)
      expect(requestById.getIsRequestSucceededById('foo')(nextState)).toEqual(false)
      expect(requestById.getIsErrorById('foo')(nextState)).toEqual(true)
      expect(requestById.getErrorById('foo')(nextState)).toEqual('error')
      expect(requestById.getIsLoadingById('foo')(nextState)).toEqual(false)
      expect(requestById.getIsDoneById('foo')(nextState)).toEqual(true)
      expect(requestById.getHadSucceededById('foo')(nextState)).toEqual(false)
      expect(requestById.getHadErroredById('foo')(nextState)).toEqual(true)
      expect(requestById.getHadCompletedById('foo')(nextState)).toEqual(true)
    })

    it('clear', () => {
      const reducer = requestById({ clear: 'CLEAR' })
      const nextState = reducer(undefined, { type: 'CLEAR', payload: { id: 'foo' } })

      expect(requestById.getIsEmptyById('foo')(nextState)).toEqual(true)
      expect(requestById.getIsRequestingById('foo')(nextState)).toEqual(false)
      expect(requestById.getIsRequestSucceededById('foo')(nextState)).toEqual(false)
      expect(requestById.getIsErrorById('foo')(nextState)).toEqual(false)
      expect(requestById.getErrorById('foo')(nextState)).toEqual(undefined)
      expect(requestById.getIsLoadingById('foo')(nextState)).toEqual(true)
      expect(requestById.getIsDoneById('foo')(nextState)).toEqual(false)
      expect(requestById.getHadSucceededById('foo')(nextState)).toEqual(false)
      expect(requestById.getHadErroredById('foo')(nextState)).toEqual(false)
      expect(requestById.getHadCompletedById('foo')(nextState)).toEqual(false)
    })
  })

  describe('Preserves had* states', () => {
    it('preserves hadSuccess', () => {
      const reducer = requestById({ 
        start: 'START',
        success: 'SUCCESS',
        error: 'ERROR',
        clear: 'CLEAR',
      })

      let nextState = reducer(undefined, { type: 'SUCCESS', payload: { id: 'foo' } })

      expect(requestById.getHadSucceededById('foo')(nextState)).toEqual(true)
      expect(requestById.getHadCompletedById('foo')(nextState)).toEqual(true)

      nextState = reducer(nextState, { type: 'START', payload: { id: 'foo' } })

      expect(requestById.getHadSucceededById('foo')(nextState)).toEqual(true)
      expect(requestById.getHadCompletedById('foo')(nextState)).toEqual(true)

      nextState = reducer(nextState, { type: 'CLEAR', payload: { id: 'foo' } })

      expect(requestById.getHadSucceededById('foo')(nextState)).toEqual(true)
      expect(requestById.getHadCompletedById('foo')(nextState)).toEqual(true)

      nextState = reducer(nextState, { type: 'ERROR', payload: { id: 'foo' } })

      expect(requestById.getHadSucceededById('foo')(nextState)).toEqual(true)
      expect(requestById.getHadCompletedById('foo')(nextState)).toEqual(true)
    })

    it('preserves hadSuccess', () => {
      const reducer = requestById({ 
        start: 'START',
        success: 'SUCCESS',
        error: 'ERROR',
        clear: 'CLEAR',
      })

      let nextState = reducer(undefined, { type: 'ERROR', payload: { id: 'foo' } })

      expect(requestById.getHadErroredById('foo')(nextState)).toEqual(true)
      expect(requestById.getHadCompletedById('foo')(nextState)).toEqual(true)

      nextState = reducer(nextState, { type: 'START', payload: { id: 'foo' } })

      expect(requestById.getHadErroredById('foo')(nextState)).toEqual(true)
      expect(requestById.getHadCompletedById('foo')(nextState)).toEqual(true)

      nextState = reducer(nextState, { type: 'CLEAR', payload: { id: 'foo' } })

      expect(requestById.getHadErroredById('foo')(nextState)).toEqual(true)
      expect(requestById.getHadCompletedById('foo')(nextState)).toEqual(true)

      nextState = reducer(nextState, { type: 'SUCCESS', payload: { id: 'foo' } })

      expect(requestById.getHadErroredById('foo')(nextState)).toEqual(true)
      expect(requestById.getHadCompletedById('foo')(nextState)).toEqual(true)
    })
  })
})
