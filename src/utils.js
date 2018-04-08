export const retrieveKeysArray = (obj) => {
  let ret = []
  for (let key in obj) {
    if (typeof obj[key] !== 'object') { ret.push(key) } else {
      let subKeys = Array.from(retrieveKeysArray(obj[key]), subKey => key + '.' + subKey)
      ret = ret.concat(subKeys)
    }
  }
  return ret
}
