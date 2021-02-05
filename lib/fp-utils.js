// Logic

export const isNil = item => item === null || item === undefined

export const isObject = val => val === Object(val)

// Objects

const _has = (prop, obj) => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

const mergeWithKey = (fn, l, r) => {
  var result = {};
  var k;

  for (k in l) {
    if (_has(k, l)) {
      result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k];
    }
  }

  for (k in r) {
    if (_has(k, r) && !(_has(k, result))) {
      result[k] = r[k];
    }
  }

  return result;
};

const mergeDeepWithKey = (fn, lObj, rObj) => {
  return mergeWithKey(function(k, lVal, rVal) {
    if (isObject(lVal) && isObject(rVal)) {
      return mergeDeepWithKey(fn, lVal, rVal);
    } else {
      return fn(k, lVal, rVal);
    }
  }, lObj, rObj);
}

export const mergeDeepLeft = function mergeDeepLeft(lObj, rObj) {
  return mergeDeepWithKey(function(k, lVal, rVal) {
    return lVal;
  }, lObj, rObj);
};

export const assoc = (prop, val, obj) => {
  if (Array.isArray(obj)) {
    var arr = [].concat(obj);
    arr[prop] = val;
    return arr;
  }

  const result = {};

  for (let p in obj) {
      result[p] = obj[p];
  }

  result[prop] = val;

  return result;
}

export const dissoc = (prop, obj) => {
  if (Array.isArray(obj)) {
    return [...obj.slice(0, prop), ...obj.slice(prop + 1)]
  }

  const result = { ...obj }
  delete result[prop]
  return result
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
