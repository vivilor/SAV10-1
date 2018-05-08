<template lang="pug">
.FillFieldsTask
  .Question(v-for="(question,i) in content.questions")
    .QuestionText(
      v-html="(i+1) + ' ' + question.text"
      :class="{ highlight: activeQuestion === i }"
    )
    .QuestionFields
      InputField(
        v-for="j in content.fields[i].count",
        :key="j",
        :width="content.fields[i].width",
        :prefix="content.fields[i].prefix",
        :postfix="content.fields[i].postfix",
        :position="content.fields[i].position",
        :field-index="j-1",
        :question-index="i",
      )
</template>

<script>
import Content from '@/locale/ru-ru'
import InputField from './InputField'
import { mapState, mapGetters, mapMutations } from 'vuex'

const validity = [
  [true],
  [true, true, true],
  [true, true, true]
]

const RELATED_MODULE_NAME = 'fillFields'

export default {
  name: 'FillFieldsTask',
  components: {InputField},
  props: {
    eventBus: {
      type: Object,
      required: true
    }
  },
  data () {
    const content = Content.steps.data[0]
    const answers = Array.from(
      content.answers,
      row => Array.from(
        row,
        answer => answer.toString()
      )
    )
    return {
      stepIndex: 0,
      answers,
      content
    }
  },
  mounted () {
    this.handleEvents()
  },
  computed: {
    ...mapState(RELATED_MODULE_NAME, [
      'values'
    ]),
    ...mapGetters(RELATED_MODULE_NAME, [
      'activeQuestion'
    ])
  },
  methods: {
    ...mapMutations(RELATED_MODULE_NAME, [
      'UPDATE_VALIDITY',
      'RESET_VALIDITY',
      'RESET_HIGHLIGHT',
      'HIGHLIGHT_ALL',
      'RESET_ALL_VALUES',
      'RESET_ACTIVE_QUESTION'
    ]),
    handleEvents () {
      this.eventBus.$on('validate', this.onValidate)
      this.eventBus.$on('reset', this.onReset)
    },
    onValidate (stepIndex) {
      if (stepIndex !== this.stepIndex) { return }

      let answers = Array.from(this.answers, answer => answer.slice())
      let isValid = true

      for (let i = 0; i < validity.length; i++) {
        validity[i].fill(true)
      }

      for (let i = 0; i < answers.length; i++) {
        for (let j = 0; j < answers[i].length; j++) {
          if (!answers[i].includes(this.values[i][j])) {
            validity[i][j] = false

            if (isValid) {
              isValid = false
            }
          } else {
            answers[i][answers[i].indexOf(this.values[i][j])] = undefined
            console.log(answers[i])
          }
        }
      }

      this.HIGHLIGHT_ALL()
      this.UPDATE_VALIDITY(validity)
      this.eventBus.$emit(isValid ? 'validation-pass' : 'validation-fail')
    },

    onReset (stepIndex, isFull) {
      if (stepIndex !== this.stepIndex) return

      this.RESET_ACTIVE_QUESTION()

      if (isFull) {
        console.log('Full restart')
        this.RESET_ALL_VALUES()
        this.RESET_VALIDITY()
        this.RESET_HIGHLIGHT()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/default';

.FillFieldsTask {
  right: 0px;
  width: inherit;
  display: inline-flex;
  position: absolute;
  flex-direction: column;
  justify-content: space-between;
  .Question {
    &:first-child {
      margin-bottom: 20px;
    }
    &:not(:first-child) {
      margin: 20px 0;
    }
    .QuestionText {
      display: inline-block;
      padding: 2px 8px 2px;
      margin-bottom: 20px;
      border-radius: 4px;
      @include subheaderText;
      transition: background-color .2s linear;
      &.highlight {
        background-color: $warning-clr;
      }
    }
    .QuestionFields {
      padding-left: 20px;
      display: flex;
      align-items: center;
      & > {
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
              width: calc(100%);
              border: 1px solid #f4f4f4;
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
      }
    }
  }
}
</style>
