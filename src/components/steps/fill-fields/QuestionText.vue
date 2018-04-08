<template lang="pug">
h4.QuestionTextWrapper
</template>

<script>
export default {
  name: 'QuestionText',
  props: {
    showIndex: {type: Boolean, default: true},
    questionIndex: {type: Number, required: true}
  }
}
</script>

<style scoped>

</style>
