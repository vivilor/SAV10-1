export default {
  allQuestionAnswered: state => {
    for (let questionAnswers of state.questionsAnswers) {
      for (let questionAnswer of questionAnswers) {
        if (questionAnswer === '') { return false }
      }
    }

    return true
  },

  allAnswersValid: state => {
    for (let questionAnswersValidity of state.questionsAnswersValidity) {
      for (let questionAnswerValidity of questionAnswersValidity) {
        if (!questionAnswerValidity) { return false }
      }
    }

    return true
  },

  isQuestionAnswered: (state, questionIndex) => !state.questionsAnswersValidity[questionIndex].includes(false)

}
