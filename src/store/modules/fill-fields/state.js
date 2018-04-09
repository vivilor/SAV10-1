// TODO: Add check for empty arrays / undefined properties
export default function (stepsData, stepIndex) {
  let stepData = stepsData[stepIndex]
  let questionCount = stepData.questions.length
  let answersCounts = Array.from(
    Array(questionCount),
    (v, i) => stepData.answers[i].correctValues.length)
  return {
    question: {
      active: -1,
      validation: Array(questionCount).fill(false)
    },
    field: {
      active: -1,
      values: Array.from(Array(questionCount), (v, i) => Array(answersCounts[i]).fill(''))
    }
  }
}
