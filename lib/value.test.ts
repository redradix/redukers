import value from './value'

describe('value', () => {
  it('Has `null` as default initial state', () => {
    const reducer = value({})
    const nextState = reducer(undefined, { type: 'ACTION' })

    expect(nextState).toEqual(null)
  })
})
