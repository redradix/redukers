import entities from './index'
import * as F from '../fp-utils'

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
      expect(entities.getSomeAsList(['1337', '1338'], nextState))
        .toEqual([expectedState, initialState["1338"]])
      expect(entities.getSomeAsObject(['1337', '1338'], nextState))
        .toEqual({ 1337: expectedState, 1338: initialState["1338"] })
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
      expect(entities.getSomeAsList(['1337', '1338'], nextState))
        .toEqual([data, initialState["1338"]])
      expect(entities.getSomeAsObject(['1337', '1338'], nextState))
        .toEqual({ 1337: data, 1338: initialState["1338"] })
    })

    it('removeById', () => {
      const initialState = {
        "1337": { name: 'foo', age: 20, location: { country: 'foo', street: 'bar' } },
        "1338": { name: 'foo' }
      }

      const reducer = entities({ removeById: 'REMOVE_BY_ID' })
      const nextState = reducer(initialState, { type: 'REMOVE_BY_ID', payload: { id: '1337' } })

      expect(entities.getAsList(nextState)).toEqual([initialState["1338"]])
      expect(entities.getOne('1337', nextState)).toEqual(undefined)
      expect(entities.getOne('1338', nextState)).toEqual(initialState["1338"])
      expect(entities.getSomeAsList(['1337', '1338'], nextState))
        .toEqual([undefined, initialState["1338"]])
      expect(entities.getSomeAsObject(['1337', '1338'], nextState))
        .toEqual({ 1337: undefined, 1338: initialState["1338"] })
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
      expect(entities.getSomeAsList(['1337', '1338'], nextState))
        .toEqual([undefined, undefined])
      expect(entities.getSomeAsObject(['1337', '1338'], nextState))
        .toEqual({ 1337: undefined, 1338: undefined })
    })
  })
})
