<template lang="pug">
.App(style="margin: auto")
  div
    RestartButton(@restart-request="onRestartRequest")
    TaskHeader
    StepsBar
    StepHeader
    StaticBackground
    ModalWindow(@modal-window-click="onModalWindowClick")
</template>

<script>
import Content from '@/locale/ru-ru'

import TaskHeader from '@/components/widgets/TaskHeader'
import StepsBar from '@/components/widgets/StepsBar'
import StepHeader from '@/components/widgets/StepHeader'
import StaticBackground from '@/components/StaticBackground'
import RestartButton from '@/components/widgets/RestartButton/RestartButton'
import ModalWindow from '@/components/widgets/ModalWindow'

import { mapState, mapMutations, mapActions } from 'vuex'

const modalWindowModuleName = 'modalWindow'
const globalModuleName = 'global'

export default {
  name: 'App',
  components: {
    StepsBar,
    StepHeader,
    ModalWindow,
    RestartButton,
    StaticBackground,
    TaskHeader
  },
  data () {
    return {
      content: Content
    }
  },
  computed: {
    ...mapState(modalWindowModuleName, {
      currentModalType: 'currentType',
      lastModalButtonClicked: 'lastButton'
    })
  },
  methods: {
    /**
     * Mapping mutations
     */
    ...mapMutations(modalWindowModuleName, {
      showModal: 'SHOW',
      hideModal: 'HIDE',
      setModalType: 'SET_TYPE'
    }),
    ...mapMutations(globalModuleName, {
      changeStep: 'CHANGE_STEP',
      goToStartStep: 'GO_TO_START_STEP',
      increaseStep: 'INCREASE_STEP'
    }),
    ...mapActions(modalWindowModuleName, {
      setAndShowModal: 'setAndShowModal'
    }),

    /**
     * Event handlers section
     */

    /**
     * Child component events' callbacks
     */

    /**
     * @event: restart-request
     * @component: RestartButton
     */
    onRestartRequest () {
      this.setAndShowModal('restartRequested')
    },

    onModalWindowClick () {
      switch (this.currentModalType) {
        case 'restartRequested':
          switch (this.lastModalButtonClicked) {
            case 'yes':
              this.goToStartStep()
              break
            default:
              break
          }
          break
        case 'validationPass':
          this.increaseStep()
          break
        case 'validationFail':
          // TODO: Add reseting mutation for step component
          break
      }
      this.hideModal()
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/default.scss";

.App {
  @include workfieldStyle;
  & > div {
    display: inline-block;
    position: relative;
    @include innerWorkfieldZoneStyle;
    & > svg.StaticBackground {
      left: 30px;
      bottom: 0;
      position: absolute;
    }
  }
}
</style>
