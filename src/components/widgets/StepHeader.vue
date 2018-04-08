<template lang="pug">
h2.StepHeader(v-html="currentStepHeader")
</template>

<script>
export default {
  name: 'StepHeader',
  computed: {
    currentStep () {
      return this.$store.state.global.step.current
    },
    currentStepHeader () {
      return this.$store.state.global.step.headers[this.currentStep]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/default";
h2.StepHeader {
  color: black;
  margin: 0;
  height: 56px;
  @include subheaderText;
}
</style>
