<template lang="pug">
.InputFieldWrapper
  .prefix(v-html="prefix")
  .input-field
    input(
      type="text",
      @blur="onBlur",
      @input="onInput",
      @focus="onFocus",
      v-model="fieldValue"
    )
    .state-label(:class="{ active: isActive }")
  .postfix(v-html="postfix")
</template>

<script>
export default {
  name: 'InputField',
  props: {
    prefix: {type: String},
    postfix: {type: String},
    position: {type: String},
    fieldIndex: {type: Number},
    questionIndex: {type: Number}
  },
  data () {
    return {
      fieldValue: '',
      isActive: false
    }
  },
  methods: {
    onFocus () {
      this.$emit('field-focus', {
        fieldIndex: this.fieldIndex,
        questionIndex: this.questionIndex,
        fieldValue: this.fieldValue
      })
    },
    onBlur () {
      this.$emit('field-blur')
    },
    onInput () {
      this.$emit('field-value-change', {
        fieldIndex: this.fieldIndex,
        questionIndex: this.questionIndex,
        fieldValue: this.fieldValue
      })
    }
  }
}
</script>

<style scoped>

</style>
