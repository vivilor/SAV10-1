<template lang="pug">
ul.StepsBar
  li(v-for="i in stepsCount", :key="i")
    div.number(
      :class="{ active: (i - 1) === currentStep }",
      v-if="(i - 1) >= currentStep",
      v-text="i"
    )
    div(v-if="(i - 1) < currentStep")
</template>

<script>
export default {
  name: 'StepsBar',
  computed: {
    currentStep () {
      return this.$store.state.global.step.current
    },
    stepsCount () {
      return this.$store.state.global.step.count
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/default";
ul.StepsBar {
  list-style-type: none;
  display: flex;
  padding: 0;
  margin: 0 0 10px 0;
  li {
    width: 36px;
    height: 36px;
    border: #f0f0f0 1px solid;
    text-align: center;
    border-radius: 20px;
    &:not(:first-child) {margin-left: 20px}
    div.number {
      @include normalIText;
      font-weight: 700;
      &.active {color: #4ecdc4}
      &:not(.active) {color: #d8dad4}
    }
    div:not(.number) {
      width: 36px;
      height: 36px;
      margin: -1px;
      background-image: url(~@/assets/img/done.png);
    }
  }
}
</style>
