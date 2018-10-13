<template>
  <div style="margin: auto" class="App">
    <div>
      <RestartButton/>
      <TaskHeader/>
      <StepsBar/>
      <StepHeader/>
      <StaticBackground/>
      <div class="step-wrapper">
        <component
          v-if="currentStepComponentName"
          :is="currentStepComponentName"
          :event-bus="eventBus"
        />
      </div>
      <ButtonsBar/>
      <ModalWindow/>
    </div>
  </div>
</template>

<script>
import StepsBar from '@/components/widgets/StepsBar'
import StepHeader from '@/components/widgets/StepHeader'
import TaskHeader from '@/components/widgets/TaskHeader'
import TextButton from '@/components/widgets/TextButton'
import ModalWindow from '@/components/widgets/ModalWindow'
import RestartButton from '@/components/widgets/RestartButton/RestartButton'
import StaticBackground from '@/components/StaticBackground'
import ButtonsBar from '@/components/widgets/ButtonsBar'

import FillFieldsTask from '@/components/steps/fill-fields/FillFieldsTask'
import DragAndDropGridTask from '@/components/steps/drag-and-drop-grid/DragAndDropGridTask'

import { mapState, mapGetters, mapMutations } from 'vuex'

const MODAL_WINDOW_MODULE_NAME = 'modalWindow'

export default {
  name: 'App',
  components: {
    ButtonsBar,
    DragAndDropGridTask,
    FillFieldsTask,
    TextButton,
    StepsBar,
    StepHeader,
    ModalWindow,
    RestartButton,
    StaticBackground,
    TaskHeader
  },
  computed: {
    ...mapState([
      'eventBus']
    ),
    ...mapState(MODAL_WINDOW_MODULE_NAME, {
      currentModalWindowType: 'currentType',
      eventBus: 'eventBus'
    }),
    ...mapGetters([
      'currentStep',
      'isLastStep',
      'currentStepComponentName'
    ])
  },
  mounted () {
    this.eventBus.$on('validation-fail', this.onValidationFail)
    this.eventBus.$on('validation-pass', this.onValidationPass)
  },
  methods: {
    /** Mapping mutations */

    ...mapMutations(MODAL_WINDOW_MODULE_NAME, {
      setModalType: 'SET_TYPE'
    }),
    ...mapMutations({
      changeStep: 'CHANGE_STEP',
      increaseStep: 'INCREASE_STEP'
    }),

    /** Event handlers section */

    /** Native events' callbacks */

    /**
     * @component TextButton
     * @event click.native
     * @param buttonName
     */
    onStepButtonClick (buttonName) {
      if (buttonName === 'validate') {
        this.validateStep()
        return
      }
      if (buttonName === 'tip') {
        this.setAndShowModal('tipRequested')
      }
    },

    /** Child component events' callbacks */

    onValidationPass () {
      this.setAndShowModal(this.isLastStep ? 'finalReached' : 'validationPassed')
    },

    onValidationFail () {
      this.setAndShowModal('validationFailed')
    }
  }
}
</script>

<style lang="scss">
@import "~@/assets/styles/default.scss";

.App {
  @include workfieldStyle;
  & > div {
    // Layout subscript captions font size fix
    sub { font-size: 60%; }
    display: inline-block;
    position: relative;
    @include innerWorkfieldZoneStyle;
    & > svg.StaticBackground {
      left: 30px;
      bottom: 0;
      position: absolute;
    }
    & > div.step-wrapper {
      display: inline-block;
    }
  }
}
</style>
