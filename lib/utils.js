export const matchPattern = (pattern, action) => {
  if (!pattern) {
    return false
  }

  if (Array.isArray(pattern)) {
    return pattern.includes(action.type)
  }

  if (typeof pattern === 'function') {
    return pattern(action)
  }

  return pattern === action.type
}

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
