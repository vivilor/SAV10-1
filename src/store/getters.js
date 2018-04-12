const currentStepHeader = state => state.content.headers.step[state.step.current] || ''

const currentStepButtonTypes = state => state.content.steps.data[state.step.current].buttons || []

const button = state => type => state.content.buttons[type] || ''

const currentStepComponentName = state => state.step.components[state.step.current] + 'Task' || ''

export {
  currentStepHeader,
  currentStepComponentName,
  currentStepButtonTypes,
  button
}
