<template>
  <div
    class="RestartButton"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @click="setAndShowModal('restartRequest')"
  >
    <transition name="hover" mode="in-out">
      <component :is="hover ? 'Hover' : 'Normal'"/>
    </transition>
  </div>
</template>

<script>
import Hover from './Hover'
import Normal from './Normal'

import { mapActions } from 'vuex'

export default {
  name: 'RestartButton',
  components: {
    Hover, Normal
  },
  data () {
    return {
      hover: false
    }
  },
  methods: {
    ...mapActions('modalWindow', [
      'setAndShowModal'
    ])
  }
}
</script>

<style lang="scss">
.hover {
  &-enter {
    opacity: 0;
    /*&-to { }*/
    &-active { transition: .2s linear }
  }
  &-leave {
    &-to { opacity: 0; }
    &-active { transition: .2s linear }
  }
}
</style>

<style lang="scss" scoped>
.RestartButton {
  &:active { transform: scale(0.95) }
  top: 0;
  right: 0;
  width: 24px;
  height: 29px;
  cursor: pointer;
  position: absolute;
  & > svg {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
