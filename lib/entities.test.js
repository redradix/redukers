import entities from './entities'
import * as F from './fp-utils'

describe('entities', () => {
  describe('Initial state + Selectors', () => {
    it('works', () => {
      const reducer = entities({})
      const nextState = reducer(undefined, { type: 'DUMMY_ACTION' })

      expect(entities.getAsList(nextState)).toEqual([])
      expect(entities.getOne('1337', nextState)).toEqual(undefined)
    })
  })

  describe('Actions + Selectors', () => {
    it('update', () => {
      {
        const payload = { foo: 'bar' }

        const reducer = entities({ update: 'UPDATE' })
        const nextState = reducer(undefined, { type: 'UPDATE', payload })


        expect(entities.getAsList(nextState)).toEqual([payload.foo])
        expect(entities.getOne('1337', nextState)).toEqual(undefined)
        expect(entities.getOne('foo', nextState)).toEqual(payload.foo)
      }

      {
        const payload = { "1337": { name: 'foo' }, "1338": { name: 'foo' } }

        const reducer = entities({ update: 'UPDATE' })
        const nextState = reducer(undefined, { type: 'UPDATE', payload })


        expect(entities.getAsList(nextState)).toEqual(Object.values(payload))
        expect(entities.getOne('1337', nextState)).toEqual(payload["1337"])
        expect(entities.getOne('1338', nextState)).toEqual(payload["1338"])
        expect(entities.getOne('foo', nextState)).toEqual(undefined)
      }
    })

    it('mergeById', () => {
      const initialState = { 
        "1337": { name: 'foo', age: 20, location: { country: 'foo', street: 'bar' } }, 
        "1338": { name: 'foo' } 
      }
      const data = { name: 'foo2', surname: 'bar', location: { country: 'bar', street: 'foo' } }

      const reducer = entities({ mergeById: 'MERGE_BY_ID' })
      const nextState = reducer(initialState, { type: 'MERGE_BY_ID', payload: { id: '1337', data } })

      const expectedState = F.mergeDeepLeft(data, initialState["1337"])

      expect(entities.getAsList(nextState)).toEqual([expectedState, initialState["1338"]])
      expect(entities.getOne('1337', nextState)).toEqual(expectedState)
      expect(entities.getOne('1338', nextState)).toEqual(initialState["1338"])
    })

    it('updateById', () => {
      const initialState = {
        "1337": { name: 'foo', age: 20, location: { country: 'foo', street: 'bar' } }, 
        "1338": { name: 'foo' } 
      }
      const data = { name: 'foo2', surname: 'bar', location: { country: 'bar', street: 'foo' } }

      const reducer = entities({ updateById: 'UPDATE_BY_ID' })
      const nextState = reducer(initialState, { type: 'UPDATE_BY_ID', payload: { id: '1337', data } })

      expect(entities.getAsList(nextState)).toEqual([data, initialState["1338"]])
      expect(entities.getOne('1337', nextState)).toEqual(data)
      expect(entities.getOne('1338', nextState)).toEqual(initialState["1338"])
    })

    it('reset', () => {
      const initialState = {
        "1337": { name: 'foo', age: 20, location: { country: 'foo', street: 'bar' } }, 
        "1338": { name: 'foo' } 
      }

      const reducer = entities({ reset: 'RESET' })
      const nextState = reducer(initialState, { type: 'RESET' })

      expect(entities.getAsList(nextState)).toEqual([])
      expect(entities.getOne('1337', nextState)).toEqual(undefined)
    })
  })
})
