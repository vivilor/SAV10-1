const allFieldsNotEmpty = state => {
  for (let questionAnswers of state.questionsAnswers) {
    for (let questionAnswer of questionAnswers) {
      if (questionAnswer === '') {
        return false
      }
    }
  }
  return true
}

/**
 * Validate all fields for current question
 * @param state
 * @returns {Function}
 */

const areQuestionFieldsValid = state => payload => {
  let questionIndex = payload.questionIndex
  let currentAnswers = state.field.values[questionIndex]
  let validAnswers = payload.validAnswers

  for (let answer of currentAnswers) {
    if (!validAnswers.includes(answer)) { return false }
  }

  return true
}

export {
  allFieldsNotEmpty,
  areQuestionFieldsValid
}
