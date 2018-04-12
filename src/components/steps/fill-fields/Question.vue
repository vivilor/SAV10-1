<template lang="pug">
.Question
  slot(name="text")
  slot(name="fields")
</template>

<script>

export default {
  name: 'Question'
}
</script>

<style lang="scss" scoped>
.Question {
  width: 100%
}
</style>
