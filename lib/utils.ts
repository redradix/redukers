export const matchPattern = <P>(
  pattern: Pattern<P> | undefined,
  action: Action<P>,
): boolean => {
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
