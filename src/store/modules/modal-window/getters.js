const DEFAULT_TYPE_DATA = {
  header: '',
  message: '',
  closable: true,
  buttonTypes: []
}

const typeData = state => state.content[state.currentType] || DEFAULT_TYPE_DATA

const header = (state, getters) => getters.typeData.header || ''
const message = (state, getters) => getters.typeData.message || ''
const closable = (state, getters) => getters.typeData.closable || false
const buttonTypes = (state, getters) => getters.typeData.buttons || []

export {
  header,
  message,
  closable,
  typeData,
  buttonTypes
}
