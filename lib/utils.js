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

const camelCaseToConstantCase = (str) => str.replace( /([A-Z])/g, "_$1" ).toUpperCase();

export const payloadActions = (service) => {
  return new Proxy({}, {
      get(target, name) {
          const actionType = camelCaseToConstantCase(name)
          const actionTypeWithPrefix = service ? `${service}/${actionType}` : actionType
          
          const action = (payload, meta = {}) => ({ type: actionTypeWithPrefix, payload, meta })
          action.type = actionTypeWithPrefix
        
          return action
      }
  })
}

export const errorActions = (service) => {
  return new Proxy({}, {
      get(target, name) {
          const actionType = camelCaseToConstantCase(name)
          const actionTypeWithPrefix = service ? `${service}/${actionType}` : actionType
          
          const action = (payload = {}, meta = {}) => ({ type: actionTypeWithPrefix, payload, meta, error: true })
          action.type = actionTypeWithPrefix
          action.error = true
        
          return action
      }
  })
}