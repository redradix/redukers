# redukers/entities

Holds a collection of keyed entities. Keys are unique values used to identify
and access an entity (usually an `id`).

## API

### Reducer creator

```ts
function entities(
  patterns: {
    update?: Pattern,
    mergeById?: Pattern,
    updateById?: Pattern,
    removeById?: Pattern,
    reset?: Pattern,
  },
): Reducer
```
​
### Action shapes

```ts
/*
 * [update]: set `payload` as entity collection.
 */
type UpdateAction = {
  type: string,
  payload: { [key: string]: any },
}

/*
 * [updateById]: completely replace value into data of entity `id`.
 */
type UpdateByIdAction = {
  type: string,
  payload: {
    id: string,
    data: any,
  },
}

/*
 * [mergeById]: deep-merge value into data of entity `id`.
 */
type MergeByIdAction = {
  type: string,
  payload: {
    id: string,
    data: any,
  },
}

/*
 * [removeById]: remove entity `id` from collection.
 */
type RemoveByIdAction = {
  type: string,
  payload: {
    id: string,
  },
}

/*
 * [reset]: reset collection to `initialState`.
 */
type ResetAction = {
  type: string,
}
```

### Selectors

```ts
/*
 * Returns the entity associated with key `id`.
 */
function getOne(id: string, state: State): any

/*
 * Returns all entities as an array.
 */
function getAsList(state: State): any[]

/*
 * Returns some entities as an array.
 */
function getSomeAsList(ids: string[], state: State): any[]

/*
 * Returns some entities as an object.
 */
function getSomeAsObject(ids: string[], state: State): { [k in ids]: any }
```
