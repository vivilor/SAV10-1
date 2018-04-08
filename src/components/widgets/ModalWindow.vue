<template lang="pug">
transition(name="modal-window")
  .ModalWindow(v-if="content", v-show="visible")
    .overlay(@click="hide")
      .window
        .text
          h3.header(v-if="content.header" v-html="content.header")
          .message(v-if="content.message" v-html="content.message")
        .buttons(v-if="buttons")
          TextButton(v-for="(button, i) in buttons", :key="button",
            :name="content.buttons[i]"
            :config="button"
          )
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import TextButton from '@/components/widgets/TextButton'
import ModalWindowState from '@/store/modules/modal-window/state'
import { ModalWindowGetters } from '@/store/modules/modal-window/getters'
import { ModalWindowMutations } from '@/store/modules/modal-window/mutations'

const { mapState, mapGetters, mapMutations } = createNamespacedHelpers('modalWindow')

export default {
  name: 'ModalWindow',
  components: {TextButton},
  computed: {
    ...mapState(Object.keys(ModalWindowState)),
    ...mapGetters(Object.keys(ModalWindowGetters))
  },
  methods: {
    ...mapMutations(Object.keys(ModalWindowMutations))
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
@import "~@/styles/default";

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
