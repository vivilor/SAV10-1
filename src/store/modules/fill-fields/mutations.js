/* eslint-disable no-return-assign */

const SHOW_VALIDATION_RESULT = state => state

const HIDE_VALIDATION_RESULT = state => state

const HIDE_ACTIVE_QUESTION_VALIDATION_RESULT = state => state

const SET_FIELD_ACTIVE = state => state

const SET_QUESTION_ACTIVE = state => state

// TODO: Add check for payload properties
const SET_FIELD_VALUE = state => state

// TODO: Add check for payload properties
const SET_QUESTION_ANSWERED = state => state

// TODO: Add check for payload properties
const SET_QUESTION_UNANSWERED = state => state

const RESET_FIELD_VALUES = state => state

const RESET_QUESTION_VALIDATION = state => state

const SET_FIELD_INACTIVE = state => state

const SET_QUESTION_INACTIVE = state => state

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
