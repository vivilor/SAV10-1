/* eslint-disable no-return-assign */
import Vue from 'vue'

const SHOW_VALIDATION_RESULT = state =>
  state.question.statusVisible = Array(state.question.statusVisible).fill(true)

const HIDE_VALIDATION_RESULT = state =>
  state.question.statusVisible = Array(state.question.statusVisible).fill(false)

const HIDE_ACTIVE_QUESTION_VALIDATION_RESULT = state =>
  Vue.$set(state.question.statusVisible, state.question.active, false)

const SET_FIELD_ACTIVE = (state, fieldIndex) => state.field.active = fieldIndex

const SET_QUESTION_ACTIVE = (state, questionIndex) => state.question.active = questionIndex

// TODO: Add check for payload properties
const SET_FIELD_VALUE = (state, payload) => Vue.$set(
  state.field.values[payload.questionIndex], payload.fieldIndex, payload.fieldValue
)

// TODO: Add check for payload properties
const SET_QUESTION_ANSWERED = (state, questionIndex) => Vue.$set(
  state.question.validation, questionIndex, true
)

// TODO: Add check for payload properties
const SET_QUESTION_UNANSWERED = (state, questionIndex) => Vue.$set(
  state.question.validation, questionIndex, false
)

const RESET_FIELD_VALUES = state => {
  for (let i in state.field.values) {
    state.field.values[i] = Array(state.field.values.length).fill('')
  }
}

const RESET_QUESTION_VALIDATION = state => {
  state.question.validation = Array(state.question.validation.length).fill(false)
}

const SET_FIELD_INACTIVE = state => state.field.active = -1

const SET_QUESTION_INACTIVE = state => state.question.active = -1

export {
  SET_FIELD_VALUE,
  SET_FIELD_ACTIVE,
  SET_FIELD_INACTIVE,
  SET_QUESTION_INACTIVE,
  SET_QUESTION_ACTIVE,
  SET_QUESTION_ANSWERED,
  SET_QUESTION_UNANSWERED,
  RESET_FIELD_VALUES,
  RESET_QUESTION_VALIDATION,
  SHOW_VALIDATION_RESULT,
  HIDE_VALIDATION_RESULT,
  HIDE_ACTIVE_QUESTION_VALIDATION_RESULT
}
