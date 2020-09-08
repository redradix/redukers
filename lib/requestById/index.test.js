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
    })
  })
})