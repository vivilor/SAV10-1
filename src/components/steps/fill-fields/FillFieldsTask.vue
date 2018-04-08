<template lang="pug">
.FillFieldsTaskWrapper
  .questions-wrapper(v-for="i in quesitonsCount", :key="i")
    .question-wrapper
      QuestionText(
        v-html="questions.data[i-1].text",
        :show-index="questions.showIndex",
        :question-index="i-1",
        :is-active="i-1 === activeQuestion"
      )
    .answers-wrapper
      .answer-wrapper
        InputField(v-for="j in inputFieldsCount[i-1]", :key="j",
          :prefix="answers.data[i-1].prefix ? answers.data[i-1].prefix : '' ",
          :postfix="answers.data[i-1].postfix ? answers.data[i-1].postfix : '' ",
          :position="answers.data[i-1].position ? answer.data[i-1].position : 'normal'",
          :field-index="j-1",
          :question-index="i-1",
          @field-focus="onFieldFocus",
          @field-blur="onFieldBlur",
          @field-value-change="onFieldValueChange"
        )
</template>

<script>
import MutationTypes from '@/store/modules/fill-fields/mutations/types'
import QuestionText from './QuestionText'
import InputField from './InputField'
import { mapMutations, mapGetters, mapState } from 'vuex'
const STORE_MODULE_NAME = 'fillFields'

export default {
  name: 'FillFieldsTask',
  components: {InputField, QuestionText},
  data () {
    let inputFieldsCount = []
    let questionsCount = this.content.questions.data.length

    for (let answer of this.content.answers.data) {
      inputFieldsCount.push(answer.correctValues.length)
    }

    return {
      inputFieldsCount,
      questionsCount
    }
  },
  props: {
    content: {
      type: Object,
      default () { return {} }
    }
  },
  computed: {
    ...mapState({
      activeFieldIndex: `${STORE_MODULE_NAME}/activeFieldIndex`,
      activeQuestionIndex: `${STORE_MODULE_NAME}/activeQuestionIndex`,
      questionsAnswers: `${STORE_MODULE_NAME}/questionsAnswers`,
      questionsAnswersValidity: `${STORE_MODULE_NAME}/questionsAnswersValidity`
    }),
    ...mapGetters({
      allAnswersValid: `${STORE_MODULE_NAME}/allAnswersValid`,
      allQuestionAnswered: `${STORE_MODULE_NAME}/allQuestionAnswered`
    })
    // activeQuestionIndex: {
    //   get () { return this.$store.fillFields.activeQuestionIndex },
    //   set (newActiveQuestionIndex) {
    //     this.setActiveQuestionIndex(newActiveQuestionIndex);
    //   }
    // },
    // activeFieldIndex: {
    //   get () { return this.$store.fillFields.activeFieldIndex },
    //   set (newActiveFieldIndex) {
    //     this.setActiveFieldIndex(newActiveFieldIndex)
    //   }
    // }
  },
  methods: {
    ...mapMutations({
      setActiveFieldIndex: `${STORE_MODULE_NAME}/${MutationTypes.setActiveFieldIndex}`,
      setActiveQuestionIndex: `${STORE_MODULE_NAME}/${MutationTypes.setActiveQuestionIndex}`
    }),
    validate () {
      if (!this.allQuestionAnswered) {
        this.$emit('empty-fields-detect')
        this.$emit('validation-fail')
        return
      }
      if (!this.allAnswersValid) {
        this.$emit('invalid-fields-detect')
        this.$emit('validation-fail')
        return
      }
      this.$emit('validation-pass')
    },
    onFieldFocus (payload) {
      this.setActiveFieldIndex(payload.fieldIndex);
      this.setActiveQuestionIndex(payload.questionIndex);
    },
    onFieldBlur () {
      this.setActiveFieldIndex(-1);
      this.setActiveQuestionIndex(-1);
    },
    onFieldChange (payload) {
      const currentAnswers = this.questionsAnswers[payload.questionIndex]
      const correctAnswers = this.content.answers.data[payload.questionIndex].correctValues

      payload.setAnswerValidity =
        !currentAnswers.includes(payload.fieldValue) && correctAnswers.includes(payload.fieldValue)

      this.setAnswerValue(payload)
      this.setAnswerValidity(payload)
    },
  }
}
</script>

<style scoped>

</style>
