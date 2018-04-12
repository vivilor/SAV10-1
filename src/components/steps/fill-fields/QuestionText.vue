<template lang="pug">
.QuestionTextWrapper
  .filler
  .text-wrapper
    h4.index {{questionIndex + 1}}
    h4.text {{text}}
</template>

<script>
export default {
  name: 'QuestionText',
  props: {
    text: {type: String, required: true},
    hightlight: {type: Boolean, required: true},
    status: {type: String, required: true},
    showIndex: {type: Boolean, default: true},
    questionIndex: {type: Number, required: true}
  }
}
</script>

<style scoped>

</style>
