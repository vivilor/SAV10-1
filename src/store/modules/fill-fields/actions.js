const validate = ({commit, getters, state}, validAnswers) => {
  const validationIteration = (questionAnswers, questionIndex) => {
    let isQuestionAnswered = getters.areQuestionFieldsValid({
      questionIndex: questionIndex,
      validAnswers: questionAnswers
    })
    if (isQuestionAnswered) {
      commit('SET_QUESTION_ANSWERED', questionIndex)
    } else {
      commit('SET_QUESTION_UNANSWERED', questionIndex)
    }
  }

  validAnswers.forEach(validationIteration)
  commit('DISPLAY_VALIDATION_RESULT')
}

const selectField = ({commit}, payload) => {
  commit('SET_FIELD_ACTIVE', payload.fieldIndex)
  commit('SET_QUESTION_ACTIVE', payload.questionIndex)
  commit('HIDE_ACTIVE_QUESTION_VALIDATION_RESULT')
}

const unselectField = ({commit}) => {
  commit('SET_FIELD_INACTIVE')
  commit('SET_QUESTION_INACTIVE')
}

export {
  validate,
  selectField,
  unselectField
}
