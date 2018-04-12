<template lang="pug">
h2.StepHeader(v-html="text")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'StepHeader',
  computed: {
    ...mapGetters({ text: 'currentStepHeader' })
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/default";
h2.StepHeader {
  color: black;
  margin: 0;
  height: 56px;
  @include subheaderText;
}
</style>
