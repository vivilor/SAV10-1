<template lang="pug">
.App(style="margin: auto")
  div
    RestartButton(@restart-request="onRestartRequest")
    TaskHeader
    StepsBar
    StepHeader
    StaticBackground
    .step-wrapper
      component(
        v-if="currentStepComponentName",
        :is="currentStepComponentName"
        :event-bus="eventBus"
      )
    .buttons(
      v-if="currentStepButtonTypes"
      v-for="(buttonType, i) in currentStepButtonTypes", :key="i"
    )
      TextButton(
        :name="buttonType",
        :content="button(buttonType)",
        @click.native="onStepButtonClick(buttonType)"
      )
    ModalWindow(@button-click="onModalWindowButtonClick")
</template>

<script>

import Vue from 'vue'

import StepsBar from '@/components/widgets/StepsBar'
import StepHeader from '@/components/widgets/StepHeader'
import TaskHeader from '@/components/widgets/TaskHeader'
import TextButton from '@/components/widgets/TextButton'
import ModalWindow from '@/components/widgets/ModalWindow'
import RestartButton from '@/components/widgets/RestartButton/RestartButton'
import StaticBackground from '@/components/StaticBackground'

import FillFieldsTask from '@/components/steps/fill-fields/FillFieldsTask'
import DragAndDropGridTask from '@/components/steps/drag-and-drop-grid/DragAndDropGridTask'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

const MODAL_WINDOW_MODULE_NAME = 'modalWindow'

export default {
  name: 'App',
  data () {
    return {
      eventBus: new Vue()
    }
  },
  components: {
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
    ...mapState(MODAL_WINDOW_MODULE_NAME, {
      currentModalWindowType: 'currentType'
    }),
    ...mapGetters([
      'currentStep',
      'button',
      'isLastStep',
      'currentStepComponentName',
      'currentStepButtonTypes'
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

    /** Mapping actions */

    ...mapActions(MODAL_WINDOW_MODULE_NAME, {
      setAndShowModal: 'setAndShowModal'
    }),

    /** Event handlers section */

    /** Native events' callbacks */

    validateStep () {
      this.eventBus.$emit('validate', this.currentStep)
    },
    resetStep () {
      this.eventBus.$emit('reset', this.currentStep)
    },
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

    /**
     * @component RestartButton
     * @event restart-request
     */
    onRestartRequest () {
      this.setAndShowModal('restartRequested')
    },

    onValidationPass () {
      this.setAndShowModal(this.isLastStep ? 'finalReached' : 'validationPassed')
    },

    onValidationFail () {
      this.setAndShowModal('validationFailed')
    },

    /**
     * @component ModalWindow
     * @event button-click
     * @param buttonName
     */
    onModalWindowButtonClick (buttonName) {
      switch (this.currentModalWindowType) {
        case 'restartRequested':
          switch (buttonName) {
            case 'yes':
              this.changeStep(0)
              this.resetStep()
              break
            default:
              break
          }
          break
        case 'validationPassed':
          this.increaseStep()
          this.resetStep()
          break
        case 'validationFailed':
          this.resetStep()
          break
      }
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
    & > div.buttons {
      position: absolute;
      bottom: 0;
      right: 0;
      & > *:not(:first-child) {
        margin-left: 10px;
      }
    }
  }
}
</style>
