/* eslint-disable no-return-assign */
const SHOW = state => state.visible = true
const HIDE = state => state.visible = false
const SET_TYPE = (state, newType) => state.currentType = newType

export { SHOW, HIDE, SET_TYPE }
