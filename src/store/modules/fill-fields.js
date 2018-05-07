/* eslint-disable no-return-assign */
import Vue from 'vue'

const state = {
  values: [[''], ['', '', ''], ['', '', '']],
  validity: [[false], [false, false, false], [false, false, false]],
  highlight: [[false], [false, false, false], [false, false, false]],
  activeQuestion: -1
}

const getters = {
  activeQuestion: state => state.activeQuestion,
  isHighlighted: state => (qIndex, fIndex) => state.highlight[qIndex][fIndex],
  getFieldValue: state => (qIndex, fIndex) => state.values[qIndex][fIndex],
  isValid: state => (qIndex, fIndex) => state.validity[qIndex][fIndex]
}

const mutations = {
  RESET_ACTIVE_QUESTION: state => state.activeQuestion = -1,
  RESET_HIGHLIGHT: state => state.highlight = Array.from(
    state.highlight,
    question => Array.from(question, field => false)
  ),
  SET_ACTIVE_QUESTION: (state, qIndex) => state.activeQuestion = qIndex,
  UPDATE_VALIDITY: (state, validity) => state.validity = validity,
  RESET_FIELD_HIGHLIGHT: (state, qIndex, fIndex) =>
    Vue.set(state.highlight[qIndex], fIndex, false),
  HIGHLIGHT_ALL: state =>
    state.highlight = Array.from(
      state.highlight,
      question => Array.from(question, field => true)
    ),
  RESET_ALL_VALUES: state =>
    state.values = Array.from(
      state.values,
      question => Array.from(question, field => '')
    ),
  RESET_VALIDITY: state =>
    state.values = Array.from(
      state.values,
      question => Array.from(question, field => '')
    ),
  SET_FIELD_VALUE: (state, qIndex, fIndex, newValue) =>
    Vue.set(state.values[qIndex], fIndex, newValue)
}

const actions = {
  prepareField: (context, qIndex, fIndex) => {
    if (context.getters.isHighlighted(qIndex, fIndex)) {
      context.commit('RESET_HIGHLIGHT', qIndex, fIndex)
    }
    context.commit('SET_ACTIVE_QUESTION', qIndex)
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
