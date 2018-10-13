<template lang="pug">
transition(name="modal-window")
  .ModalWindow(v-if="content", v-show="visible")
    .overlay(@click="onOverlayClick")
      .window
        .header
        .body
          .text
            h3.header(v-if="header" v-html="header")
            .message(v-if="message" v-html="message")
          .buttons(v-if="buttonTypes")
            TextButton(v-for="(buttonType, i) in buttonTypes", :key="i",
              :name="buttonType"
              :content="button(buttonType)",
              @click.native="onButtonClick(buttonType)"
            )
        .footer
          TipImage(v-if="currentType === 'tipRequested'")

</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import TextButton from '@/components/widgets/TextButton'
import TipImage from '@/components/static/TipImage'

const MODAL_WINDOW_MODULE_NAME = 'modalWindow'

export default {
  name: 'ModalWindow',
  components: {
    TextButton,
    TipImage
  },
  computed: {
    ...mapState(MODAL_WINDOW_MODULE_NAME, [
      'visible',
      'content',
      'currentType'
    ]),
    ...mapGetters(MODAL_WINDOW_MODULE_NAME, [
      'closable',
      'header',
      'message',
      'buttonTypes'
    ]),
    ...mapGetters([
      'button'
    ])
  },
  methods: {
    ...mapMutations([
      'CHANGE_STEP',
      'INCREASE_STEP'
    ]),
    ...mapMutations(MODAL_WINDOW_MODULE_NAME, {
      show: 'SHOW',
      hide: 'HIDE',
      setType: 'SET_TYPE'
    }),
    onOverlayClick () {
      if (this.closable) {
        this.hide()
      }
    },
    resetStep ({full} = {full: true}) {
      this.eventBus.$emit('reset', this.currentStep, full)
    },
    onButtonClick (buttonName) {
      switch (this.currentType) {
        case 'restartRequested':
          switch (buttonName) {
            case 'yes':
              this.CHANGE_STEP(0)
              this.resetStep()
              break
            default:
              break
          }
          break
        case 'validationPassed':
          this.INCREASE_STEP()
          this.resetStep()
          break
        case 'validationFailed':
          this.resetStep({full: false})
          break
      }
    }
  }
}
</script>
<style lang="scss">
.modal-window {
  &-enter {
    opacity: 0;
    & .window{ transform: scale(0) }
    &-active {
      transition: .5s linear .1s;
      & .window{ transition: .4s cubic-bezier(0.8, 1.5, 1, 1) .1s }
    }
    &-to {
      & .window{ transform: scale(1) }
      opacity: 1;
    }
  }
  &-leave {
    opacity: 1;
    & .window{ transform: scale(1) }
    &-active {
      transition: .5s linear .1s;
      & .window{ transition: .4s cubic-bezier(0.3,-0.15, 0.5, 0.2) .1s }
    }
    &-to {
      & .window{ transform: scale(0) }
      opacity: 0;
    }
  }
}
</style>

<style lang="scss" scoped>
@import "~@/assets/styles/default";

.ModalWindow {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  position: absolute;
  & > .overlay {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    & > .window {
      // Sizes
      border: 10px solid white;
      padding: 10px 20px;
      min-width: 400px;
      box-shadow: 0px 0px 6px 2px $inactive-element-clr;
      // Inner blocks positioning
      display: flex;
      align-items: center;
      flex-direction: column;
      // Background
      background: #f5f4ef;
      & > {
        .body {
          display: flex;
          align-items: center;
          flex-direction: row;
          justify-content: space-between;
          & > {
            .text {
              flex: auto;
              display: flex;
              min-width: 300px;
              flex-direction: column;
              & > {
                h3.header {
                  margin: 0 0 10px 0;
                  @include headerText;
                  color: $correct-text-clr;
                }
                .message {
                  @include normalText;
                  color: $text-clr;
                }
              }
            }
            .buttons {
              flex: initial;
              & > *:not(:first-child){
                margin-left: 10px;
              }
            }
          }
        }
        .footer > .TipImage {
          padding: 10px 0;
        }
      }
    }
  }
}
</style>
