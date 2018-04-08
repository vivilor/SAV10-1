import Vue from 'vue'

export const FillFieldsMutationTypes = {
  setAnswerValue: 'setAnswer',
  setAnswerValidity: 'setAnswerValidity',
  setActiveFieldIndex: 'setActiveField',
  setActiveQuestionIndex: 'setActiveQuestion'
}

export default {
  [FillFieldsMutationTypes.setActiveFieldIndex] (state, newActiveFieldIndex) {
    state.activeFieldIndex = newActiveFieldIndex
  },
  [FillFieldsMutationTypes.setActiveQuestionIndex] (state, newActiveQuestionIndex) {
    state.activeQuestionIndex = newActiveQuestionIndex
  },
  [FillFieldsMutationTypes.setAnswerValue] (state, payload) {
    const answerIndex = payload.answerIndex
    const answerValue = payload.answerValue
    const questionIndex = payload.questionIndex

    Vue.$set(state.questionsAnswers[questionIndex], answerIndex, answerValue)
  },
  [FillFieldsMutationTypes.setAnswerValidity] (state, payload) {
    const answerIndex = payload.answerIndex
    const questionIndex = payload.questionIndex
    const answerValidity = payload.answerValidity

    Vue.$set(state.questionsAnswersValidity[questionIndex], answerIndex, answerValidity)
  }
}
