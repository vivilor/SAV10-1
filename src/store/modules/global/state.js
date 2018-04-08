const START_STEP_DEFAULT = 0

export default function (content) {
  // Extracting current step value
  let taskHeader = content.header ? content.header : ''

  let startStep = content.steps.start ? content.steps.start : START_STEP_DEFAULT

  // Extracting step count, using either defined field or length of steps.data object
  let stepCount = content.steps.count ? content.steps.count : content.steps.data.length

  // Extracting step headers from content file
  let stepHeaders = Array.from(content.steps.data, step => step.header || '')

  return {
    taskHeader: taskHeader,
    step: {
      start: startStep,
      count: stepCount,
      current: startStep,
      headers: stepHeaders
    }
  }
}
