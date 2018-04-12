const closable = state => state.content.closable || false
const header = state => state.content.header || ''
const message = state => state.content.message || ''
const typeData = state => state.content[state.currentType]
const buttonTypes = state => state.content.buttons || []

export {
  header,
  message,
  closable,
  typeData,
  buttonTypes
}
