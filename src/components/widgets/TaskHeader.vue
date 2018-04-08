<template lang="pug">
h1.TaskHeader(v-html="text")
</template>

<script>
export default {
  name: 'TaskHeader',
  computed: {
    text () {
      return this.$store.state.global.taskHeader
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/default.scss";

.TaskHeader {
  color: $text-clr;
  margin: 0 0 10px 0;
  @include headerText;
}
</style>
