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

export const fluxPayloadActions = (service) => {
  return new Proxy({}, {
      get(target, name) {
          const actionType = camelCaseToConstantCase(name)
          const actionTypeWithPrefix = service ? `${service}/${actionType}` : actionType
          
          const action = payload => ({ type: actionTypeWithPrefix, payload })
          action.type = actionTypeWithPrefix
        
          return action
      }
  })
}

export const fluxErrorActions = (service) => {
  return new Proxy({}, {
      get(target, name) {
          const actionType = camelCaseToConstantCase(name)
          const actionTypeWithPrefix = service ? `${service}/${actionType}` : actionType
          
          const action = (payload = {}) => ({ type: actionTypeWithPrefix, payload, error: true })
          action.type = actionTypeWithPrefix
          action.error = true
        
          return action
      }
  })
}