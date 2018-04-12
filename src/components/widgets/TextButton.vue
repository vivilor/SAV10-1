<template lang="pug">
  .TextButton(:class="renderClasses()")
    div(v-if="content" v-html="content.text || ''")
</template>

<script>
/**
 * Props declaring
 */
const propContent = {
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

export default {
  name: 'TextButton',
  props: {
    content: propContent,
    name: propName
  },
  methods: {
    renderClasses () {
      let typeClass = this.content.type || 'normal'
      let flexible = this.content.flexible || ''
      return [ typeClass, flexible ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/default';

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
