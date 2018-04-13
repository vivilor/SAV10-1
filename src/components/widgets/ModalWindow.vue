<template lang="pug">
transition(name="modal-window")
  .ModalWindow(v-if="content", v-show="visible")
    .overlay(@click="onOverlayClick")
      .window
        .text
          h3.header(v-if="header" v-html="header")
          .message(v-if="message" v-html="message")
        .buttons(v-if="buttonTypes")
          TextButton(v-for="(buttonType, i) in buttonTypes", :key="i",
            :name="buttonType"
            :content="button(buttonType)",
            @click.native="onButtonClick(buttonType)"
          )
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

import TextButton from '@/components/widgets/TextButton'

const ModuleName = 'modalWindow'

export default {
  name: 'ModalWindow',
  components: {
    TextButton
  },
  computed: {
    ...mapState(ModuleName, [
      'visible',
      'content'
    ]),
    ...mapGetters(ModuleName, [
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
    ...mapMutations(ModuleName, {
      show: 'SHOW',
      hide: 'HIDE',
      setType: 'SET_TYPE'
    }),
    onOverlayClick () {
      if (this.closable) {
        this.hide()
      }
    },
    onButtonClick (buttonName) {
      this.$emit('button-click', buttonName)
      this.hide()
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
      flex-direction: row;
      justify-content: space-between;
      // Background
      background: #f5f4ef;
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
  }
}
</style>
