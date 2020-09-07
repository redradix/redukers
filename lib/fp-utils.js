// Logic

export const isNil = item => item === null || item === undefined

// Objects

export const isObject = val => val === Object(val)

const mergeWithKey = (fn, l, r) => {
  var result = {};
  var k;

  for (k in l) {
    if (l[k]) {
      result[k] = r[k] ? fn(k, l[k], r[k]) : l[k];
    }
  }

  for (k in r) {
    if (r[k] && !(result[k])) {
      result[k] = r[k];
    }
  }

  return result;
};

const mergeWith = (fn, l, r) => {
  return mergeWithKey(function(_, _l, _r) {
    return fn(_l, _r);
  }, l, r);
};

export const mergeDeepLeft = (left, right) => {
  if (Array.isArray(left) && Array.isArray(right)) {
    return [...right, ...left];
  }

  if (isObject(left) && isObject(right)) {
    return mergeWith(mergeDeepLeft, left, right);
  }

  return left;
};

export const assoc = (prop, val, obj) => {
  const result = {};

  for (let p in obj) {
      result[p] = obj[p];
  }

  result[prop] = val;

  return result;
}

// Function

export const pipe = (...fns) => {
  if (fns.length === 0) {
    throw new Error('Pipe needs at least one function')
  }

  return (...values) => {
    let value = fns[0](...values)

    for (const fn of fns.slice(1)) {
      value = fn(value)
    }

    return value
  }
}
