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
