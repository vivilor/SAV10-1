<template>
  <div class="InputField">
    <div class="prefix" v-html="prefix"></div>
    <div class="input-wrapper" :class="position" :style="setWidth()">
      <input type="text" v-model="value" v-on="inputEventHandlers"/>
      <div class="line" :class="renderClass()"></div>
    </div>
    <div class="postfix" v-html="postfix"></div>
  </div>
</template>

<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

/** Vue props for this component **/
const PROP_WIDTH = {required: true}
const PROP_FIELD_INDEX = {type: Number, required: true}
const PROP_QUESTION_INDEX = {type: Number, required: true}

const PROP_PREFIX = {type: String, required: false, default: ''}
const PROP_POSTFIX = {type: String, required: false, default: ''}
const PROP_POSITION = {type: String, required: false, default: 'normal'}

/**
 * CSS class name, that used to highlight component content as invalid
 * @type {string}
 */
const CSS_CLASS_WRONG = 'wrong'

/**
 * CSS class name, that used to highlight component content as valid
 * @type {string}
 */
const CSS_CLASS_CORRECT = 'correct'

/**
 * Vuex module, related to this component
 * @type {string}
 */
const RELATED_MODULE_NAME = 'fillFields'

export default {
  name: 'InputField',
  props: {
    width: PROP_WIDTH,
    prefix: PROP_PREFIX,
    postfix: PROP_POSTFIX,
    position: PROP_POSITION,
    fieldIndex: PROP_FIELD_INDEX,
    questionIndex: PROP_QUESTION_INDEX
  },
  computed: {
    ...mapState(RELATED_MODULE_NAME, [
      'values',
      'highlight',
      'validity'
    ]),
    invalidationDisposed () {
      return (
        this.highlight[this.questionIndex][this.fieldIndex] &&
        !this.validity[this.questionIndex][this.fieldIndex]
      )
    },
    value: {
      get () { return this.values[this.questionIndex][this.fieldIndex] },
      set (newValue) { this.$set(this.values[this.questionIndex], this.fieldIndex, newValue) }
    },
    ...mapGetters(RELATED_MODULE_NAME, [
      'isHighlighted',
      'getFieldValue',
      'isValid'
    ])
  },
  data () {
    return {
      inputEventHandlers: {
        input: this.onInput,
        focus: this.onFocus,
        blur: this.onBlur
      }
    }
  },
  methods: {
    ...mapActions(RELATED_MODULE_NAME, [
      'prepareField'
    ]),
    ...mapMutations(RELATED_MODULE_NAME, [
      'RESET_FIELD_HIGHLIGHT',
      'SET_FIELD_VALUE',
      'SET_ACTIVE_QUESTION',
      'RESET_ACTIVE_QUESTION'
    ]),
    setWidth () {
      let styles = {}

      if (this.width) {
        styles.width = this.width
      }

      return styles
    },
    renderClass () {
      let classes = []

      if (this.highlight[this.questionIndex][this.fieldIndex]) {
        if (!this.validity[this.questionIndex][this.fieldIndex]) {
          classes.push(CSS_CLASS_WRONG)
        } else {
          classes.push(CSS_CLASS_CORRECT)
        }
      }

      return classes
    },

    /** Event handlers **/

    onFocus () {
      if (this.invalidationDisposed) {
        this.$set(this.values[this.questionIndex], this.fieldIndex, '')
      }
      this.SET_ACTIVE_QUESTION(this.questionIndex)
    },

    onInput () {
      this.$set(this.highlight[this.questionIndex], this.fieldIndex, false)
    },

    onBlur () {
      this.RESET_ACTIVE_QUESTION()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/default";

  $borderWidth: 1px;

  .InputField {
    margin-right: 40px;
    display: flex;
    flex-direction: row;
    @include normalText;

    .input-wrapper {
      margin: 0 3px;
      position: relative;

      & > input {
        @include normalText;
        text-align: center;
        width: calc(100% - #{$borderWidth} * 2);
        border: $borderWidth solid #f4f4f4;
        &:focus {
          outline: none;
          & + .line {
            background-color: $warning-clr;
          }
        }
      }
      & > .line {
        transition: background-color .2s linear;
        width: calc(100% + 2px);
        bottom: -1px;
        background-color: #727a82;
        height: 2px;
        z-index: 1;
        position: absolute;
        &.wrong {
          background-color: $danger-clr;
        }
        &.correct {
          background-color: $correct-clr;
        }
      }
    }
    .input-wrapper.normal {
      width: 44px;
    }
    .input-wrapper.superscript {
      width: 26px;
      padding-bottom: 6px;
      & > input {
        margin-top: -6px;
        font-size: 60%;
        line-height: 60%;
      }
    }

    .input-wrapper.subscript {
      width: 28px;
      padding-top: 6px;
      & > input {
        margin-top: 6px;
        font-size: 60%;
        line-height: 60%;
      }
    }
  }
</style>
