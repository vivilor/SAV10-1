const DEFAULT_START_STEP = 1

export default (content, stepNames) => {
  if (!content.steps || !content.steps.data || !content.steps.data.length) return {}

  let startStep = content.steps.start || DEFAULT_START_STEP

  return {
    content: content,
    step: {
      components: stepNames || [],
      current: startStep,
      start: startStep,
      count: content.steps.data.length
    }
  }
}
