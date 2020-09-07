import value from './value'

describe('value', () => {
  describe('Initial state', () => {
    it('allows setting a custom value', () => {
      const reducer = value({}, 'foobar')
      const nextState = reducer(undefined, { type: 'DUMMY_ACTION' })

      expect(nextState).toEqual('foobar')
    })

    it('has `null` as default', () => {
      const reducer = value({})
      const nextState = reducer(undefined, { type: 'DUMMY_ACTION' })

      expect(nextState).toEqual(null)
    })
  })

  describe('Actions', () => {
    describe('set', () => {
      it('works', () => {
        const reducer = value({ set: 'SET' })
        const nextState = reducer(undefined, { type: 'SET', payload: 5 })

        expect(nextState).toEqual(5)
      })
    })

    describe('reset', () => {
      it('with initial state', () => {
        const reducer = value({ reset: 'RESET' }, 33)
        const nextState = reducer(undefined, { type: 'RESET' })

        expect(nextState).toEqual(33)
      })

      it('without initial state', () => {
        const reducer = value({ reset: 'RESET' })
        const nextState = reducer(undefined, { type: 'RESET' })

        expect(nextState).toEqual(null)
      })
    })
  })
})
