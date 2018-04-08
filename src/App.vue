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
import { retrieveKeysArray } from '@/utils'
import { createNamespacedHelpers } from 'vuex'

import { mapMutations, mapState, mapGetters } from 'vuex'

/**
 * Importing module 'global'
 */
import { GlobalMutations } from '@/store/modules/global/mutations'
import { ModalWindowMutations } from '@/store/modules/modal-window/mutations'

const global = createNamespacedHelpers('global')
const modalWindow = createNamespacedHelpers('modalWindow')

export default {
  name: 'App',
  components: {
    ModalWindow,
    RestartButton,
    StaticBackground,
    StepsBar,
    StepHeader,
    TaskHeader
  },
  data () {
    return {
      content: Content
    }
  },
  computed: {
    ...mapGetters({
    
    })
  },
  methods: {
    /**
     * Mapping mutations
     */
    ...mapMutations({
      showModalWindow: 'modalWindow/' + ModalWindowMutations.show,
      hideModalWindow: 'modalWindow/' + ModalWindowMutations.hide,
      setModalWindowType: 'modalWindow/' + ModalWindowMutations.setType
    }),
    ...mapMutations({
      changeStep: 'global/' + GlobalMutations.step.change,
      stepToStart: 'global/' + GlobalMutations.step.toStart,
      increaseStep: 'global/' + GlobalMutations.step.increase
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
    onRestartRequest () {},

    onModalWindowClick () {
      // switch (this.currentModalWindowName) {
      //   case 'restartRequested':
      //     switch (this.lastModalWindowButtonClicked) {
      //       case 'yes': this.setStepToStart(); break
      //       default: this.hideModalWindow(); break
      //     }
      //     break
      //   case 'validationPass':
      //     this.hideModalWindow()
      //     break
      //   case 'validationFail':
      //     // TODO: Add reseting mutation for step component
      //     break
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
