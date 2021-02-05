import * as F from './fp-utils'

describe('isNil', () => {
  it('works', () => {
    expect(F.isNil(null)).toBe(true)
    expect(F.isNil(undefined)).toBe(true)
    expect(F.isNil({})).toBe(false)
    expect(F.isNil([])).toBe(false)
    expect(F.isNil("")).toBe(false)
  })
})

describe('isObject', () => {
  it('works', () => {
    expect(F.isObject(null)).toBe(false)
    expect(F.isObject(undefined)).toBe(false)
    expect(F.isObject({})).toBe(true)
    expect(F.isObject([])).toBe(true)
    expect(F.isObject("")).toBe(false)
  })
})

// Copied from ramda repo
describe('mergeDeepLeft', function() {
  it('takes two objects, recursively merges their own properties and returns a new object', function() {
    var a = { w: 1, x: 2, y: { z: 3 }};
    var b = { a: 4, b: 5, c: { d: 6 }};
    expect(F.mergeDeepLeft(a, b)).toEqual({ w: 1, x: 2, y: { z: 3 }, a: 4, b: 5, c: { d: 6 }});
  });

  it('overrides properties in the second object with properties in the first object', function() {
    var a = { a: { b: 1, c: 2 }, y: 0 };
    var b = { a: { b: 3, d: 4 }, z: 0 };
    expect(F.mergeDeepLeft(a, b)).toEqual({ a: { b: 1, c: 2, d: 4 }, y: 0, z: 0 });
  });

  it('is not destructive', function() {
    var a = { w: 1, x: { y: 2 }};
    var res = F.mergeDeepLeft(a, { x: { y: 3 }});
    expect(a).not.toBe(res);
    expect(a.x).not.toBe(res.x);
    expect(res).toEqual({ w: 1, x: { y: 2 }});
  });

  it('reports only own properties', function() {
    var a = { w: 1, x: { y: 2 }};
    function Cla() {}
    Cla.prototype.y = 5;
    expect(F.mergeDeepLeft({ x: new Cla() }, a)).toEqual({ w: 1, x: { y: 2 }});
    expect(F.mergeDeepLeft(a, { x: new Cla() })).toEqual({ w: 1, x: { y: 2 }});
  });
});

describe('assoc', function() {
  it('makes a shallow clone of an object, overriding only the specified property', function() {
    var obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
    var obj2 = F.assoc('e', {x: 42}, obj1);
    expect(obj2).toEqual({a: 1, b: {c: 2, d: 3}, e: {x: 42}, f: 5});
    // Note: reference equality below!
    expect(obj2.a).toBe(obj1.a);
    expect(obj2.b).toBe(obj1.b);
    expect(obj2.f).toBe(obj1.f);
  });

  it('is the equivalent of clone and set if the property is not on the original', function() {
    var obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
    var obj2 = F.assoc('z', {x: 42}, obj1);
    expect(obj2).toEqual({a: 1, b: {c: 2, d: 3}, e: 4, f: 5, z: {x: 42}});
    // Note: reference equality below!
    expect(obj2.a).toBe(obj1.a);
    expect(obj2.b).toBe(obj1.b);
    expect(obj2.f).toBe(obj1.f);
  });

  it('makes a shallow clone of an array, overriding only the specified index', function() {
    var newValue = [4, 2];
    var ary1 = [1, [2, 3], 4, 5];
    var ary2 = F.assoc(2, newValue, ary1);
    expect(ary2).toEqual([1, [2, 3], [4, 2], 5]);
    // Note: reference equality below!
    expect(ary2[0]).toBe(ary1[0]);
    expect(ary2[1]).toBe(ary1[1]);
    expect(ary2[2]).toBe(newValue);
    expect(ary2[3]).toBe(ary1[3]);
  });

  it('is the equivalent of clone and set if the index is not on the original', function() {
    var newValue = [4, 2];
    var ary1 = [1, [2, 3], 4];
    var ary2 = F.assoc(5, newValue, ary1);
    expect(ary2).toEqual([1, [2, 3], 4, undefined, undefined, [4, 2]]);
    // Note: reference equality below!
    expect(ary2[0]).toBe(ary1[0]);
    expect(ary2[1]).toBe(ary1[1]);
    expect(ary2[2]).toBe(ary1[2]);
    expect(ary2[5]).toBe(newValue);
  });
});


describe('dissoc', function() {
  it('makes a shallow clone of an object, removing only the specified property', function() {
    var obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
    var obj2 = F.dissoc('b', obj1);
    expect(obj2).toEqual({a: 1, e: 4, f: 5});
    expect(Object.keys(obj2).length).toEqual(3);
    // Note: reference equality below!
    expect(obj2.a).toBe(obj1.a);
    expect(obj2.b).toBe(undefined);
    expect(obj2.e).toBe(obj1.e);
    expect(obj2.f).toBe(obj1.f);
  });

  it('is the equivalent of clone if the property is not on the original', function() {
    var obj1 = {a: 1, b: {c: 2, d: 3}, e: 4, f: 5};
    var obj2 = F.dissoc('z', obj1);
    expect(obj2).toEqual({a: 1, b: {c: 2, d: 3}, e: 4, f: 5});
    expect(Object.keys(obj2).length).toEqual(4);
    // Note: reference equality below!
    expect(obj2.a).toBe(obj1.a);
    expect(obj2.b).toBe(obj1.b);
    expect(obj2.f).toBe(obj1.f);
  });

  it('makes a shallow clone of an array, removing only the specified index', function() {
    var ary1 = [1, [2, 3], 4, 5];
    var ary2 = F.dissoc(1, ary1);
    expect(ary2).toEqual([1, 4, 5]);
    // Note: reference equality below!
    expect(ary2[0]).toBe(ary1[0]);
    expect(ary2[1]).toBe(ary1[2]);
    expect(ary2[2]).toBe(ary1[3]);
  });

  it('is the equivalent of clone if the index is not on the original', function() {
    var ary1 = [1, [2, 3], 4];
    var ary2 = F.dissoc(5, ary1);
    expect(ary2).toEqual([1, [2, 3], 4]);
    // Note: reference equality below!
    expect(ary2[0]).toBe(ary1[0]);
    expect(ary2[1]).toBe(ary1[1]);
    expect(ary2[2]).toBe(ary1[2]);
  });
});

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
