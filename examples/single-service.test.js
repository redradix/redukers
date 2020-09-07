import reducer from './service/reducer'
import * as selectors from './service/selectors'
import * as actions from './service/actions'

describe('Single service', () => {
  it('Works', () => {
    let state = undefined

    state = reducer(state, { type: 'DUMMY_ACTION' })

    expect(selectors.getFoo(state)).toEqual(null)
    expect(selectors.getBar(state)).toEqual(1337)
    expect(selectors.getIsEmptyFoo(state)).toEqual(true)
    expect(selectors.getIsRequestingFoo(state)).toEqual(false)
    expect(selectors.getIsRequestSucceededFoo(state)).toEqual(false)
    expect(selectors.getIsErrorFoo(state)).toEqual(false)
    expect(selectors.getErrorFoo(state)).toEqual(undefined)
    expect(selectors.getIsLoadingFoo(state)).toEqual(true)

    state = reducer(state, actions.fetchFoo())

    expect(selectors.getFoo(state)).toEqual(null)
    expect(selectors.getBar(state)).toEqual(1337)
    expect(selectors.getIsEmptyFoo(state)).toEqual(false)
    expect(selectors.getIsRequestingFoo(state)).toEqual(true)
    expect(selectors.getIsRequestSucceededFoo(state)).toEqual(false)
    expect(selectors.getIsErrorFoo(state)).toEqual(false)
    expect(selectors.getErrorFoo(state)).toEqual(undefined)
    expect(selectors.getIsLoadingFoo(state)).toEqual(true)

    state = reducer(state, actions.setBar(42))

    expect(selectors.getFoo(state)).toEqual(null)
    expect(selectors.getBar(state)).toEqual(42)
    expect(selectors.getIsEmptyFoo(state)).toEqual(false)
    expect(selectors.getIsRequestingFoo(state)).toEqual(true)
    expect(selectors.getIsRequestSucceededFoo(state)).toEqual(false)
    expect(selectors.getIsErrorFoo(state)).toEqual(false)
    expect(selectors.getErrorFoo(state)).toEqual(undefined)
    expect(selectors.getIsLoadingFoo(state)).toEqual(true)

    state = reducer(state, actions.setFoo('0118 999 881 999 119 7253'))

    expect(selectors.getFoo(state)).toEqual('0118 999 881 999 119 7253')
    expect(selectors.getBar(state)).toEqual(42)
    expect(selectors.getIsEmptyFoo(state)).toEqual(false)
    expect(selectors.getIsRequestingFoo(state)).toEqual(false)
    expect(selectors.getIsRequestSucceededFoo(state)).toEqual(true)
    expect(selectors.getIsErrorFoo(state)).toEqual(false)
    expect(selectors.getErrorFoo(state)).toEqual(undefined)
    expect(selectors.getIsLoadingFoo(state)).toEqual(false)

    state = reducer(state, actions.fetchFoo())

    expect(selectors.getFoo(state)).toEqual(null)
    expect(selectors.getBar(state)).toEqual(42)
    expect(selectors.getIsEmptyFoo(state)).toEqual(false)
    expect(selectors.getIsRequestingFoo(state)).toEqual(true)
    expect(selectors.getIsRequestSucceededFoo(state)).toEqual(false)
    expect(selectors.getIsErrorFoo(state)).toEqual(false)
    expect(selectors.getErrorFoo(state)).toEqual(undefined)
    expect(selectors.getIsLoadingFoo(state)).toEqual(true)

    state = reducer(state, actions.errorFoo('Task failed successfully'))

    expect(selectors.getFoo(state)).toEqual(null)
    expect(selectors.getBar(state)).toEqual(42)
    expect(selectors.getIsEmptyFoo(state)).toEqual(false)
    expect(selectors.getIsRequestingFoo(state)).toEqual(false)
    expect(selectors.getIsRequestSucceededFoo(state)).toEqual(false)
    expect(selectors.getIsErrorFoo(state)).toEqual(true)
    expect(selectors.getErrorFoo(state)).toEqual('Task failed successfully')
    expect(selectors.getIsLoadingFoo(state)).toEqual(false)

    state = reducer(state, actions.resetAll())

    expect(selectors.getFoo(state)).toEqual(null)
    expect(selectors.getBar(state)).toEqual(1337)
    expect(selectors.getIsEmptyFoo(state)).toEqual(true)
    expect(selectors.getIsRequestingFoo(state)).toEqual(false)
    expect(selectors.getIsRequestSucceededFoo(state)).toEqual(false)
    expect(selectors.getIsErrorFoo(state)).toEqual(false)
    expect(selectors.getErrorFoo(state)).toEqual(undefined)
    expect(selectors.getIsLoadingFoo(state)).toEqual(true)
  })
})
