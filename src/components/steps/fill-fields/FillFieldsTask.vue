<template lang="pug">
.FillFieldsTask
  .Question(v-for="(question,i) in content.questions")
    .QuestionText(
      v-html="(i+1) + ' ' + question.text"
      :class="{ highlight: selectedQuestion === i }"
    )
    .QuestionFields
      .InputField(v-for="j in content.fields[i].count")
        .prefix(v-html="content.fields[i].prefix || ''")
         <!--TODO: Refactor bindings-->
        .input-wrapper(
          :class="content.fields[i].position"
          :style="{ width: content.fields[i].width }"
        )
          input(
            v-model="values[i][j - 1]"
            type="text",
            @focus="onFieldFocus(i)",
            @blur="onFieldBlur"
          )
          .line
        .postfix(v-html="content.fields[i].postfix || ''")
</template>

<script>
import Content from '@/locale/ru-ru'

const valuesArray = () => [
  [''],
  ['', '', ''],
  ['', '', '']
]

export default {
  name: 'FillFieldsTask',
  props: {
    eventBus: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      stepIndex: 1,
      selectedQuestion: -1,
      content: Content.steps.data[0],
      values: valuesArray()
    }
  },
  mounted () {
    this.handleEvents()
  },
  methods: {
    handleEvents () {
      this.eventBus.$on('validate', this.onValidate)
      this.eventBus.$on('reset', this.onReset)
    },
    onFieldFocus (i) {
      this.selectedQuestion = i
    },
    onFieldBlur () {
      this.selectedQuestion = -1
    },
    onValidate (stepIndex) {
      if (stepIndex !== this.stepIndex) return;
      for (let i = 0; i < this.values.length; i++) {
        for (let answer of this.content.answers[i]) {
          if (!this.values[i].includes(answer.toString())) {
            this.eventBus.$emit('validation-fail')
            return
          }
        }
      }

      this.eventBus.$emit('validation-pass')
    },

    onReset (stepIndex) {
      if (stepIndex !== this.stepIndex) return;
      this.selectedQuestion = -1
      this.values = valuesArray()
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
