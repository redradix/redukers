import * as F from './fp-utils'

describe('pipe', () => {
  it('Works for 2 functions', () => {
      const pipeFn = F.pipe(
      x => 1 + x,
      x => 2 * x,
      )

      expect(pipeFn(7)).toEqual(16)
      expect(pipeFn(1)).toEqual(4)
  })

  it('Works for 1 function', () => {
      const pipeFn = F.pipe(
      x => 1 + x,
      )

      expect(pipeFn(7)).toEqual(8)
      expect(pipeFn(1)).toEqual(2)
  })

  it('Throws for 0 functions', () => {
      expect(() => F.pipe())
      .toThrow('Pipe needs at least one function')
  })
})