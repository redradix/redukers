import { matchPattern, pipe } from './utils'

describe('matchPattern', () => {
  it('Matches with string pattern', () => {
    {
      const result = matchPattern('ACTION_TYPE', { type: 'ACTION_TYPE' })
      expect(result).toEqual(true)
    }

    {
      const result = matchPattern('ACTION_TYPE', { type: 'ACTION_TYPE_OTHER' })
      expect(result).toEqual(false)
    }
  })

  it('Matches with array of strings pattern', () => {
    const arrayPattern = ['ACTION_TYPE_1', 'ACTION_TYPE_2']

    {
      const result = matchPattern(arrayPattern, { type: 'ACTION_TYPE_1' })
      expect(result).toEqual(true)
    }

    {
      const result = matchPattern(arrayPattern, { type: 'ACTION_TYPE_2' })
      expect(result).toEqual(true)
    }

    {
      const result = matchPattern(arrayPattern, { type: 'ACTION_TYPE_NONE' })
      expect(result).toEqual(false)
    }
  })

  it('Matches with predicate pattern', () => {
    const predicatePattern = (action) => action.payload.foo === 'bar'

    {
      const result = matchPattern(
        predicatePattern,
        { type: 'DUMMY_TYPE', payload: { foo: 'bar' } },
      )
      expect(result).toEqual(true)
    }

    {
      const result = matchPattern(
        predicatePattern,
        { type: 'DUMMY_TYPE', payload: { foo: 'noooo' } },
      )
      expect(result).toEqual(false)
    }
  })

  it('Does not match with no pattern', () => {
    const result = matchPattern(
      undefined,
      { type: 'DUMMY_TYPE', payload: { foo: 'bar' } },
    )
    expect(result).toEqual(false)
  })
})

describe('pipe', () => {
  it('Works for 2 functions', () => {
    const pipeFn = pipe(
      x => 1 + x,
      x => 2 * x,
    )

    expect(pipeFn(7)).toEqual(16)
    expect(pipeFn(1)).toEqual(4)
  })

  it('Works for 1 function', () => {
    const pipeFn = pipe(
      x => 1 + x,
    )

    expect(pipeFn(7)).toEqual(8)
    expect(pipeFn(1)).toEqual(2)
  })

  it('Throws for 0 functions', () => {
    expect(() => pipe())
      .toThrow('Pipe needs at least one function')
  })
})
