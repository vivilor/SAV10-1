<template lang="pug">
  .TextButton(
    :class="renderClasses()"
    @click="onClick"
  )
    div(v-if="config" v-html="config.text ? config.text : ''")
</template>

<script>
/**
 * Props declaring
 */
const propConfig = {
  type: Object,
  default () {
    return {}
  }
}
const propName = {
  type: String,
  required: true,
  default: ''
}

const Events = {
  click: 'button-click',
  mouseenter: 'button-mouseenter',
  mouseleave: 'button-mouseleave'
}

export default {
  name: 'TextButton',
  props: {
    config: propConfig,
    name: propName
  },
  methods: {
    renderClasses () {
      let typeClass = this.config.type || 'normal'
      let flexible = this.config.flexible || ''
      return [ typeClass, flexible ]
    },
    onClick () {
      this.$emit(Events.click, this.name)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/default';

.TextButton {
  height: 36px;
  display: inline-flex;
  align-items: center;
  border-radius: 2px;

  cursor: pointer;
  transition: .2s ease-out;
  /**
   * Button types' styles
   */

  &.normal {
    background-color: $main-clr;
    color: white;
    &:hover {
      background-color: $danger-clr;
    }
  }
  &.danger {
    background-color: $danger-clr;
    color: white;
    &:hover {
      background-color: white;
      color: $danger-clr
    }
  }
  &.light {
    background-color: white;
    color: #4ecdc4;
  }

  &:active {
    transform: scale(0.95);
  }
  &:not(.flexible) {
    min-width: 106px;
    justify-content: center;
  }
  &.flexible {
    justify-content: flex-start;
  }

  /**
   * Inner text styles
   */
  & > div {
    @include buttonText;
  }
}
</style>
